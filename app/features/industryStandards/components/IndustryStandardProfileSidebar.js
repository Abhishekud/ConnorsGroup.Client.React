import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
} from '../../layout/components';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {
  idSelector,
  modelSelector,
  openSelector,
  pristineModelSelector,
} from '../selectors/sidebars/industryStandardDetails';
import {
  industryStandardUnitsOfMeasureArraySelector,
} from '../selectors/sidebars/industryStandardUnitsOfMeasure';
import {industryStandardItemsSelector} from '../selectors/pages/industryStandardProfile';
import {
  departmentNameSelector,
  partFamilyNameSelector,
  enablePartsSelector,
} from '../../shared/selectors/components/settings';
import {
  makeSelectListOptionsArrayWithBlankSelector,
} from '../../selectListOptions/selectors';
import {
  JOB_CLASSES,
} from '../../selectListOptions/constants/selectListTypes';
import IndustryStandardDetailsForm from './IndustryStandardDetailsForm';
import IndustryStandardUnitsOfMeasure from './IndustryStandardUnitsOfMeasure';
import {withRouter} from 'react-router';
import {BETA_FEATURES_ACCESS} from '../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';

class IndustryStandardProfileSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }


  render() {
    const {
      open,
      model,

      jobClasses,
      validationErrors,
      departmentName,
      partsEnabled,
      partFamilyName,

      standardUnitsOfMeasure,
      timeFormat,
      hasBetaAccess,

    } = this.props;

    if (!open) return null;

    return (
      <Sidebar className="standard-profile">

        <div className="sidebar-scrollable">
          <SidebarSection
            className="standard-details"
            title="Details"
            collapsible>
            <IndustryStandardDetailsForm
              model={model} validationErrors={validationErrors}
              departmentName={departmentName}
              jobClasses={jobClasses}
              partsEnabled={partsEnabled}
              partFamilyName={partFamilyName} />
          </SidebarSection>
          <SidebarSection
            className="standard-units-of-measure"
            title="Units Of Measure"
            collapsible>
            <IndustryStandardUnitsOfMeasure
              standardUnitsOfMeasure={standardUnitsOfMeasure}
              timeFormat={timeFormat}
              hasBetaAccess={hasBetaAccess} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function makeMapStateToProps() {
  const selectListJobClassesSelector = makeSelectListOptionsArrayWithBlankSelector(JOB_CLASSES);
  const hasBetaAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);

  return state => ({
    open: openSelector(state),

    id: idSelector(state),
    model: modelSelector(state),
    pristineModel: pristineModelSelector(state),

    jobClasses: selectListJobClassesSelector(state),
    partsEnabled: enablePartsSelector(state),
    partFamilyName: partFamilyNameSelector(state),

    standardUnitsOfMeasure: industryStandardUnitsOfMeasureArraySelector(state),
    timeFormat: timeFormatSelector(state),
    departmentName: departmentNameSelector(state),
    standardItems: industryStandardItemsSelector(state),
    hasBetaAccess: hasBetaAccessSelector(state),

  });
}

export default withRouter(connect(
  makeMapStateToProps,
)(IndustryStandardProfileSidebar));
