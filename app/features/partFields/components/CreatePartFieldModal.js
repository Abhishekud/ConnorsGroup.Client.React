import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {fromJS} from 'immutable';
import {CreateEditModal} from '../../shared/components';
import CreateEditPartFieldForm from './CreateEditPartFieldForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {partNameSelector} from '../../shared/selectors/components/settings';
import {
  cancelCreatePartField,
  createPartField,
  selectPartField,
  setCreatePartFieldModelProperty,
} from '../actions';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {PART_FIELDS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';

class CreatePartFieldModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    let {value} = event.target;
    const {name, type, checked} = event.target;
    if (type === 'checkbox') value = checked;
    this.props.setCreatePartFieldModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createPartField, selectPartField, model, loadSelectListOptions, router, partName} = this.props;

    createPartField(model)
      .then(response => {
        selectPartField(fromJS(response.action.payload.data));
        loadSelectListOptions(PART_FIELDS);
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to add this ${partName} Field.`, 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors, partName} = this.props;

    const form =
      <CreateEditPartFieldForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={`New ${partName} Field`}
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    partName: partNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreatePartField,
    setCreatePartFieldModelProperty,
    createPartField,
    selectPartField,
    loadSelectListOptions,
  }
)(CreatePartFieldModal));
