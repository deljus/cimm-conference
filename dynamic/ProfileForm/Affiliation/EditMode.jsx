import React, { Component } from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import { pick, keys, isEqual, reduce, map, eq } from 'lodash';
import withDataFetch from '../../core/withDataFetch';
import { AFFILIATION_FIELDS } from '../../../utils/globalConfig';
import { apiRoutes } from '../../../utils/globalConfig';
import AutocompliteDropdown from "../../components/AutocompliteDropdown";

class EditMode extends Component{
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = reduce(AFFILIATION_FIELDS, (acc, val, key) => {
            acc[key] = val.default;
            return acc;
        },{});
    }

    componentDidMount(){
        const nextPropsState = pick(this.props, keys(this.state));

        if( !isEqual(nextPropsState, this.state) ){
            this.setState({ ...nextPropsState })
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = async (e, formData) => {
        const { fetchData, changeState, index, setUrl } = this.props;
        e.stopPropagation();
        e.preventDefault();

         if(setUrl){
             await fetchData({
                 method: 'post',
                 url: setUrl,
                 data: formData
             });
         }
         changeState(formData, index);
    };

    changeToViewMode = (e) => {
        e.preventDefault();
        const { changeToViewMode, index } = this.props;
        changeToViewMode(index);
    };

    render(){

        const { loading, setSelectedAffiliation } = this.props;

        return(
            <div className="affiliation-user">
            <ValidationForm
                onSubmit={this.handleSubmit}
                ref={this.formRef}
                immediate={true}
                setFocusOnError={true}
            >
                {
                    map(AFFILIATION_FIELDS, (item, key) => (
                        <div className="form-group row">
                            <label className="col-4">{ item.label }</label>
                            <div className="col-8">
                                {
                                    eq(key, 'affiliation')
                                        ? <AutocompliteDropdown
                                            {...item}
                                            value={this.state[key]}
                                            name={key}
                                            onChange={this.handleChange}
                                            url={apiRoutes.affiliation.all}
                                            className="form-control"
                                            onSelectNewAffiliation={setSelectedAffiliation}
                                        />
                                        :<TextInput {...item}
                                           value={this.state[key]}
                                           name={key}
                                           onChange={this.handleChange}
                                        />
                                }
                            </div>
                        </div>
                    ))
                }
                <div className="form-group">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        { loading && <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>&nbsp;</>}
                        Submit
                    </button>
                    <button className="btn btn-danger" onClick={this.changeToViewMode}>
                        <i className="fa fa-trash" aria-hidden="true" />&nbsp;
                        Cancel
                    </button>
                </div>
            </ValidationForm>
            </div>
        )
    }
}

export default withDataFetch(EditMode);
