import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  FilterSidebarSectionHeaderActions,
} from '../../layout/components';
import LocationDepartmentsListFiltersForm from './LocationDepartmentsListFiltersForm';
import {
  loadLocationDepartmentsList,
  setLocationDepartmentsListFiltersModelProperty,
  clearLocationDepartmentsListFilters,
} from '../actions';
import {
  modelSelector,
  showSelector,
  applyingSelector,
} from '../selectors/sidebars/filters';
import {
  departmentNameSelector,
  locationNameSelector,
} from '../../shared/selectors/components/settings';
import {locationParentNameSelector} from '../../orgHierarchyLevels/selectors/pages/list';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../selectListOptions/selectors';
import {
  DEPARTMENTS,
  LOCATION_PROFILES,
  LOCATION_PARENTS,
} from '../../selectListOptions/constants/selectListTypes';

class LocationDepartmentsListFiltersSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleApply(event) {
    event.preventDefault();

    const {loadLocationDepartmentsList, model} = this.props;
    loadLocationDepartmentsList(model);
  }

  handleClear() {
    this.props.clearLocationDepartmentsListFilters();
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setLocationDepartmentsListFiltersModelProperty(name, value);
  }

  render() {
    const {
      show,
      applying,
      model,
      locationProfiles,
      locationParents,
      locationName,
      locationParentName,
      departmentName,
      departments,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar>
        <FilterSidebarSectionHeaderActions
          onApply={this.handleApply}
          onClear={this.handleClear} />
        <div className="sidebar-scrollable">
          <SidebarSection title="Filters" collapsible={false}>
            <LocationDepartmentsListFiltersForm
              applying={applying}
              model={model}
              locationProfiles={locationProfiles}
              departmentName={departmentName}
              departments={departments}
              locationParents={locationParents}
              locationName={locationName}
              locationParentName={locationParentName}
              onSubmit={this.handleApply}
              onFieldChange={this.handleFieldChange} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const locationProfilesSelector = makeSelectListOptionsArrayWithBlankSelector(LOCATION_PROFILES);
  const locationParentsSelector = makeSelectListOptionsArrayWithBlankSelector(LOCATION_PARENTS);
  const departmentsSelector = makeSelectListOptionsArrayWithBlankSelector(DEPARTMENTS);

  return {
    show: showSelector(state),
    applying: applyingSelector(state),
    model: modelSelector(state),
    locationProfiles: locationProfilesSelector(state),
    departmentName: departmentNameSelector(state),
    departments: departmentsSelector(state),
    locationParents: locationParentsSelector(state),
    locationName: locationNameSelector(state),
    locationParentName: locationParentNameSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    loadLocationDepartmentsList,
    setLocationDepartmentsListFiltersModelProperty,
    clearLocationDepartmentsListFilters,
  }
)(LocationDepartmentsListFiltersSidebar);
