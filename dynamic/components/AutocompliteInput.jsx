import React from 'react'
import { BaseFormControl } from "react-bootstrap4-form-validation"
import { debounce } from 'lodash';
import axios from 'axios';

//Need to extends BaseFormControl to have the validation feature
class MaskInputComponent extends BaseFormControl{
    constructor(props){
        super(props);
        this.inputRef = React.createRef();
        this.getInputRef = this.getInputRef.bind(this);
        this.state = {
            data: []
        }
    }

    getInputRef(){
        return this.inputRef.current.inputElement;
    };

    fetchFn = debounce(async(value) => {
        axios()
    });

    handleChange = (e) => {
        //Call this.checkError to validate the input
        this.checkError();
        //Pass along the event object for controlled component
        if(this.props.onChange) this.props.onChange(e);
    }

    render () {
        return (
            <React.Fragment>
                <input ref={this.inputRef} {...this.filterProps()} onChange={this.handleChange}/>
                <div className="dropdown-menu">
                    <span className="dropdown-item-text">Dropdown item text</span>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
                { this.displayErrorMessage() }
                { this.displaySuccessMessage() }
            </React.Fragment>
        )
    }
}

export default MaskInputComponent;
