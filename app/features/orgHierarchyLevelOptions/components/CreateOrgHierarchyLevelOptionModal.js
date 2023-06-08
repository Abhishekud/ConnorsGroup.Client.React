import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {fromJS} from 'immutable';
import {CreateEditModal} from '../../shared/components';
import CreateEditOrgHierarchyLevelOptionForm from './CreateEditOrgHierarchyLevelOptionForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
  orgHierarchyLevelIdSelector,
} from '../selectors/modals/create';
import {
  selectedOrgHierarchyLevelNumberSelector,
  parentOrgHierarchyLevelOptionSelectListOptionsArraySelector,
} from '../selectors/pages/list';
import {
  loadSelectListOptions,
} from '../../selectListOptions/actions';
import {LOCATION_PARENTS} from '../../selectListOptions/constants/selectListTypes';
import {
  cancelCreateOrgHierarchyLevelOption,
  createOrgHierarchyLevelOption,
  selectOrgHierarchyLevelOption,
  setCreateOrgHierarchyLevelOptionModelProperty,
} from '../actions';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreateOrgHierarchyLevelOptionModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateOrgHierarchyLevelOptionModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {
      createOrgHierarchyLevelOption,
      selectOrgHierarchyLevelOption,
      orgHierarchyLevelId,
      model,
      router,
      loadSelectListOptions,
    } = this.props;

    createOrgHierarchyLevelOption(orgHierarchyLevelId, model)
      .then(response => {
        selectOrgHierarchyLevelOption(orgHierarchyLevelId, fromJS(response.action.payload.data));
        loadSelectListOptions(LOCATION_PARENTS);
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Hierarchy Level Option.', 'Error'));
  }

  render() {
    const {
      handleCancel,
      saving, show, model, validationErrors,
      selectedOrgHierarchyLevelNumber,
      parentOrgHierarchyLevelOptionSelectListOptions,
    } = this.props;

    if (show && !model.get('parentOrgHierarchyLevelOptionId') && parentOrgHierarchyLevelOptionSelectListOptions.length) {
      setTimeout(() => this.handleFieldChange({
        target: {
          name: 'parentOrgHierarchyLevelOptionId',
          value: parentOrgHierarchyLevelOptionSelectListOptions[0].value,
        },
      }));
    }

    const form =
      <CreateEditOrgHierarchyLevelOptionForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model}
        selectedOrgHierarchyLevelNumber={selectedOrgHierarchyLevelNumber}
        parentOrgHierarchyLevelOptionSelectListOptions={parentOrgHierarchyLevelOptionSelectListOptions} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Hierarchy Level Option"
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
    orgHierarchyLevelId: orgHierarchyLevelIdSelector(state),
    selectedOrgHierarchyLevelNumber: selectedOrgHierarchyLevelNumberSelector(state),
    parentOrgHierarchyLevelOptionSelectListOptions: parentOrgHierarchyLevelOptionSelectListOptionsArraySelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateOrgHierarchyLevelOption,
    setCreateOrgHierarchyLevelOptionModelProperty,
    createOrgHierarchyLevelOption,
    selectOrgHierarchyLevelOption,
    loadSelectListOptions,
  }
)(CreateOrgHierarchyLevelOptionModal));
