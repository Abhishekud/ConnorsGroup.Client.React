import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  FilterSidebarSectionHeaderActions,
} from '../../layout/components';
import CharacteristicsListFiltersForm from './CharacteristicsListFiltersForm';
import {
  loadCharacteristicsList,
  setCharacteristicsListFiltersModelProperty,
  clearCharacteristicsSidebarFilters,
} from '../actions';
import {
  modelSelector,
  showSelector,
  applyingSelector,
} from '../selectors/sidebars/filters';
import {
  selectedDepartmentIdSelector,
} from '../selectors/pages/list';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../selectListOptions/selectors';
import {ACTIVE_STATUSES} from '../../selectListOptions/constants/selectListTypes';

class CharacteristicsListFiltersSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleApply(event) {
    event.preventDefault();

    const {loadCharacteristicsList, model, selectedDepartmentId} = this.props;
    loadCharacteristicsList(model, selectedDepartmentId);
  }

  handleClear() {
    this.props.clearCharacteristicsSidebarFilters();
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCharacteristicsListFiltersModelProperty(name, value);
  }

  render() {
    const {
      show,
      applying,
      model,
      activeStatuses,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar>
        <FilterSidebarSectionHeaderActions
          onApply={this.handleApply}
          onClear={this.handleClear} />
        <div className="sidebar-scrollable">
          <SidebarSection title="Filters" collapsible={false}>
            <CharacteristicsListFiltersForm
              applying={applying}
              model={model}
              activeStatuses={activeStatuses}
              onSubmit={this.handleApply}
              onFieldChange={this.handleFieldChange} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const activeStatusesSelector = makeSelectListOptionsArrayWithBlankSelector(ACTIVE_STATUSES, 'All Characteristics');
  return {
    model: modelSelector(state),
    show: showSelector(state),
    applying: applyingSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    activeStatuses: activeStatusesSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    loadCharacteristicsList,
    setCharacteristicsListFiltersModelProperty,
    clearCharacteristicsSidebarFilters,
  }
)(CharacteristicsListFiltersSidebar);
