import React, { Component } from 'react';
import ViewMode from './ViewMode';
import EditMode from './EditMode';
import withDataFetch from '../../core/withDataFetch';
import { apiRoutes } from '../../../utils/globalConfig';

class Main extends Component {
    state = {
        lastName: '',
        firstName: '',
        editMode: false,
    };

    componentDidMount = async() => {
        const { fetchData } = this.props;
        const userData = await fetchData({
            method: 'get',
            url: apiRoutes.user.current,
        });
        this.setState({ ...userData });
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


    render() {
        const {editMode, ...rest} = this.state;
        const { renderAlerts } = this.props;
        return (
            <div className="py-4 pl-4 affiliation-user">
                <h5>Common information: </h5>
                { renderAlerts() }
                { editMode ? <EditMode {...rest} changeToViewMode={this.changeToViewMode} changeState={this.changeStateForSusses}/> : <ViewMode {...rest} changeToEditMode={this.changeToEditMode}/>}
            </div>

        )
    }
}

export default withDataFetch(Main);
