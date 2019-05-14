import React, { Component } from 'react'
import { debounce, map, omit, eq } from 'lodash';
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

    renderDropDown = (item, index) => (
            <>
                <span className="dropdown-item">
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h6>{ item.affiliation }</h6>
                    </div>

                      <button
                          className="btn btn-primary btn-sm"
                          onClick={this.onItemClick(item)}
                      >
                       <i
                           className="fa fa-plus"
                           aria-hidden="true"
                       />&nbsp;
                          Add
                    </button>
                    </div>
                    <div className="badge badge-primary">
                    { map(omit(AFFILIATION_FIELDS, 'affiliation'), ({ label }, key) => item[key] && <>{ label }: {item[key]}&nbsp;</>)}
                    </div>
                </span>
                { !eq(index, this.state.data.length-1) && <div className="dropdown-divider"></div> }
            </>
        );

    render () {

        const { open, data } = this.state;
        const { disabled, className, ...rest } = this.props;

        return (
            <OutSideClick onOutSideClick={this.closeDropdown}>
                <div className="dropdown" style={styles.input} >
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
                                className="dropdown-menu dropdown-menu-right"
                                style={{ display: 'inline-block', minWidth: '100%' }}
                            >
                                { map(data, this.renderDropDown) }
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
