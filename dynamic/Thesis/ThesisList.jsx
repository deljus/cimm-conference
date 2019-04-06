import React, { Component } from 'react';
import { map, filter, isEmpty } from 'lodash';
import withDataFetch from '../core/withDataFetch';
import { redirect } from '../core/history';
import resolveUrl from '../core/resolveUrl';
import { apiRoutes, insideRoutes } from '../../utils/globalConfig';
import Modal from '../components/Modal';


class ThesisList extends Component {
    state = {
        fullness: false,
        open: false,
        list: []
    };

  componentDidMount = async () => {
      const { fetchData } = this.props;
      const data = await fetchData({
          method: 'get',
          url: apiRoutes.thesis.all,
      });
      if(data){
          this.setState({ list: data.thesis });
      }
      const dt = await fetchData({
          method: 'get',
          url: apiRoutes.profileFullness,
      });
      if(dt){
          this.setState({ fullness: dt.fullness });
      }
  };



    redirectToShow = (id) => () => {
        redirect(resolveUrl(insideRoutes.thesis.show, { id }));
    };

    redirectToCreate = () => {
        const { fullness } = this.state;
        if(fullness){
            redirect(insideRoutes.thesis.create);
        }else{
            this.setState({ open: true });
        }
    };

    redirectToEdit = (id) => () => {
        redirect(resolveUrl(insideRoutes.thesis.edit, { id }));
    };

    deleteThesis = (id) => async () => {
        const { fetchData } = this.props;
        const { list } = this.state;
        const data = await fetchData({
            method: 'delete',
            url: resolveUrl(apiRoutes.thesis.meToId, { id }),
        });
        if(data){
            this.setState({ list: filter(list, (item) => item.id != id) });
        }
    };

    closeModal = () => {
        this.setState({ open: false });
    };

  render() {

      const { list, open } = this.state;

    return (
            <>
                <Modal
                  open={open}
                  title="Warning"
                  body="You have not completely filled out the profile. Please fill in all fields."
                  closeModal={this.closeModal}
                  footer={
                      <button className="btn btn-primary" onClick={this.closeModal}>OK</button>
                  }
                />
                <div className="row py-4">
                    <div className="col-10"><h2>List(s):</h2></div>
                    <div className="col-2">
                        <button className="btn btn-primary btn-lg btn-block" onClick={this.redirectToCreate}>Create</button>
                    </div>
                </div>
                {
                    !isEmpty(list) ? map(list, item => (
                        <div className="list-group">
                            <div className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{ item.title }</h5>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                    <button className="btn btn-primary" onClick={this.redirectToShow(item.id)}>Show</button>
                                    <button className="btn btn-primary" onClick={this.redirectToEdit(item.id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={this.deleteThesis(item.id)}>Delete</button>
                                    </div>
                                </div>
                                <p className="mb-1">Authors: { map(item.users, (user) => (
                                    <span className="badge badge-primary">{`${user.lastName} ${user.firstName}`}</span>)) }</p>
                            </div>
                        </div>
                    )): <h3>You have no records. </h3>
                }

                </>
    );
  }
}

export default withDataFetch(ThesisList);
