import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {fromJS} from 'immutable';
import {CreateEditModal} from '../../shared/components';
import CreateEditStandardFilingFieldOptionForm from './CreateEditStandardFilingFieldOptionForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
  standardFilingFieldIdSelector,
} from '../selectors/modals/create';
import {
  cancelCreateStandardFilingFieldOption,
  createStandardFilingFieldOption,
  selectStandardFilingFieldOption,
  setCreateStandardFilingFieldOptionModelProperty,
} from '../actions';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {selectedStandardFilingFieldSelector} from '../../standardsListManagement/selectors';

class CreateStandardFilingFieldOptionModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateStandardFilingFieldOptionModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {
      createStandardFilingFieldOption,
      selectStandardFilingFieldOption,
      standardFilingFieldId,
      model,
      router,
    } = this.props;

    createStandardFilingFieldOption(standardFilingFieldId, model)
      .then(response => {
        selectStandardFilingFieldOption(standardFilingFieldId, fromJS(response.action.payload.data));
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Standard Filing Field Option.', 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors, selectedStandardFilingField} = this.props;

    const form =
      <CreateEditStandardFilingFieldOptionForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={`New ${selectedStandardFilingField.get('name')}`}
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
    standardFilingFieldId: standardFilingFieldIdSelector(state),
    selectedStandardFilingField: selectedStandardFilingFieldSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateStandardFilingFieldOption,
    setCreateStandardFilingFieldOptionModelProperty,
    createStandardFilingFieldOption,
    selectStandardFilingFieldOption,
  }
)(CreateStandardFilingFieldOptionModal));
