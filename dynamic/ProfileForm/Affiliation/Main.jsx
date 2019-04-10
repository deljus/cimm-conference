import React, { Component } from 'react';
import { isEmpty, filter } from 'lodash';
import ViewMode from './ViewMode';
import EditMode from './EditMode';
import withDataFetch from '../../core/withDataFetch';
import { MAX_AFFILIATION, TEMPLATE } from '../../../utils/globalConfig';
import { apiRoutes } from '../../../utils/globalConfig';

class Main extends Component {
    state = {
        affiliations: [],
    };

    componentDidMount = async() => {
        const { fetchData } = this.props;
        const affiliations = await fetchData({
            method: 'get',
            url: apiRoutes.affiliation.me,
        });
        if(isEmpty(affiliations)){
            this.addNewAffiliation();

        }else{
            this.setState({ affiliations });
        }
    };

    changeToEditMode = (index) => () => {
        const { affiliations } = this.state;
        affiliations[index].editMode = true;
        this.setState({ affiliations: [...affiliations] })
    };

    changeToViewMode = (index) => {
        const { affiliations } = this.state;
        affiliations.splice(index, 1);
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
                url: apiRoutes.affiliation.me,
                data: { id: affiliations[index].id }
            });
            if(!data) return false;
        }

        affiliations.splice(index, 1);
        this.setState({
            ...affiliations
        })
    };

    setSelectedAffiliation = async(selectedAffiliation) => {
        const { fetchData } = this.props;
        const { affiliations } = this.state;
        const data = await fetchData({
            method: 'post',
            url: apiRoutes.affiliation.boundForMe,
            data: {
                id: selectedAffiliation.id
            }
        });
        if(data){
            affiliations.push(data);
            this.setState({ affiliations: filter(affiliations, 'id') });
        }
    };

    render() {
        const { affiliations } = this.state;
        const { renderAlerts } = this.props;

        const isMaxAffiliation = affiliations.length >= MAX_AFFILIATION;

        return (
            <div className="py-4 pl-4">
            <h5>Affiliation(s):</h5>
                <div className="row py-4">
                    <div className="col-4">
                        <button
                            className="btn btn-primary"
                            onClick={this.addNewAffiliation}
                            disabled={isMaxAffiliation}
                        >
                            <i className="fa fa-plus" aria-hidden="true" />&nbsp;Add new
                        </button>
                    </div>
                </div>
            { renderAlerts() }
            <div className="row py-4">
                {
                    affiliations.map((item, index) =>
                        <div className="col-12 col-md-4 col-sm-6">
                            {item.editMode ?
                            <EditMode
                                {...item}
                                index={index}
                                className=""
                                changeToViewMode={this.changeToViewMode}
                                changeState={this.changeStateForSusses}
                                setSelectedAffiliation={this.setSelectedAffiliation}
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
