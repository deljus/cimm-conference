import React from 'react'
import { BaseFormControl } from "react-bootstrap4-form-validation"
import MaskedInput from 'react-text-mask'

//Need to extends BaseFormControl to have the validation feature
class MaskInputComponent extends BaseFormControl{
    constructor(props){
        super(props);
        this.inputRef = React.createRef();
        this.getInputRef = this.getInputRef.bind(this);
    }

    getInputRef(){
        return this.inputRef.current.inputElement;
    };

    handleChange = (e) => {
        //Call this.checkError to validate the input
        this.checkError();
        //Pass along the event object for controlled component
        if(this.props.onChange) this.props.onChange(e);
    }

    render () {
        return (
            <React.Fragment>
                <MaskedInput ref={this.inputRef} {...this.filterProps()} onChange={this.handleChange}/>
                { this.displayErrorMessage() }
                { this.displaySuccessMessage() }
            </React.Fragment>
        )
    }
}

export default MaskInputComponent;
