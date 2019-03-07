import React from 'react';
import Common from './Common/Main';
import Affiliation from './Affiliation/Main';


function ProfileForm() {
  return (
    <>
        <div className="row">
          <div className="col-4">
            <Common/>
          </div>
        </div>
        <Affiliation/>
    </>
  );
}


export default ProfileForm;
