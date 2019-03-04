import React, { Component } from 'react';
import ViewMode from './ViewMode';
import EditMode from './EditMode';
import withDataFetch from '../../core/withDataFetch';
import { MAX_AFFILIATION, TEMPLATE } from './constants';

class Main extends Component {
    state = {
        affiliations: [],
        editMode: false
    };

    componentDidMount = async() => {
        const { fetchData } = this.props;
        const affiliationsData = await fetchData({
            method: 'get',
            url: '/affiliations',
        });
        this.setState({ ...affiliationsData });
    };

    changeToEditMode = () => {
        this.setState({ editMode: true })
    };

    changeToViewMode = () => {
        this.setState({ editMode: false })
    };

    changeStateForSusses = (data) => {
        this.setState({
            ...data,
            editMode: false,
        });
    };

    addNewAffiliation = () => {
        const { affiliations } = this.state;
        affiliations.push({ ...TEMPLATE, editMode: true });
        this.setState({
            affiliations
        });
    };

    deleteInState = (index) => {

        const { affiliations } = this.state;
        console.log(index, affiliations)
        affiliations.splice(index, 1);
        console.log(index, affiliations)
        this.setState({
            affiliations
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
                                deleteInState={this.deleteInState}
                            />
                            : <ViewMode
                                {...item}
                                index={index}
                                changeToEditMode={this.changeToEditMode}
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
