import React, { Component } from 'react';
import { map } from 'lodash';
import withDataFetch from '../core/withDataFetch';
import { redirect } from '../core/history';
import { insideRoutes } from '../../globalConfig';


class ThesisList extends Component {
    state = {
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
  };

    redirectToShow = (id) => () => {
        redirect(`/thesis/show/${id}`);
    };

    redirectToCreate = () => {
        redirect(insideRoutes.thesis.create);
    };

  render() {

      const { list } = this.state;

    return (
            <>
                <div className="row py-4">
                    <div className="col-10"><h2>List(s):</h2></div>
                    <div className="col-2">
                        <button className="btn btn-primary btn-lg btn-block" onClick={this.redirectToCreate}>Create</button>
                    </div>
                </div>
                {
                    map(list, item => (
                        <div className="list-group">
                            <div className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{ item.title }</h5>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                    <button className="btn btn-primary" onClick={this.redirectToShow(item.id)}>Show</button>
                                    <button className="btn btn-primary">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                                <p className="mb-1">Authors: { map(item.users, (user) => (
                                    <span className="badge badge-primary">{`${user.lastName} ${user.firstName}`}</span>)) }</p>
                            </div>
                        </div>
                    ))
                }

                </>
    );
  }
}

export default withDataFetch(ThesisList);
