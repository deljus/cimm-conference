import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual, filter } from 'lodash';
import ViewMode from './ViewMode';
import EditMode from './EditMode';
import withDataFetch from '../../core/withDataFetch';
import { MAX_AFFILIATION, TEMPLATE } from '../../../utils/globalConfig';

class AffiliationForm extends Component {
    state = {
        affiliations: [],
    };

    componentDidMount = async() => {
        const { fetchData, getUrl } = this.props;
        const affiliations = getUrl ? await fetchData({
            method: 'get',
            url: getUrl,
        }) : [];
        if(isEmpty(affiliations)){
            this.addNewAffiliation();

        }else{
            this.setState({ affiliations });
        }
    };

    componentDidUpdate = (prevProps) => {
        if(!isEqual(prevProps.affiliations, this.props.affiliations)){
            this.setState({ affiliations: this.props.affiliations })
        }
    }

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
        const { onChange } = this.props;
        affiliations[index] = {...data, editMode: false};
        this.setState({
            affiliations
        });
        onChange(affiliations)
    };

    addNewAffiliation = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { affiliations } = this.state;
        affiliations.push({ ...TEMPLATE, editMode: true });
        this.setState({
            affiliations
        });
    };

    deleteInState = async (index) => {
        const { affiliations } = this.state;
        const { fetchData, delUrl, onChange } = this.props;
        if(affiliations[index].id){
            if(delUrl){
                await fetchData({
                    method: 'delete',
                    url: delUrl,
                    data: { id: affiliations[index].id }
                });
            }
        }

        affiliations.splice(index, 1);
        this.setState({
            ...affiliations
        });
        onChange(affiliations)
    };

    setSelectedAffiliation = async(selectedAffiliation) => {
        const { fetchData, boundUrl, onChange } = this.props;
        const { affiliations } = this.state;
        if(boundUrl){
            await fetchData({
                method: 'post',
                url: boundUrl,
                data: {
                    id: selectedAffiliation.id
                }
            });
        }
        affiliations.push(selectedAffiliation);
        this.setState({ affiliations: filter(affiliations, 'id') });
        onChange(affiliations)
    };

    render() {
        const { affiliations } = this.state;
        const { renderAlerts, setUrl } = this.props;

        const isMaxAffiliation = affiliations.length >= MAX_AFFILIATION;

        return (
            <div>
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
                                setUrl={setUrl}
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

AffiliationForm.propTypes = {
    getUrl: PropTypes.string,
    delUrl: PropTypes.string,
    boundUrl: PropTypes.string,
    setUrl: PropTypes.string,
    onChange: PropTypes.func,
};

AffiliationForm.defaultProps = {
    onChange: () => {}
};


export default withDataFetch(AffiliationForm);
