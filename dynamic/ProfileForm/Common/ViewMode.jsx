import React from 'react';

const styleFormCntrol = {
    border: 'none'
}

function ViewMode({
    lastName,
    firstName,
    changeToEditMode
                  }) {
    return(
        <div>
            <div className="form-group">
                <label>Last name</label>
                <span style={styleFormCntrol} className="form-control">{ lastName || "-" }</span>
            </div>
            <div className="form-group">
                <label>First name</label>
                <span style={styleFormCntrol} className="form-control">{ firstName || "-" }</span>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={changeToEditMode}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"/>&nbsp;
                    Edit
                </button>
            </div>
        </div>
    )
}

export default ViewMode;
