import React, { Component } from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import {map, omit, reduce, eq} from 'lodash';
import {AFFILIATION_FIELDS, AUTHOR_FIELDS} from '../../constants';
import AutocompliteForUser from '../../components/AutocompliteForUser';
import { MAX_AFFILIATION } from '../../constants';
import EditAffiliation from '../../components/EditAffiliation';
import withDataFetch from '../../core/withDataFetch';
import cx from 'classnames';
import { apiRoutes } from '../../../globalConfig';

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

    componentDidUpdate = (prevProps) => {
        if(!eq(prevProps.open, this.props.open)){
            if(this.props.open){
                document.body.classList.add('modal-open');
                const elemDiv = document.createElement('div');
                elemDiv.className = 'modal-backdrop fade show';
                document.body.appendChild(elemDiv);
            }else{
                document.body.classList.remove('modal-open');
                document.querySelector('.modal-backdrop').remove();
            }
        }
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

    setAffiliation = (item) => {
        const { affiliations } = this.state;
        affiliations.push(item);

        this.setState({
          affiliations,
            editMode: false,
        })
      };

    deleteAffiiation = (inx) => (e) => {
      e.preventDefault();
      const { affiliations } = this.state;
      affiliations.splice(inx, 1);

      this.setState({
        affiliations
      })
    };

    switchEditMode = () => {
        this.setState({
            editMode: true
        })
    };

    changeToViewMode = () => {
        this.setState({
            editMode: false
        })
    };

    handleSubmit = async (e, formData) => {
        const { fetchData, changeState, index, setNewUser } = this.props;
        e.preventDefault();

        const dt = await fetchData({
            method: 'put',
            url: apiRoutes.user.current,
            data: this.state
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

  render() {

    const { affiliations, editMode } = this.state;
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
                        <label className="col-2">Affiliation:</label>
                        <div className="col-4">
                            <AutocompliteForUser
                                className="form-control"
                                url="/affiliations"
                                onSelect={this.setAffiliation}
                                executIds={map(affiliations, 'id')}
                                disabled={affiliations.length >= MAX_AFFILIATION}
                                renderDropDown={(item) => (
                                    <>
                                      <h6>{ item.affiliation }</h6>
                                      <div>
                                      { map(omit(AFFILIATION_FIELDS, 'affiliation'),
                                          ({ label }, key) =>
                                              item[key] && <span className="badge badge-primary ">
                                                  { label }: {item[key]}
                                                  </span>)
                                      }
                                      </div>
                                    </>
                                )}
                            />
                        </div>
                        <div className="col-6">
                            <div style={{ paddingBottom: '5px' }}>
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={this.switchEditMode}>
                                    New affiliation
                                </button>
                            </div>
                            { editMode ? <EditAffiliation changeToViewMode={this.changeToViewMode} onSubmitted={this.setAffiliation} /> :

                                map(affiliations, (affiliation, inx) => (
                                    <div className="card">
                                        <div className="card-header">
                                            #{inx+1}
                                            <button type="button" className="close" onClick={this.deleteAffiiation(inx)}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">Last name: {affiliation.zip}</p>
                                        </div>
                                    </div>
                                ))
                            }
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
