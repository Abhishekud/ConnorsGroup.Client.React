import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {fromJS, List} from 'immutable';
import {CreateEditModal} from '../../shared/components';
import CreateEditCharacteristicForm from './CreateEditCharacteristicForm';
import {
  selectedDepartmentIdSelector,
} from '../selectors/pages/list';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateCharacteristic,
  createCharacteristic,
  selectCharacteristic,
  setCreateCharacteristicModelProperty,
  setCreateCharacteristicModelSetValue,
} from '../actions';
import {ACTIVE_STATUSES} from '../../selectListOptions/constants/selectListTypes';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';

class CreateCharacteristicModal extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateCharacteristicModelProperty(name, value);
  }

  handleSetValueChange(event) {
    const {name, value} = event.target;
    this.props.setCreateCharacteristicModelSetValue(Number(name), value);
  }

  handleCreateEditModalSave(event) {
    event.preventDefault();

    const {createCharacteristic, selectedDepartmentId, selectCharacteristic, model, router, handleToggleCreateCharacteristic, reloadCharacteristics, loadCharacteristicDetails} = this.props;
    const departmentId = selectedDepartmentId ?? this.props.standardsSelectedDepartmentId;

    createCharacteristic(model, departmentId)
      .then(response => {
        if (reloadCharacteristics) reloadCharacteristics();
        if (handleToggleCreateCharacteristic) {
          handleToggleCreateCharacteristic(model);
        } else {
          loadCharacteristicDetails(response.action.payload.data.id).then(() =>
            selectCharacteristic(fromJS(response.action.payload.data))
          );
        }
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Characteristic.', 'Error'));
  }
  handleCreateEditModalCancel() {
    const {handleCancel, handleToggleCreateCharacteristic} = this.props;
    handleCancel();
    if (handleToggleCreateCharacteristic) {
      handleToggleCreateCharacteristic();
    }
  }
  render() {
    const {
      saving,
      show,
      model,
      validationErrors,
      characteristicSets,
      activeStatuses,
      disableActiveStatus,
    } = this.props;
    const form =
      <CreateEditCharacteristicForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSetValueChange={this.handleSetValueChange}
        onSubmit={this.handleCreateEditModalSave}
        validationErrors={validationErrors}
        model={model}
        focusOnCharacteristicSetId={null}
        characteristicSets={characteristicSets}
        activeStatuses={activeStatuses}
        disableActiveStatus={disableActiveStatus}
        isCreateCharacteristic />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Characteristic"
        form={form}
        onCancel={this.handleCreateEditModalCancel}
        onSave={this.handleCreateEditModalSave} />
    );
  }
}

CreateCharacteristicModal.propTypes = {
  characteristicSets: PropTypes.instanceOf(List).isRequired,
};

function mapStateToProps(state) {
  const activeStatusesSelector = makeSelectListOptionsArraySelector(ACTIVE_STATUSES);
  return {
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    activeStatuses: activeStatusesSelector(state),
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateCharacteristic,
    setCreateCharacteristicModelProperty,
    setCreateCharacteristicModelSetValue,
    createCharacteristic,
    selectCharacteristic,
  }
)(CreateCharacteristicModal));
