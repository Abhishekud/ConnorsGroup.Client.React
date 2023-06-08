import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditPartFamilyForm from './CreateEditPartFamilyForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {partFamilyNameSelector} from '../../shared/selectors/components/settings';
import {
  cancelCreatePartFamily,
  createPartFamily,
  selectPartFamily,
  setCreatePartFamilyModelProperty,
} from '../actions';
import {fromJS} from 'immutable';
import React, {Component} from 'react';
import {PART_FAMILIES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreatePartFamilyModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreatePartFamilyModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createPartFamily, selectPartFamily, model, loadSelectListOptions, router, partFamilyName} = this.props;

    createPartFamily(model)
      .then(response => {
        selectPartFamily(fromJS(response.action.payload.data));
        loadSelectListOptions(PART_FAMILIES);
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to add this ${partFamilyName}`, 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors, partFamilyName} = this.props;

    const form =
      <CreateEditPartFamilyForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={`New ${partFamilyName}`}
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
    partFamilyName: partFamilyNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreatePartFamily,
    setCreatePartFamilyModelProperty,
    createPartFamily,
    selectPartFamily,
    loadSelectListOptions,
  }
)(CreatePartFamilyModal));
