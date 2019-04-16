import React, { Component } from 'react';
import { map, filter, isEmpty } from 'lodash';
import withDataFetch from '../core/withDataFetch';
import { redirect } from '../core/history';
import resolveUrl from '../core/resolveUrl';
import { apiRoutes, insideRoutes, LIMIT_THESIS_LIST } from '../../utils/globalConfig';
import Modal from '../components/Modal';


class ThesisList extends Component {
    state = {
        fullness: false,
        open: false,
        list: [],
        count: 0,
        search: ""
    };

  componentDidMount = async () => {
      const { fetchData } = this.props;
      const data = await fetchData({
          method: 'get',
          url: apiRoutes.thesis.all,
      });
      if(data){
          this.setState({ list: data.rows, count: data.count });
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
        const { list, count } = this.state;
        const data = await fetchData({
            method: 'delete',
            url: resolveUrl(apiRoutes.thesis.meToId, { id }),
        });
        if(data){
            this.setState({
                list: filter(list, (item) => item.id != id),
                count: count - 1
            });
        }
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    handleSearchSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { fetchData } = this.props;
        const data = await fetchData({
            method: 'get',
            url: apiRoutes.thesis.all,
            params: {
                search: formData.get('search')
            }
        });
        if(data){
            this.setState({ list: data.rows, count: data.count });
        }
    };

    showMoreClick = (offset) => async (e) => {
        const { search, list } = this.state;
        const { fetchData } = this.props;
        e.stopPropagation();
        const data = await fetchData({
            method: 'get',
            url: apiRoutes.thesis.all,
            params: {
                search,
                offset
            }
        });
        if(data){
            this.setState({ list: list.concat(data.rows) });
        }

    };

    renderShowListBtn = () => {
        const { count, list } = this.state;
        if(list.length < count){
            return (
                <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={this.showMoreClick(list.length)}>
                    Show more
                </button>
            )
        }
        return null;

    };

    handleInputChange = (e) => {
        this.setState({ search: e.target.value });
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
                <form className="input-group mb-3" onSubmit={this.handleSearchSubmit}>
                    <input name="search" type="text" className="form-control" placeholder="Search thesis..."
                           aria-label="Search thesis..." aria-describedby="basic-addon2" onChange={this.handleInputChange}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary" type="submit">
                                <i className="fa fa-search" />
                                &nbsp;<span>Search</span>
                            </button>
                        </div>
                </form>
                {
                    !isEmpty(list) ? map(list, item => (
                        <div className="list-group mb-2">
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
                { this.renderShowListBtn() }

                </>
    );
  }
}

export default withDataFetch(ThesisList);
