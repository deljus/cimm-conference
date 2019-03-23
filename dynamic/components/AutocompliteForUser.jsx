import React, { Component } from 'react'
import { debounce, map, omit } from 'lodash';
import axios from 'axios';
import cx from 'classnames';

const styles = {
    input: { position: 'relative' }
};

class AutocompliteInput extends Component{
    constructor(props){
        super(props);
        this.inputRef = React.createRef();
        this.popupRef = React.createRef();
        this.getInputRef = this.getInputRef.bind(this);
        this.state = {
            data: [],
            open: false
        }
    }

    getInputRef(){
        return this.inputRef.current.inputElement;
    };

    fetchFn = debounce(async(value) => {
        const { url } = this.props;
        const response = await axios({
            url,
            method: 'get',
            params: {
                search: value
            }
        });
        if(response.data) {
            this.setState({data: response.data})
        }
    }, 200);

    handleChange = (e) => {
        e.stopPropagation();
        this.fetchFn(e.target.value);
    };

    openDropdown = (e) => {
        e.stopPropagation();
        this.setState({ open: true })
    };

    closeDropdown = (e) => {
        this.setState({ open: false })
    };

    onItemClick = item => e => {
        e.stopPropagation();
        this.setState({ open: false })
        const { onSelect } = this.props;
        onSelect && onSelect(item);
    };

    render () {

        const { open, data } = this.state;
        const { disabled, className, executIds, renderDropDown, ...rest } = this.props;

        return (
                <div className={cx("autocomplite", { disabled })} >
                    <input
                        required={false}
                        className={className}
                        onFocus={this.openDropdown}
                        onChange={this.handleChange}
                        disabled={disabled}
                    />

                            <div
                                ref={this.popupRef}
                                className="dropdown-menu"
                                style={{ display: 'block' }}
                            >
                                { data && data.map(item => (
                                    <span className="dropdown-item-text">
                                        { renderDropDown && renderDropDown(item) }
                                   <button
                                       className="btn btn-primary btn-sm"
                                       onClick={this.onItemClick(item)}
                                       disabled={executIds && executIds.includes(item.id)}

                                   >
                                       <i
                                           className="fa fa-plus"
                                           aria-hidden="true"
                                       />&nbsp;
                                       Add
                                    </button>
                                </span>
                                ))}
                                {
                                    !data.length && (<span className="dropdown-item">Not found</span>)
                                }
                            </div>

                </div>
        )
    }
}

export default AutocompliteInput;
