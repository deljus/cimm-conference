import React, { Component } from 'react';
import { map, filter } from 'lodash';
import withDataFetch from '../core/withDataFetch';
import { redirect } from '../core/history';
import resolveUrl from '../core/resolveUrl';
import { apiRoutes, insideRoutes } from '../../utils/globalConfig';


class StaticPageList extends Component {
    state = {
        list: []
    };

    componentDidMount = async () => {
        const { fetchData } = this.props;
        const list = await fetchData({
            method: 'get',
            url: apiRoutes.page.all,
        });
        if(list){
            this.setState({ list });
        }
    };

    redirectToEdit = (id) => () => {
        redirect(resolveUrl(insideRoutes.admin.page.edit, { id }));
    };

    redirectToCreate = () => {
        redirect(insideRoutes.admin.page.create);
    };

    deletePage = (id) => async () => {
        const { fetchData } = this.props;
        const { list } = this.state;
        const data = await fetchData({
            method: 'delete',
            url: resolveUrl(apiRoutes.page.meToId, { id }),
        });
        if(data){
            this.setState({ list: filter(list, (item) => item.id != id) });
        }
    };

    render() {

        const { list } = this.state;

        return (
            <>
                <div className="row py-4">
                    <div className="col-10"><h2>List(s):</h2></div>
                    <div className="col-2">
                        <button className="btn btn-primary btn-lg btn-block" onClick={this.redirectToCreate}>Create page</button>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">title</th>
                        <th scope="col">url</th>
                        <th scope="col">order</th>
                        <th scope="col">actions</th>
                    </tr>
                    </thead><tbody>
                {
                    map(list, item => (

                            <tr>
                                <th scope="row">{ item.id }</th>
                                <td >{ item.title }</td>
                                <td>{ item.url }</td>
                                <td>{ item.order }</td>
                                <td>
                                    <button type="button" className="btn btn-primary" onClick={this.redirectToEdit(item.id)}>Edit</button>
                                    <button type="button" className="btn btn-danger " onClick={this.deletePage(item.id)}>Delete</button>
                                </td>
                            </tr>


                    ))
                }
                </tbody></table>
            </>
        );
    }
}

export default withDataFetch(StaticPageList);
