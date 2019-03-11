import React from 'react';

const styleFormCntrol = {
  border: 'none'
};

function ViewMode({
  lastName,
  firstName,
  changeToEditMode
}) {
  return (
    <div>
      <div className="form-group row">
        <label className="col-4">Last name</label>
        <span className="col-8">{ lastName || '-' }</span>
      </div>
      <div className="form-group row">
        <label className="col-4">First name</label>
        <span className="col-8">{ firstName || '-' }</span>
      </div>

      <button className="btn btn-primary" onClick={changeToEditMode}>
        <i className="fa fa-pencil-square-o" aria-hidden="true"/>&nbsp;
                    Edit
      </button>
    </div>
  );
}

export default ViewMode;
