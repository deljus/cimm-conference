import React from 'react';

const Alerts = ({
  text, type, show, onDismiss
}) => (
  show ? (<div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
    { text }
    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onDismiss}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>) : null
);

export default Alerts;
