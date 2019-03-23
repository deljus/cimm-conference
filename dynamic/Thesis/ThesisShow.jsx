import React, { Component } from 'react';
import { map } from 'lodash';
import withDataFetch from '../core/withDataFetch';
import resolveUrl from '../core/resolveUrl';
import { apiRoutes } from '../../globalConfig';


class ThesisList extends Component {
    state = {
        data: null
    };

    componentDidMount = async () => {
        const { fetchData, match } = this.props;
        const data = await fetchData({
            method: 'get',
            url: resolveUrl(apiRoutes.thesis.meToId, { id: match.params.id }),
        });
        if(data){
            this.setState({ data });
        }
    };

    render() {

        const { data } = this.state;

        return (
            <>
                <h2>{ data && data.title }</h2>
                { data && (<div dangerouslySetInnerHTML={{__html: data && data.text.replace(/(<? *script)/gi, 'illegalscript')}} />)}

            </>
        );
    }
}

export default withDataFetch(ThesisList);
