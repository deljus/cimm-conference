import React, { Component } from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import {map, omit, reduce, eq} from 'lodash';
import {AFFILIATION_FIELDS, AUTHOR_FIELDS} from '../../../utils/globalConfig';
import AutocompliteTransfer from '../../components/AutocompliteTransfer';
import { MAX_AFFILIATION } from '../../../utils/globalConfig';
import Affiliation from '../../ProfileForm/Affiliation/Main'
import withDataFetch from '../../core/withDataFetch';
import cx from 'classnames';
import { apiRoutes } from '../../../utils/globalConfig';

const defaultState = {
    ...reduce(AUTHOR_FIELDS, (acc, val, key) => ({ [key]: val.default, ...acc }), {}),
    affiliations: [],
    editMode: false,
};

class CreateUser extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
        this.formRef = React.createRef();
    }

    componentWillMount = () => {
        document.body.classList.add('modal-open');
        const elemDiv = document.createElement('div');
        elemDiv.className = 'modal-backdrop fade show';
        document.body.appendChild(elemDiv);
    };

    componentWillUnmount = () => {
        document.body.classList.remove('modal-open');
        document.querySelector('.modal-backdrop').remove();
    };

    resetForm = () => {
        let formRef = this.formRef.current;
        formRef.resetValidationState(this.state.clearInputOnReset);
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    changeToViewMode = () => {
        this.setState({
            editMode: false
        })
    };

    handleSubmit = async (e, formData) => {
        e.stopPropagation();
        e.preventDefault();
        const { fetchData, setNewUser } = this.props;
        const { affiliations, lastName, firstName, email } = this.state;


        const dt = await fetchData({
            method: 'put',
            url: apiRoutes.user.current,
            data: {
                affiliations, lastName, firstName, email
            }
        });
        if(dt){
            setNewUser({ ...this.state, id: dt.id });
            this.closeModal();
        }
    };

    closeModal = () => {
        this.setState({ ...defaultState });
        this.resetForm();
        this.props.onClose();
    };

    handleAffiliationChange = (affiliations) => {
        this.setState({ affiliations })
    };

  render() {

    const { affiliations } = this.state;
    const { open } = this.props;

    return (
      <div
          className={cx("modal fade", { show: open })}
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: open ? 'block': 'none' }}
      >
        <div className="modal-dialog modal-xl" role="document">

          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create author</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={this.closeModal}>&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <ValidationForm
                    id="create-author"
                    className="registration-form"
                    ref={this.formRef}
                    onSubmit={this.handleSubmit}
                >
                    { map(AUTHOR_FIELDS, (item, key) => (
                        <div className="form-group row">
                            <label className="col-2">{ item.label }</label>
                            <div className="col-10">
                                <TextInput {...item}
                                           value={this.state[key]}
                                           name={key}
                                           onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    )) }
                    <div className="form-group row">
                        <label className="col-2">Affiliation(s):</label>
                        <div className="col-10">
                            <Affiliation
                                affiliations={affiliations}
                                onChange={this.handleAffiliationChange}
                            />

                        </div>
                    </div>
                </ValidationForm>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={this.closeModal} >Close</button>
              <button className="btn btn-primary" type="submit" form="create-author">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withDataFetch(CreateUser);
