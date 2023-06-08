import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  FilterSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  loadStandardsList,
  setStandardsListFiltersModelProperty,
  setStandardListFiltersFilingFieldModelProperty,
  clearStandardsListFilters,
} from '../actions';
import {
  makeSelectListOptionsArrayWithBlankSelector,
  filingFieldsSelectListOptionsSelector,
} from '../../selectListOptions/selectors';
import {
  ALLOWANCES,
  APPLICATORS,
  CLASSIFICATIONS,
  ATTRIBUTES,
  LABOR_CATEGORIES,
  DEPARTMENTS,
  STANDARD_STATUSES,
  JOB_CLASSES,
} from '../../selectListOptions/constants/selectListTypes';
import {
  modelSelector,
  filingFieldValuesSelector,
  showSelector,
  applyingSelector,
} from '../selectors/sidebars/filters';
import {
  departmentNameSelector,
} from '../../shared/selectors/components/settings';
import StandardsListFiltersForm from './StandardsListFiltersForm';

class StandardsListFilterSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setStandardsListFiltersModelProperty(name, value);
  }

  handleFilingFieldChange(e) {
    const {id, value} = e.target;
    const selectedValue = value;
    const propertyValue = (selectedValue === '') ? null : Number(selectedValue);
    this.props.setStandardListFiltersFilingFieldModelProperty(id, propertyValue);
  }

  handleApply(event) {
    event.preventDefault();

    const {loadStandardsList, model, filingFieldValues} = this.props;
    const filterModel = model.set('filingFieldValues', filingFieldValues);
    loadStandardsList(filterModel);
  }

  render() {
    const {
      show,
      model,
      applying,
      allowances,
      applicators,
      classifications,
      attributes,
      departments,
      jobClasses,
      laborCategories,
      statuses,
      handleClear,
      departmentName,
      filingFields,
      filingFieldValues,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar>
        <FilterSidebarSectionHeaderActions
          onApply={this.handleApply}
          onClear={handleClear} />
        <div className="sidebar-scrollable">
          <SidebarSection title="Filters">
            <StandardsListFiltersForm
              model={model}
              applying={applying}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleApply}
              allowances={allowances}
              applicators={applicators}
              classifications={classifications}
              attributes={attributes}
              departmentName={departmentName}
              departments={departments}
              laborCategories={laborCategories}
              jobClasses={jobClasses}
              statuses={statuses}
              onFilingFieldChange={this.handleFilingFieldChange}
              filingFields={filingFields}
              filingFieldValues={filingFieldValues} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function makeMapStateToProps() {
  const selectListAllowancesSelector = makeSelectListOptionsArrayWithBlankSelector(ALLOWANCES);
  const selectListApplicatorsSelector = makeSelectListOptionsArrayWithBlankSelector(APPLICATORS);
  const selectListClassificationsSelector = makeSelectListOptionsArrayWithBlankSelector(CLASSIFICATIONS);
  const selectListAttributesSelector = makeSelectListOptionsArrayWithBlankSelector(ATTRIBUTES);
  const selectListLaborCategoriesSelector = makeSelectListOptionsArrayWithBlankSelector(LABOR_CATEGORIES);
  const selectListDepartmentsSelector = makeSelectListOptionsArrayWithBlankSelector(DEPARTMENTS);
  const selectListStatusesSelector = makeSelectListOptionsArrayWithBlankSelector(STANDARD_STATUSES);
  const selectListJobClassesSelector = makeSelectListOptionsArrayWithBlankSelector(JOB_CLASSES);

  return state => ({
    model: modelSelector(state),
    filingFieldValues: filingFieldValuesSelector(state),
    show: showSelector(state),
    applying: applyingSelector(state),
    allowances: selectListAllowancesSelector(state),
    applicators: selectListApplicatorsSelector(state),
    classifications: selectListClassificationsSelector(state),
    attributes: selectListAttributesSelector(state),
    departments: selectListDepartmentsSelector(state),
    jobClasses: selectListJobClassesSelector(state),
    laborCategories: selectListLaborCategoriesSelector(state),
    statuses: selectListStatusesSelector(state),
    departmentName: departmentNameSelector(state),
    filingFields: filingFieldsSelectListOptionsSelector(state),
  });
}

export default connect(
  makeMapStateToProps,
  {
    loadStandardsList,
    setStandardsListFiltersModelProperty,
    handleClear: clearStandardsListFilters,
    setStandardListFiltersFilingFieldModelProperty,
  }
)(StandardsListFilterSidebar);
