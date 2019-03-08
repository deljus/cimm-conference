import React, { Component } from 'react'
import { debounce, map, omit } from 'lodash';
import axios from 'axios';
import {FIELDS} from "../ProfileForm/Affiliation/constants";

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
        e.stopPropagation();
        this.setState({ open: false })
    };

    onSelectItem = item => e => {
        e.stopPropagation();
        this.setState({ open: false })
        const { onSelect } = this.props;
        onSelect && onSelect(item);
    };

    render () {

        const { open, data } = this.state;
        const { selected, className, ...rest } = this.props;

        return (
            <div style={styles.input} >
                <input
                    ref={this.inputRef}
                    className={className}
                    onFocus={this.openDropdown}
                    onChange={this.handleChange}
                    onBlur={this.closeDropdown}
                />
                {
                    open && (
                        <div ref={this.popupRef} className="dropdown-menu" style={{ display: 'block' }}  >
                            { data && data.map(item => (
                                <a className="dropdown-item" href="" onMouseDown={this.onSelectItem(item)} >
                                    <h6>{ item.affiliation }</h6>
                                    { map(omit(FIELDS, 'affiliation'), ({ label }, key) => item[key] && <span className="badge badge-primary ">{ label }: {item[key]}</span>)
                                    
                                    }
                       <button
                            className="btn btn-primary"
                            onClick={this.setSelectedAffiliation}
                            disabled={isMaxAffiliation || !selectedAffiliation}
                        >
                           <i
                               className="fa fa-plus"
                               aria-hidden="true"
                           />&nbsp;
                            Add selected affiliation
                        </button>
                                </a>
                            ))}
                            {
                                !data.length && (<span className="dropdown-item">Not found</span>)
                            }

                        </div>
                    )
                }
            </div>
        )
    }
}

export default AutocompliteInput;
