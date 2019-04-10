import React, { Component } from 'react'
import { debounce, map, omit } from 'lodash';
import { TextInput, BaseFormControl } from "react-bootstrap4-form-validation"
import axios from 'axios';
import {AFFILIATION_FIELDS} from "../../utils/globalConfig";
import OutSideClick from './OutSideClick';

const styles = {
    input: { position: 'relative' }
};

class AutocompliteDropdown extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            open: false
        }
    }

    componentDidUpdate(){
        const { disabled } = this.props;
        if(disabled) this.inputRef.current.value = '',
        this.fetchFn();
    }

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

    handleChange = async (e) => {
        const { onChange } = this.props;
        e.stopPropagation();
        e.persist();
        onChange(e);
        await this.fetchFn(e.target.value);

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
        const { onSelectNewAffiliation } = this.props;
        onSelectNewAffiliation && onSelectNewAffiliation(item);
    };

    render () {

        const { open, data } = this.state;
        const { disabled, className, affiliations, ...rest } = this.props;

        return (
            <OutSideClick onOutSideClick={this.closeDropdown}>
                <div style={styles.input} >
                    <TextInput
                        ref={this.inputRef}
                        {...rest}
                        autocomplete="off"
                        className={className}
                        onFocus={this.openDropdown}
                        onChange={this.handleChange}
                        disabled={disabled}
                    />
                    {
                        open && (
                            <div
                                className="dropdown-menu"
                                style={{ display: 'inline-block', position: 'absolute', top: '38px' }}
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

export default AutocompliteDropdown;
