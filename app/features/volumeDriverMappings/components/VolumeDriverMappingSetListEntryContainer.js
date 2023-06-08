import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import VolumeDriverMappingSetListEntry from './VolumeDriverMappingSetListEntry';
import VolumeDriverMappingSetListEntryEditor from './VolumeDriverMappingSetListEntryEditor';
import {
  editVolumeDriverMappingSet,
  cancelEditVolumeDriverMappingSet,
  setVolumeDriverMappingSetModelProperty,
  updateVolumeDriverMappingSet,
  showDeleteVolumeDriverMappingSet,
  loadVolumeDriverMappingSetSelectListOptions,
} from '../actions';
import {
  makeEditingVolumeDriverMappingSetSelector,
  makeSavingVolumeDriverMappingSetSelector,
  makeVolumeDriverMappingSetValidationErrorsSelector,
} from '../selectors/sidebars/sets';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {PROFILING_VOLUME_DRIVER_MAPPING_CREATE, PROFILING_VOLUME_DRIVER_MAPPING_UPDATE} from '../../authentication/constants/permissions';

class VolumeDriverMappingSetListEntryContainer extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEdit() {
    const {volumeDriverMappingSet, editVolumeDriverMappingSet} = this.props;

    editVolumeDriverMappingSet(volumeDriverMappingSet.get('id'));
  }

  handleCancelEdit() {
    const {volumeDriverMappingSet, cancelEditVolumeDriverMappingSet} = this.props;

    cancelEditVolumeDriverMappingSet(volumeDriverMappingSet.get('id'));
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    const {volumeDriverMappingSet, setVolumeDriverMappingSetModelProperty} = this.props;

    setVolumeDriverMappingSetModelProperty(volumeDriverMappingSet.get('id'), name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {
      volumeDriverMappingSet,
      updateVolumeDriverMappingSet,
      loadVolumeDriverMappingSetSelectListOptions,
      router,
    } = this.props;

    updateVolumeDriverMappingSet(volumeDriverMappingSet)
      .then(() => loadVolumeDriverMappingSetSelectListOptions())
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Volume Driver Mapping Set.'));
  }

  handleDelete() {
    const {volumeDriverMappingSet, showDeleteVolumeDriverMappingSet} = this.props;

    showDeleteVolumeDriverMappingSet(volumeDriverMappingSet);
  }

  render() {
    const {
      volumeDriverMappingSet,
      validationErrors,
      pristineVolumeDriverMappingSet,
      canCreate,
      canUpdate,

      editing,
      saving,
    } = this.props;

    if (editing) {
      return (
        <VolumeDriverMappingSetListEntryEditor
          volumeDriverMappingSet={volumeDriverMappingSet}
          validationErrors={validationErrors}
          saving={saving}
          canCreate={canCreate}
          canUpdate={canUpdate}
          onFieldChange={this.handleFieldChange}
          onSave={this.handleSave}
          onCancel={this.handleCancelEdit}
          onDelete={this.handleDelete} />
      );
    }

    return (
      <VolumeDriverMappingSetListEntry
        volumeDriverMappingSet={pristineVolumeDriverMappingSet}
        hasPermission={canUpdate || canCreate}
        onEdit={this.handleEdit} />
    );
  }
}

VolumeDriverMappingSetListEntryContainer.propTypes = {
  pristineVolumeDriverMappingSet: PropTypes.instanceOf(Map).isRequired,
  volumeDriverMappingSet: PropTypes.instanceOf(Map).isRequired,
};

function makeMapStateToProps() {
  const editingSelector = makeEditingVolumeDriverMappingSetSelector();
  const savingSelector = makeSavingVolumeDriverMappingSetSelector();
  const validationErrorsSelector = makeVolumeDriverMappingSetValidationErrorsSelector();
  const canCreateSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_MAPPING_CREATE);
  const canUpdateSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_MAPPING_UPDATE);

  return (state, ownProps) => ({
    editing: editingSelector(state, ownProps),
    saving: savingSelector(state, ownProps),
    validationErrors: validationErrorsSelector(state, ownProps),
    canCreate: canCreateSelector(state),
    canUpdate: canUpdateSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    editVolumeDriverMappingSet,
    cancelEditVolumeDriverMappingSet,
    setVolumeDriverMappingSetModelProperty,
    updateVolumeDriverMappingSet,
    showDeleteVolumeDriverMappingSet,
    loadVolumeDriverMappingSetSelectListOptions,
  }
)(VolumeDriverMappingSetListEntryContainer));
