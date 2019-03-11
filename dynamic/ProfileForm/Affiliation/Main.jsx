import React, { Component } from 'react';
import ViewMode from './ViewMode';
import EditMode from './EditMode';
import { AutocompliteInput } from '../../components';
import withDataFetch from '../../core/withDataFetch';
import { MAX_AFFILIATION, TEMPLATE } from '../../constants';

class Main extends Component {
    state = {
        affiliations: [],
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
                url: '/affiliation',
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
            url: '/affiliation-bound',
            data: {
                id: selectedAffiliation.id
            }
        });
        if(data){
            affiliations.push(data);
            this.setState({ affiliations });
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
                    <div className="col-6">
                        <AutocompliteInput
                            url="/affiliations"
                            className="form-control"
                            affiliations={affiliations}
                            onSelect={this.setSelectedAffiliation}
                            disabled={isMaxAffiliation}
                        />
                    </div>
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
