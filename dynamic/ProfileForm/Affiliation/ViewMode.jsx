import React, { Fragment } from 'react';
import { map } from 'lodash';
import { AFFILIATION_FIELDS } from '../../../utils/globalConfig';
import { TextInput } from 'react-bootstrap4-form-validation';

const styleFormCntrol = {
  border: 'none'
};

function ViewMode({
  index,
  changeToEditMode,
  deleteInState,
  ...rest
}) {
  const deleteInStateFn = (e) => {
    e.preventDefault();
    deleteInState(index);
  };

  return (
    <div className="affiliation-user">
      {
        map(AFFILIATION_FIELDS, (item, key) => (
          <div className="form-group row">
            <label className="col-4">{ item.label }:</label>
            <span
              className="col-8"
            >{rest[key]}</span>
          </div>
        ))
      }

      <button className="btn btn-danger" onClick={deleteInStateFn}>
        <i className="fa fa-trash" aria-hidden="true" />&nbsp;
                    Delete
      </button>
    </div>
  );
}

export default ViewMode;
