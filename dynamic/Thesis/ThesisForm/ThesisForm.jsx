import React, { Component } from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import { pick, keys, isEqual, reduce, map } from 'lodash';
import withDataFetch from '../../core/withDataFetch';
import HtmlEditor from '../../components/HtmlEditor';
import AutocompliteForUser from '../../components/AutocompliteForUser';
import CreateUserModal from './CreateUserModal';
import { apiRoutes } from '../../../globalConfig';

class EditMode extends Component{
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = { text: '', title: '', users: [], openModal: false, saved: false };
    }

    componentDidMount = async() => {
        const { fetchData } = this.props;
        const userData = await fetchData({
            method: 'get',
            url: apiRoutes.user.current,
        });
        const affiliations = await fetchData({
            method: 'get',
            url: apiRoutes.affiliation.all,
        });
        const users = [{ ...userData, affiliations }];
        this.setState({ users });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = async (e) => {
        const { fetchData, changeState, index } = this.props;
        e.preventDefault();

        const dt = await fetchData({
            method: 'put',
            url: '/thesis',
            data: this.state,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        });
        if(dt){
            this.setState({ saved: true });

        }
    };

    setUserToState = (item) => {
        const { users } = this.state;
        users.push(item)
        this.setState({ users });
    };

    createNewAuthor = e => {
        e.preventDefault();
        this.setState({ openModal: true })
    };

    closeModal = () => {
        this.setState({ openModal: false })
    };

    render(){

        const { loading, changeToViewMode, index } = this.props;
        const { users, openModal, saved } = this.state;

        console.log(users);

        return(
            <div className="affiliation-user">
                <CreateUserModal open={openModal} onClose={this.closeModal} setNewUser={this.setUserToState}/>
                <ValidationForm
                    onSubmit={this.handleSubmit}
                    ref={this.formRef}
                    immediate={true}
                    setFocusOnError={true}
                >
                    <div className="form-group row">
                        <label className="col-2">Title</label>
                        <div className="col-10">
                            <TextInput
                               required={true}
                               value={this.state.title}
                               name="title"
                               onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2">Text</label>
                        <div className="col-10">
                            <HtmlEditor
                                value={this.state.text}
                                name="text"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2">Authors:</label>
                        <div className="col-4">
                            <AutocompliteForUser
                                className="form-control"
                                url={apiRoutes.user.all}
                                onSelect={this.setUserToState}
                                executIds={map(users, 'id')}
                                renderDropDown={(item) => (
                                    <h6>{ item.lastName } { item.firstName }</h6>
                                )}

                            />
                        </div>
                        <div className="col-6">
                            <div style={{ paddingBottom: '5px' }}>
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={this.createNewAuthor}>
                                    Create new author
                                </button>
                            </div>
                    {

                        map(users, (user, inx) => (
                            <div className="card">
                                <div className="card-header">
                                   #{inx+1}
                                </div>
                                <div className="card-body">
                                    <p className="card-text">Last name: {user.lastName}</p>
                                    <p className="card-text">First name: {user.firstName}</p>
                                    <div className="form-group row">
                                        <label className="col-2">Affiliations:</label>
                                        <div className="col-10">
                                            <div className="row">
                                            {
                                                user.affiliations && map(user.affiliations, (data, inx) => (
                                                    <div className="col-4 thesis-affiliaton">
                                                        { data.affiliation }
                                                    </div>
                                                ))
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                        </div>
                    </div>
                        <div className="row justify-content-end pr-4 py-4">
                          <button className="btn btn-primary " type="submit" disabled={saved}>Save changes</button>
                    </div>
                </ValidationForm>
            </div>
        )
    }
}

export default withDataFetch(EditMode);
