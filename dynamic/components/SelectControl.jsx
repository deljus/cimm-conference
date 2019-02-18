import React from 'react'
import { BaseFormControl } from "react-bootstrap4-form-validation"
import { Typeahead } from 'react-bootstrap-typeahead';

//Need to extends BaseFormControl to have the validation feature
class SelectControl extends BaseFormControl{
    constructor(props){
        super(props);
        this.inputRef = React.createRef();
        this.getInputRef = this.getInputRef.bind(this);
    }

    getInputRef(){
        return this.inputRef.getInput();
    };

    handleChange = (value) => {
        const { name, multiple } = this.props;
        this.checkError();
        if(this.props.onChange) this.props.onChange({ target: { name, value } });
    };

    render () {

        const { value } = this.props;

        return (
            <React.Fragment>
                <Typeahead
                    selected={value}
                    ref={(typeahead) => this.inputRef = typeahead}
                    {...this.filterProps()}
                    onChange={this.handleChange}/>
                    { this.displayErrorMessage() }
                    { this.displaySuccessMessage() }
            </React.Fragment>
        )
    }
}

export default SelectControl;
