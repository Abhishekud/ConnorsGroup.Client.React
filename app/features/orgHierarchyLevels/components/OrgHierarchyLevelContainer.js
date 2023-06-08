import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import OrgHierarchyLevel from './OrgHierarchyLevel';
import OrgHierarchyLevelEditor from './OrgHierarchyLevelEditor';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {PROFILING_LIST_MANAGEMENT} from '../../authentication/constants/permissions';
import {
  creatingSelector,
  updatingSelector,
  movingSelector,
  makeEditingOrgHierarchyLevelSelector,
  makeOrgHierarchyLevelValidationErrorsSelector,
} from '../selectors/pages/list';
import {
  createOrgHierarchyLevel,
  editOrgHierarchyLevel,
  showDeleteOrgHierarchyLevel,
  setOrgHierarchyLevelModelProperty,
  cancelEditOrgHierarchyLevel,
  updateOrgHierarchyLevel,
  moveOrgHierarchyLevel,
  loadOrgHierarchyLevelsList,
} from '../actions';
import {handleApiError, toastr} from '../../shared/services';
import {ListItemInsertBar} from '../../shared/components';
import {OrgHierarchyLevelModel} from '../models';
import {withRouter} from 'react-router';
import {ORG_HIERARCHY_LEVELS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';

class OrgHierarchyLevelContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEdit() {
    const {orgHierarchyLevel, editOrgHierarchyLevel} = this.props;
    editOrgHierarchyLevel(orgHierarchyLevel.get('id'));
  }

  handleFieldChanged(event) {
    const {name, value} = event.target;
    const {orgHierarchyLevel, setOrgHierarchyLevelModelProperty} = this.props;
    setOrgHierarchyLevelModelProperty(orgHierarchyLevel.get('id'), name, value);
  }

  handleSave() {
    const {orgHierarchyLevel, updateOrgHierarchyLevel, loadOrgHierarchyLevelsList, loadSelectListOptions, router} = this.props;
    updateOrgHierarchyLevel(orgHierarchyLevel.get('id'), orgHierarchyLevel)
      .then(() => {
        loadOrgHierarchyLevelsList();
        loadSelectListOptions(ORG_HIERARCHY_LEVELS);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Hierarchy Level.'));
  }

  handleCancelEdit() {
    const {orgHierarchyLevel, cancelEditOrgHierarchyLevel} = this.props;
    cancelEditOrgHierarchyLevel(orgHierarchyLevel.get('id'));
  }

  handleDelete() {
    const {orgHierarchyLevel, showDeleteOrgHierarchyLevel} = this.props;
    showDeleteOrgHierarchyLevel(orgHierarchyLevel);
  }

  handleMove(moveOrgHierarchyLevelActionType) {
    const {orgHierarchyLevel, moveOrgHierarchyLevel, loadOrgHierarchyLevelsList, loadSelectListOptions, router} = this.props;
    moveOrgHierarchyLevel(orgHierarchyLevel.get('id'), moveOrgHierarchyLevelActionType)
      .then(() => {
        loadOrgHierarchyLevelsList();
        loadSelectListOptions(ORG_HIERARCHY_LEVELS);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to move the Hierarchy Level.'));
  }

  handleCreate(insertAtNumber) {
    const {router} = this.props;
    this.props.createOrgHierarchyLevel(insertAtNumber)
      .catch(error => {
        const {status, data} = error.response || {};
        if (status === 400) {
          toastr.error(data._[0], 'Error', {timeOut: 10000});
        } else {
          handleApiError(error, router, 'An error occurred while attempting to add a Hierarchy Level.');
        }
      });
  }

  render() {
    const {
      creating,
      updating,
      moving,
      editing,
      orgHierarchyLevel,
      validationErrors,
      maxNumber,
      hasData,
      canManageList,
    } = this.props;

    let orgHierarchyLevelComponent;
    const disabled = !canManageList || creating || updating || moving;

    if (editing) {
      orgHierarchyLevelComponent = (
        <OrgHierarchyLevelEditor
          orgHierarchyLevel={orgHierarchyLevel}
          disabled={disabled}
          maxNumber={maxNumber}
          validationErrors={validationErrors}
          onFieldChanged={this.handleFieldChanged}
          onSave={this.handleSave}
          onCancel={this.handleCancelEdit}
          onMove={this.handleMove}
          onDelete={this.handleDelete}
          hasData={hasData} />
      );
    } else {
      orgHierarchyLevelComponent = (
        <OrgHierarchyLevel
          orgHierarchyLevel={orgHierarchyLevel}
          disabled={disabled}
          maxNumber={maxNumber}
          onEdit={this.handleEdit}
          onMove={this.handleMove}
          onDelete={this.handleDelete}
          hasData={hasData} />
      );
    }

    return (
      <div className="org-hierarchy-level-container">
        {orgHierarchyLevel.number === 1
          ? <ListItemInsertBar disabled={disabled || hasData} onClick={this.handleCreate} insertAtIndex={orgHierarchyLevel.number} /> : null}
        {orgHierarchyLevelComponent}
        <ListItemInsertBar disabled={disabled || hasData} onClick={this.handleCreate} insertAtIndex={orgHierarchyLevel.number + 1} />
      </div>
    );
  }
}

OrgHierarchyLevelContainer.propTypes = {
  orgHierarchyLevel: PropTypes.instanceOf(OrgHierarchyLevelModel),
};

function makeMapStateToProps() {
  const editingSelector = makeEditingOrgHierarchyLevelSelector();
  const validationErrorsSelector = makeOrgHierarchyLevelValidationErrorsSelector();
  const canManageListSelector = makeCurrentUserHasPermissionSelector(PROFILING_LIST_MANAGEMENT);

  return (state, ownProps) => ({
    creating: creatingSelector(state),
    updating: updatingSelector(state),
    moving: movingSelector(state),
    editing: editingSelector(state, ownProps),
    validationErrors: validationErrorsSelector(state, ownProps),
    canManageList: canManageListSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    createOrgHierarchyLevel,
    editOrgHierarchyLevel,
    showDeleteOrgHierarchyLevel,
    setOrgHierarchyLevelModelProperty,
    cancelEditOrgHierarchyLevel,
    moveOrgHierarchyLevel,
    updateOrgHierarchyLevel,
    loadOrgHierarchyLevelsList,
    loadSelectListOptions,
  }
)(OrgHierarchyLevelContainer));
