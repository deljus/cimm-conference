import React from 'react';

const styleFormCntrol = {
    border: 'none'
}

function ViewMode({
    index,
    country,
    city,
    affiliation,
    address,
    zip,
    changeToEditMode
                  }) {
    return(
        <div>
            <div className="form-group">
                <label>Country</label>
                <span style={styleFormCntrol} className="form-control">{ country || "-" }</span>
            </div>
            <div className="form-group">
                <label>City</label>
                <span style={styleFormCntrol} className="form-control">{ city || "-" }</span>
            </div>
            <div className="form-group">
                <label>Affiliation</label>
                <span style={styleFormCntrol} className="form-control">{ affiliation || "-" }</span>
            </div>
            <div className="form-group">
                <label>Address</label>
                <span style={styleFormCntrol} className="form-control">{ address || "-" }</span>
            </div>
            <div className="form-group">
                <label>Zip</label>
                <span style={styleFormCntrol} className="form-control">{ zip || "-" }</span>
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
