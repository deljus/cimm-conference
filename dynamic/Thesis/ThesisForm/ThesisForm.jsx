import React, { Component } from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import { pick, keys, isEqual, reduce, map } from 'lodash';
import withDataFetch from '../../core/withDataFetch';
import HtmlEditor from '../../components/HtmlEditor';
import AutocompliteTransfer from '../../components/AutocompliteTransfer';
import CreateUserModal from './CreateUserModal';
import { apiRoutes } from '../../../utils/globalConfig';
import resolveUrl from '../../core/resolveUrl'

class EditMode extends Component{
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = { text: '', title: '', users: [], openModal: false, saved: false };
    }

    componentDidMount = async() => {
        const { fetchData, match } = this.props;

        const userData = await fetchData({
            method: 'get',
            url: apiRoutes.user.current,
        });
        const affiliations = await fetchData({
            method: 'get',
            url: apiRoutes.affiliation.me,
        });

        const users = [{ ...userData, affiliations, me: true }];

        if(match && match.params && match.params.id){
            const thesis = await fetchData({
                method: 'get',
                url: resolveUrl(apiRoutes.thesis.meToId, match.params),
            });

            this.setState({ ...thesis });
        }else{
            this.setState({ users });
        }
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = async (e) => {
        const { fetchData, match } = this.props;
        e.preventDefault();

        if(match && match.params && match.params.id){
            await fetchData({
                method: 'post',
                url: resolveUrl(apiRoutes.thesis.meToId, match.params),
                data: this.state,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            });
        }else{
            await fetchData({
                method: 'put',
                url: apiRoutes.thesis.me,
                data: this.state,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            });
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

    deleteUser = (index) => (e) => {
        e.preventDefault();
        const { users } = this.state;
        users.splice(index, 1);
        this.setState({ users });

    }

    render(){
        const { users, openModal, saved } = this.state;

        return(
            <div className="affiliation-user">
                {openModal && <CreateUserModal open={true} onClose={this.closeModal} setNewUser={this.setUserToState}/> }
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
                            <AutocompliteTransfer
                                className="form-control"
                                placeholder="Select users..."
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
                                    {!user.me && <button type="button" className="close" onClick={this.deleteUser(inx)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button> }
                                </div>
                                <div className="card-body">
                                    <p className="card-text">Last name: {user.lastName}</p>
                                    <p className="card-text">First name: {user.firstName}</p>
                                    <div className="form-group row">
                                        <label className="col-4">Affiliations:</label>
                                        <div>
                                            {
                                                user.affiliations && map(user.affiliations, (data, inx) => (
                                                    <div className="badge badge-primary d-block mb-2">
                                                        { data.affiliation }
                                                    </div>
                                                ))
                                            }
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
