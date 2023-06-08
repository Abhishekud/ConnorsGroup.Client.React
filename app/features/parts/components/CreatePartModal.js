import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditPartForm from './CreateEditPartForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {partNameSelector} from '../../shared/selectors/components/settings';
import {selectedPartFamilyIdSelector} from '../selectors/pages/list';
import {
  cancelCreatePart,
  createPart,
  selectPart,
  setCreatePartModelProperty,
  setCreatePartFieldValueModelProperty,
} from '../actions';
import {fromJS} from 'immutable';
import React, {Component} from 'react';
import {PART_FIELDS} from '../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreatePartModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreatePartModelProperty(name, value);
  }

  handlePartFieldChange(event) {
    const {id, value} = event.target;
    this.props.setCreatePartFieldValueModelProperty(id, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createPart, selectPart, selectedPartFamilyId, model, router, partName} = this.props;

    createPart(selectedPartFamilyId, model)
      .then(response => selectPart(fromJS(response.action.payload.data)))
      .catch(error => handleApiError(error, router, `An error occurred while attempting to add this ${partName}`, 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors, partFields, partName} = this.props;

    const form =
      <CreateEditPartForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onPartFieldChange={this.handlePartFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model}
        partFields={partFields} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={`New ${partName}`}
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  const partFieldsSelector = makeSelectListOptionsArraySelector(PART_FIELDS);

  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    partFields: partFieldsSelector(state),
    selectedPartFamilyId: selectedPartFamilyIdSelector(state),
    partName: partNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreatePart,
    setCreatePartModelProperty,
    setCreatePartFieldValueModelProperty,
    createPart,
    selectPart,
  }
)(CreatePartModal));
