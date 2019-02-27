import React, { Component } from 'react';
import ViewMode from './ViewMode';
import EditMode from './EditMode';
import withDataFetch from '../../core/withDataFetch';

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
            url: '/user',
        });
        this.setState({ ...userData })

    };

    changeToEditMode = () => {
        this.setState({ editMode: true })
    };

    changeToViewMode = () => {
        this.setState({ editMode: false })
    };


    render() {
        const {editMode, ...rest} = this.state;
        const { renderAlerts } = this.props;
        return (
            <div className="py-4 pl-4">
                <h5>Common information</h5>
                { renderAlerts() }
                {editMode ? <EditMode {...rest} changeToViewMode={this.changeToViewMode}/> : <ViewMode {...rest} changeToEditMode={this.changeToEditMode}/>}
            </div>

        )
    }
}

export default withDataFetch(Main);
