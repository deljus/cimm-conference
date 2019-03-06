import React, { Component } from 'react';
import ViewMode from './ViewMode';
import EditMode from './EditMode';
import withDataFetch from '../../core/withDataFetch';
import { MAX_AFFILIATION, TEMPLATE } from './constants';

class Main extends Component {
    state = {
        affiliations: []
    };

    componentDidMount = async() => {
        const { fetchData } = this.props;
        const affiliationsData = await fetchData({
            method: 'get',
            url: '/affiliations',
        });
        affiliationsData && this.setState({ affiliations: affiliationsData  });
    };

    changeToEditMode = (index) => () => {
        const { affiliations } = this.state;
        affiliations[index].editMode = true;
        this.setState({ affiliations: [...affiliations] })
    };

    changeToViewMode = (index) => {
        const { affiliations } = this.state;
        affiliations[index].editMode = false;
        this.setState({ affiliations: [...affiliations] })
    };

    changeStateForSusses = (data, index) => {
        const { affiliations } = this.state;
        affiliations[index] = {...data, editMode: false};
        this.setState({
            affiliations
        });
    };

    addNewAffiliation = () => {
        const { affiliations } = this.state;
        affiliations.push({ ...TEMPLATE, editMode: true });
        this.setState({
            affiliations
        });
    };

    deleteInState = async (index) => {
        const { affiliations } = this.state;
        const { fetchData } = this.props;
        if(affiliations[index].id){
            const data = await fetchData({
                method: 'delete',
                url: '/affiliation',
                data: { id: affiliations[index].id }
            });
            if(!data) return false;
        }

        affiliations.splice(index, 1);
        this.setState({
            ...affiliations
        })
    }


    render() {
        const { affiliations } = this.state;
        const { renderAlerts } = this.props;
        return (
            <div className="py-4 pl-4">
            <h5>Affiliation(s)&nbsp;&nbsp;
                {
                    affiliations.length < MAX_AFFILIATION
                    && (<button className="btn btn-primary" onClick={this.addNewAffiliation}>
                        <i className="fa fa-plus" aria-hidden="true" />&nbsp;Add
                    </button>)
                }</h5>
        { renderAlerts() }
            <div className="row">


                {
                    affiliations.map((item, index) =>
                        <div className="col-12 col-md-4 col-sm-6">
                            {item.editMode ?
                            <EditMode
                                {...item}
                                index={index}
                                changeToViewMode={this.changeToViewMode}
                                changeState={this.changeStateForSusses}
                            />
                            : <ViewMode
                                {...item}
                                index={index}
                                changeToEditMode={this.changeToEditMode}
                                deleteInState={this.deleteInState}
                            />}
                        </div>
                )
                }
                </div>

            </div>

        )
    }
}

export default withDataFetch(Main);
