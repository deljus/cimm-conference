import React from 'react';
import Common from './Common/Main';
import Affiliation from './Affiliation/Main';
import { apiRoutes } from '../../utils/globalConfig';


function ProfileForm() {
  return (
    <>
        <div className="row">
          <div className="col-4">
            <Common/>
          </div>
        </div>
        <div className="py-4 pl-4">
          <h2>Affiliation(s):</h2>
          <Affiliation
            getUrl={apiRoutes.affiliation.me}
            delUrl={apiRoutes.affiliation.me}
            boundUrl={apiRoutes.affiliation.boundForMe}
            setUrl={apiRoutes.affiliation.me}
          />
        </div>
    </>
  );
}


export default ProfileForm;
