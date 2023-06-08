import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import {handleApiError} from '../../shared/services';
import StandardDetailsForm from './StandardDetailsForm';
import {
  makeSelectListOptionsArrayWithBlankSelector,
  filingFieldsSelectListOptionsSelector,
} from '../../selectListOptions/selectors';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  ALLOWANCES,
  CLASSIFICATIONS,
  LABOR_CATEGORIES,
  DEPARTMENTS,
  PART_FAMILIES,
  JOB_CLASSES,
} from '../../selectListOptions/constants/selectListTypes';
import {
  cancelCreateStandard,
  createStandard,
  setCreateStandardModelProperty,
  setCreateStandardDetailFilingFieldModelProperty,
} from '../actions';
import {
  getFilingFieldsAsSelectListOptions,
} from '../../selectListOptions/actions';
import {
  departmentNameSelector,
  partFamilyNameSelector,
  enablePartsSelector,
} from '../../shared/selectors/components/settings';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {makeSelectListOptionsForDepartmentArraySelector} from '../../attributes/selectors/selectListOptions';

class CreateStandardModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.props.getFilingFieldsAsSelectListOptions();
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateStandardModelProperty(name, value);
  }

  handleFilingFieldChange(e) {
    const {id, value} = e.target;
    const propertyValue = (value === '') ? null : Number(value);
    this.props.setCreateStandardDetailFilingFieldModelProperty(id, propertyValue);
  }

  handleSave(event) {
    event.preventDefault();

    const {createStandard, model, router} = this.props;

    createStandard(model)
      .then(response => router.push(`/standards/${response.action.payload.data}`))
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Standard.'));
  }

  render() {
    const {
      handleCancel,
      saving,
      show,
      model,
      validationErrors,
      allowances,
      classifications,
      attributes,
      departments,
      jobClasses,
      laborCategories,
      departmentName,
      filingFields,
      partsEnabled,
      partFamilies,
      partFamilyName,
    } = this.props;

    const form = <StandardDetailsForm
      model={model}
      validationErrors={validationErrors}
      saving={saving}
      departmentName={departmentName}
      creating
      editing
      onFieldChange={this.handleFieldChange}
      allowances={allowances}
      onFilingFieldChange={this.handleFilingFieldChange}
      filingFields={filingFields}
      partsEnabled={partsEnabled}
      partFamilies={partFamilies}
      partFamilyName={partFamilyName}
      classifications={classifications}
      attributes={attributes}
      departments={departments}
      jobClasses={jobClasses}
      laborCategories={laborCategories} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={'New Standard'}
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function makeMapStateToProps() {
  const selectListAllowancesSelector = makeSelectListOptionsArrayWithBlankSelector(ALLOWANCES);
  const selectListClassificationsSelector = makeSelectListOptionsArrayWithBlankSelector(CLASSIFICATIONS);
  const selectListJobClassesSelector = makeSelectListOptionsArrayWithBlankSelector(JOB_CLASSES);
  const selectListLaborCategoriesSelector = makeSelectListOptionsArrayWithBlankSelector(LABOR_CATEGORIES);
  const selectListDepartmentsSelector = makeSelectListOptionsArrayWithBlankSelector(DEPARTMENTS);
  const selectListPartFamiliesSelector = makeSelectListOptionsArrayWithBlankSelector(PART_FAMILIES);

  return state => {
    const model = modelSelector(state);
    const selectListAttributesSelector = makeSelectListOptionsForDepartmentArraySelector(state);

    return {
      saving: savingSelector(state),
      show: showSelector(state),
      model,
      validationErrors: validationErrorsSelector(state),
      allowances: selectListAllowancesSelector(state),
      classifications: selectListClassificationsSelector(state),
      attributes: selectListAttributesSelector(model.get('departmentId')),
      departments: selectListDepartmentsSelector(state),
      jobClasses: selectListJobClassesSelector(state),
      laborCategories: selectListLaborCategoriesSelector(state),
      departmentName: departmentNameSelector(state),
      filingFields: filingFieldsSelectListOptionsSelector(state),
      partsEnabled: enablePartsSelector(state),
      partFamilies: selectListPartFamiliesSelector(state),
      partFamilyName: partFamilyNameSelector(state),
    };
  };
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    handleCancel: cancelCreateStandard,
    setCreateStandardModelProperty,
    setCreateStandardDetailFilingFieldModelProperty,
    getFilingFieldsAsSelectListOptions,
    createStandard,
  }
)(CreateStandardModal));
