import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {CreateEditModal} from '../../shared/components';
import CreateCharacteristicSetForm from './CreateCharacteristicSetForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/createSet';
import {
  columnsSelector,
  selectedDepartmentIdSelector,
} from '../selectors/pages/list';
import {
  cancelCreateCharacteristicSet,
  createCharacteristicSet,
  setCreateCharacteristicSetModelProperty,
  loadCharacteristicSetSelectListOptions,
  reorderCharacteristicsColumn,
} from '../actions';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreateCharacteristicSetModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateCharacteristicSetModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createCharacteristicSet, loadCharacteristicSetSelectListOptions, model, selectedDepartmentId, onCreateCharacteristicSet, router, reorderCharacteristicsColumn} = this.props;

    createCharacteristicSet(model, selectedDepartmentId)
      .then(response => {
        const responseData = response.value.data;
        onCreateCharacteristicSet(responseData);
        loadCharacteristicSetSelectListOptions();
        if (responseData.characteristicSet.default) {
          const {columns} = this.props;
          const newColumn = columns.find(c => c.get('title') === responseData.characteristicSet.name);
          const newIndex = columns.filter(c => c.get('locked')).size;
          reorderCharacteristicsColumn(newColumn.get('field'), newColumn.get('orderIndex'), newIndex);
        }
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Characteristic Set.', 'Error'));
  }

  render() {
    const {
      handleCancel,
      saving,
      show,
      model,
      validationErrors,
      characteristicSets,
    } = this.props;

    const form =
      <CreateCharacteristicSetForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSetValueChange={this.handleSetValueChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model}
        characteristicSets={characteristicSets} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Characteristic Set"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

CreateCharacteristicSetModal.propTypes = {
  characteristicSets: PropTypes.instanceOf(List).isRequired,
};

function mapStateToProps(state) {
  return {
    saving: savingSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    columns: columnsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateCharacteristicSet,
    setCreateCharacteristicSetModelProperty,
    createCharacteristicSet,
    loadCharacteristicSetSelectListOptions,
    reorderCharacteristicsColumn,
  }
)(CreateCharacteristicSetModal));
