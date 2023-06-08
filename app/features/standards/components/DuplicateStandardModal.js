import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {CreateEditModal} from '../../shared/components';
import {handleApiError} from '../../shared/services';
import {
  makeSelectListOptionsArrayWithBlankSelector,
  filingFieldsSelectListOptionsSelector,
} from '../../selectListOptions/selectors';
import {
  departmentNameSelector,
  partFamilyNameSelector,
  enablePartsSelector,
} from '../../shared/selectors/components/settings';
import {
  ALLOWANCES,
  CLASSIFICATIONS,
  LABOR_CATEGORIES,
  DEPARTMENTS,
  PART_FAMILIES,
  JOB_CLASSES,
} from '../../selectListOptions/constants/selectListTypes';
import {
  cancelDuplicateStandard,
  setDuplicateStandardModelProperty,
  setDuplicateStandardDetailFilingFieldModelProperty,
  duplicateStandard,
  loadStandard,
} from '../actions';
import {
  getFilingFieldsAsSelectListOptions,
} from '../../selectListOptions/actions';
import {
  savingSelector,
  showSelector,
  modelSelector,
  standardIdSelector,
  validationErrorsSelector,
} from '../selectors/modals/duplicate';
import StandardDetailsForm from './StandardDetailsForm';
import {makeSelectListOptionsForDepartmentArraySelector} from '../../attributes/selectors/selectListOptions';

class DuplicateStandardModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.props.getFilingFieldsAsSelectListOptions();
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setDuplicateStandardModelProperty(name, value);
  }

  handleFilingFieldChange(e) {
    const {id, value} = e.target;
    const propertyValue = (value === '') ? null : Number(value);
    this.props.setDuplicateStandardDetailFilingFieldModelProperty(id, propertyValue);
  }

  handleSave() {
    const {duplicateStandard, model, standardId, router, loadStandard} = this.props;

    duplicateStandard(standardId, model)
      .then(result => {
        router.push(`/standards/${result.value.data}`);
        loadStandard(result.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to duplicate this Standard.'));
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

    const form =
      <StandardDetailsForm
        creating
        editing
        model={model}
        saving={saving}
        validationErrors={validationErrors}
        departmentName={departmentName}
        allowances={allowances}
        attributes={attributes}
        classifications={classifications}
        departments={departments}
        onFilingFieldChange={this.handleFilingFieldChange}
        filingFields={filingFields}
        jobClasses={jobClasses}
        laborCategories={laborCategories}
        onFieldChange={this.handleFieldChange}
        partsEnabled={partsEnabled}
        partFamilies={partFamilies}
        partFamilyName={partFamilyName} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="Duplicate Standard"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function makeMapStateToProps() {
  const selectListAllowancesSelector = makeSelectListOptionsArrayWithBlankSelector(ALLOWANCES);
  const selectListClassificationsSelector = makeSelectListOptionsArrayWithBlankSelector(CLASSIFICATIONS);
  const selectListLaborCategoriesSelector = makeSelectListOptionsArrayWithBlankSelector(LABOR_CATEGORIES);
  const selectListJobClassesSelector = makeSelectListOptionsArrayWithBlankSelector(JOB_CLASSES);
  const selectListDepartmentsSelector = makeSelectListOptionsArrayWithBlankSelector(DEPARTMENTS);
  const partFamiliesSelector = makeSelectListOptionsArrayWithBlankSelector(PART_FAMILIES);

  return state => {
    const model = modelSelector(state);
    const selectListAttributesSelector = makeSelectListOptionsForDepartmentArraySelector(state);

    return {
      saving: savingSelector(state),
      show: showSelector(state),
      model: modelSelector(state),
      standardId: standardIdSelector(state),
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
      partFamilies: partFamiliesSelector(state),
      partFamilyName: partFamilyNameSelector(state),
    };
  };
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    handleCancel: cancelDuplicateStandard,
    setDuplicateStandardModelProperty,
    getFilingFieldsAsSelectListOptions,
    setDuplicateStandardDetailFilingFieldModelProperty,
    duplicateStandard,
    loadStandard,
  }
)(DuplicateStandardModal));
