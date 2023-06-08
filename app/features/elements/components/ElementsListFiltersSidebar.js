import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  FilterSidebarSectionHeaderActions,
} from '../../layout/components';
import ElementsListFiltersForm from './ElementsListFiltersForm';
import {
  loadElementsList,
  setElementsListFiltersModelProperty,
  clearElementsListFilters,
} from '../actions';
import {
  modelSelector,
  showSelector,
  applyingSelector,
} from '../selectors/sidebars/filters';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../selectListOptions/selectors';
import {
  ELEMENT_ACTIVITIES,
  ELEMENT_FILTER_TYPES,
  ELEMENT_STATUSES,
  ELEMENT_UNITS_OF_MEASURE,
} from '../../selectListOptions/constants/selectListTypes';

class ElementsListFiltersSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleApply(event) {
    event.preventDefault();

    const {loadElementsList, model, excludeArchivedElements} = this.props;
    loadElementsList(model.set('excludeArchivedElements', excludeArchivedElements));
  }

  handleClear() {
    this.props.clearElementsListFilters();
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setElementsListFiltersModelProperty(name, value);
  }

  render() {
    const {
      show,
      applying,
      model,
      elementUnitsOfMeasure,
      elementActivities,
      elementStatuses,
      elementTypes,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar>
        <FilterSidebarSectionHeaderActions
          onApply={this.handleApply}
          onClear={this.handleClear} />
        <div className="sidebar-scrollable">
          <SidebarSection title="Filters" collapsible={false}>
            <ElementsListFiltersForm
              applying={applying}
              model={model}
              onSubmit={this.handleApply}
              onFieldChange={this.handleFieldChange}
              unitsOfMeasure={elementUnitsOfMeasure}
              activities={elementActivities}
              statuses={elementStatuses}
              elementTypes={elementTypes} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

ElementsListFiltersSidebar.propTypes = {
  excludeArchivedElements: PropTypes.bool,
};

function makeMapStateToProps() {
  const elementUnitsOfMeasureSelector = makeSelectListOptionsArrayWithBlankSelector(ELEMENT_UNITS_OF_MEASURE);
  const elementActivitiesSelector = makeSelectListOptionsArrayWithBlankSelector(ELEMENT_ACTIVITIES);
  const elementStatusesSelector = makeSelectListOptionsArrayWithBlankSelector(ELEMENT_STATUSES);
  const elementTypesSelector = makeSelectListOptionsArrayWithBlankSelector(ELEMENT_FILTER_TYPES);

  return state => ({
    model: modelSelector(state),
    show: showSelector(state),
    applying: applyingSelector(state),
    elementUnitsOfMeasure: elementUnitsOfMeasureSelector(state),
    elementActivities: elementActivitiesSelector(state),
    elementStatuses: elementStatusesSelector(state),
    elementTypes: elementTypesSelector(state),
  });
}

export default connect(
  makeMapStateToProps,
  {
    loadElementsList,
    setElementsListFiltersModelProperty,
    clearElementsListFilters,
  }
)(ElementsListFiltersSidebar);
