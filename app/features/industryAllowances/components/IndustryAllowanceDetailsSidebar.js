import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
} from '../../layout/components';
import {
  showSelector,
  workingModelSelector,
} from '../selectors/sidebars/industryAllowanceDetails';
import {workingModelSelector as industryAllowanceRestModel} from '../selectors/sidebars/industryAllowanceRestDetails';
import {withRouter} from 'react-router';
import IndustryAllowanceDetailsForm from './IndustryAllowanceDetailsForm';
import {loadIndustryAllowanceRest} from '../actions';
import IndustryAllowanceRestDetailsForm from './IndustryAllowanceRestDetailsForm';
import {MultiSectionSidebar} from '../../customizableGrid/components';

class IndustryAllowanceDetailsSidebar extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {currentTabIndex: 1};
    autoBind(this);
  }

  changeTab(tabIndex) {
    this.setState({currentTabIndex: this.state.currentTabIndex === tabIndex ? 0 : tabIndex});
  }

  render() {
    const {
      show,
      workingModel,
      model,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="allowances-list-edit-sidebar" closeable={false}>
        <div className="sidebar-scrollable">
          <MultiSectionSidebar show>
            <SidebarSection className="allowance" title="Allowance Details" collapsible={false} tabIndex={1}>
              <IndustryAllowanceDetailsForm
                model={workingModel} />
            </SidebarSection>
            {workingModel.get('allowanceRestName') && <SidebarSection
              className="allowanceRest"
              title="Rest Calculation" changeTab={this.changeTab} showTab={this.state.currentTabIndex} tabIndex={2}
              collapsible>
              <IndustryAllowanceRestDetailsForm
                model={model} />
            </SidebarSection>}
          </MultiSectionSidebar>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    workingModel: workingModelSelector(state),
    model: industryAllowanceRestModel(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadIndustryAllowanceRest,
  }
)(IndustryAllowanceDetailsSidebar));
