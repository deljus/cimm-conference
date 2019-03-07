import React, { Component } from 'react'
import { debounce, map, omit } from 'lodash';
import axios from 'axios';
import {FIELDS} from "../ProfileForm/Affiliation/constants";

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
        // const response = await axios({
        //     url,
        //     method: 'get',
        //     data: {
        //         search: value
        //     }
        // });
        if(1){
            //this.setState({ data: response.data })
            this.setState({ data: [{
                organization: 'zdfvzdfvzvfzdvfz',
                    city: 'dzfvzdfv',
                    zip: 124124,
                    address: 'dfgdfgdfgdfgdfgdfg',
                    id:2
                }, {
                    organization: 'zdfvzdfvzvfzdvfz111',
                    city: 'dzfvzdfv',
                    zip: 124124,
                    address: 'dfgdfgdfgdfgdfgdfg',
                    id:2
                }] })
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
            <div style={{ position: 'relative' }} >
                <input
                    ref={this.inputRef}
                    className={className}
                    value={selected && selected.organization}
                    onFocus={this.openDropdown}
                    onChange={this.handleChange}
                />
                {
                    open && (
                        <div ref={this.popupRef} className="dropdown-menu" style={{ display: 'block' }} onBlur={this.closeDropdown} tabIndex={-1} >
                            { data && data.map(item => (
                                <a className="dropdown-item" href="#" onClick={this.onSelectItem(item)} >
                                    <h6>{ item.organization }</h6>
                                    { map(omit(FIELDS, 'organization'), ({ label }, key) => item[key] && <span className="badge badge-primary ">{ label }: {item[key]}</span>) }
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
