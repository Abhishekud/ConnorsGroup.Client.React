import React from 'react';
import {PropTypes} from 'prop-types';
import {Button} from 'react-bootstrap';
import {ConfirmResetModal} from '.';

export const AdminToolsActions = ({
  calculationInProgress, hasAdminUsersPermissions, hasTrainingParticipantPermissions, handleLaborCalculationClick,
  resetSiteButtonVisible, onHandleResetSiteClick, confirmResetModalVisible, showConfirmResetModal, hideConfirmResetModal, resetModalProcessing,
}) =>
  (<>
    <hr />
    <h2>Actions</h2>
    <div className="settings-row">
      <div className="fields">
        <div className="field">
          <Button className="btn btn-default" disabled={calculationInProgress} onClick={handleLaborCalculationClick}>Calculate Labor</Button>
        </div>
        { resetSiteButtonVisible && hasAdminUsersPermissions && !hasTrainingParticipantPermissions &&
          <div>
            <Button className="btn btn-default reset-btn" onClick={showConfirmResetModal}>Reset Site</Button>
          </div>
        }
      </div>
    </div>
    <ConfirmResetModal show={confirmResetModalVisible} processing={resetModalProcessing} onCancel={hideConfirmResetModal} onConfirm={onHandleResetSiteClick} />
  </>);

AdminToolsActions.propTypes = {
  calculationInProgress: PropTypes.bool.isRequired,
  hasAdminUsersPermissions: PropTypes.bool.isRequired,
  hasTrainingParticipantPermissions: PropTypes.bool.isRequired,
  handleLaborCalculationClick: PropTypes.func.isRequired,
  resetSiteButtonVisible: PropTypes.bool.isRequired,
  onHandleResetSiteClick: PropTypes.func.isRequired,
  confirmResetModalVisible: PropTypes.bool.isRequired,
  showConfirmResetModal: PropTypes.func.isRequired,
  hideConfirmResetModal: PropTypes.func.isRequired,
  resetModalProcessing: PropTypes.bool.isRequired,
};

export default AdminToolsActions;
