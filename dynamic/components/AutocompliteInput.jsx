import React, { Component } from 'react'
import { debounce, map, omit } from 'lodash';
import axios from 'axios';
import {AFFILIATION_FIELDS} from "../../globalConfig";
import OutSideClick from './OutSideClick';

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

    componentDidUpdate(){
        const { disabled } = this.props;
        if(disabled) this.inputRef.current.value = ''
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
        const { disabled, className, affiliations, ...rest } = this.props;

        return (
            <OutSideClick onOutSideClick={this.closeDropdown}>
            <div style={styles.input} >
                <input
                    ref={this.inputRef}
                    className={className}
                    onFocus={this.openDropdown}
                    onChange={this.handleChange}
                    disabled={disabled}
                />
                {
                    open && (
                        <div
                            ref={this.popupRef}
                            className="dropdown-menu"
                            style={{ display: 'block' }}
                        >
                            { data && data.map(item => (
                                <span className="dropdown-item-text">
                                    <h6>{ item.affiliation }</h6>
                                    <div>
                                    { map(omit(AFFILIATION_FIELDS, 'affiliation'), ({ label }, key) => item[key] && <span className="badge badge-primary ">{ label }: {item[key]}</span>)}
                                    </div>
                                   <button
                                        className="btn btn-primary btn-sm"
                                        onClick={this.onItemClick(item)}
                                        disabled={affiliations.some(affiliation => affiliation.id === item.id )}
                                    >
                                       <i
                                           className="fa fa-plus"
                                           aria-hidden="true"
                                       />&nbsp;
                                        Add selected affiliation
                                    </button>
                                </span>
                            ))}
                            {
                                !data.length && (<span className="dropdown-item">Not found</span>)
                            }

                        </div>
                    )
                }
            </div>
            </OutSideClick>
        )
    }
}

export default AutocompliteInput;
