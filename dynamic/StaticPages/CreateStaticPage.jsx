import React, { Component } from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import { pick, keys, isEqual, reduce, map } from 'lodash';
import withDataFetch from '../core/withDataFetch';
import HtmlEditor from '../components/HtmlEditor';
import { apiRoutes } from '../../utils/globalConfig';
import resolveUrl from '../core/resolveUrl'

class EditMode extends Component{
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = { body: '', title: '', url: '', order: 0 };
    }

    componentDidMount = async() => {
        const { fetchData, match } = this.props;

        if(match && match.params && match.params.id){
            const page = await fetchData({
                method: 'get',
                url: resolveUrl(apiRoutes.page.meToId, match.params),
            });

            this.setState({ ...page });
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
                url: resolveUrl(apiRoutes.page.meToId, match.params),
                data: this.state,
            });
        }else{
            await fetchData({
                method: 'put',
                url: apiRoutes.page.create,
                data: this.state,
            });
        }
    };


    render(){
        return(
            <div className="affiliation-user">
                <ValidationForm
                    onSubmit={this.handleSubmit}
                    ref={this.formRef}
                    immediate={true}
                    setFocusOnError={true}
                >
                    <div className="form-group row">
                        <label className="col-2">URL:</label>
                        <div className="col-10">
                            <TextInput
                                value={this.state.url}
                                name="url"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2">title:</label>
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
                                value={this.state.body}
                                name="body"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2">Order</label>
                        <div className="col-10">
                            <TextInput
                                required={true}
                                value={this.state.order}
                                name="order"
                                type="number"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-end pr-4 py-4">
                        <button className="btn btn-primary " type="submit">Save changes</button>
                    </div>
                </ValidationForm>
            </div>
        )
    }
}

export default withDataFetch(EditMode);
