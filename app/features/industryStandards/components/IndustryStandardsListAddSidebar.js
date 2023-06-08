import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Sidebar, SidebarSection} from '../../layout/components';
import IndustryStandardsListAddForm from './IndustryStandardsListAddForm';
import {
  loadIndustryStandardsList,
  setIndustryStandardsFilterProperty,
  setIndustryStandardsCopyProperty,
} from '../actions';
import {loadStandardsList} from '../../standards/actions';
import {
  loadingSelector,
  selectedIndustrySourceIdSelector,
} from '../selectors/pages/list';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../selectListOptions/selectors';
import {modelSelector} from '../selectors/sidebars/industryStandardsListAddSidebar';
import departmentNameSelector from '../../shared/selectors/components/settings/departmentNameSelector';

class IndustryStandardsListAddSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    const {
      setIndustryStandardsCopyProperty,
      selectedIndustrySourceId,
      loadIndustryStandardsList,
    } = this.props;

    setIndustryStandardsCopyProperty(name, value);

    if (name === 'intoDepartmentId') {
      loadIndustryStandardsList(selectedIndustrySourceId, value);
    }
  }

  render() {
    const {model, departments, loading, departmentName} = this.props;
    return (
      <Sidebar>
        <div className="sidebar-scrollable">
          <SidebarSection title={`Import Into ${ departmentName}`} collapsible={false} >
            <IndustryStandardsListAddForm
              model={model}
              onSave={this.handleSave}
              onClear={this.handleClear}
              onFieldChange={this.handleFieldChange}
              loading={loading}
              departments={departments}
              label={departmentName} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const departmentsSelector = makeSelectListOptionsArrayWithBlankSelector(DEPARTMENTS, '[Current]');
  return {
    loading: loadingSelector(state),
    departments: departmentsSelector(state),
    selectedIndustrySourceId: selectedIndustrySourceIdSelector(state),
    model: modelSelector(state),
    departmentName: departmentNameSelector(state),
  };
}

export default connect(mapStateToProps, {
  loadIndustryStandardsList,
  setIndustryStandardsFilterProperty,
  setIndustryStandardsCopyProperty,
  loadStandardsList,
})(IndustryStandardsListAddSidebar);
