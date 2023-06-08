import React from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import GeneratePdfButton from '../../../pdfGeneration/components/GeneratePdfButton';
import ReportComponent from '../../../shared/components/ReportComponent';
import moment from 'moment';
import {timeFormatSelector} from '../../../shared/selectors/components/timeFormatSelector';
import {
  loadStandardForReport,
  loadStandardRevisionForReport,
} from '../../actions';
import {
  idSelector,
  nameSelector,
  revisionSelector,
  isPreviousRevisionSelector,
} from '../../selectors/pages/standardProfile';
import {
  filingFieldsSelectListOptionsSelector,
} from '../../../selectListOptions/selectors';
import {
  clientNameSelector,
  departmentNameSelector,
} from '../../../shared/selectors/components/settings';
import {toastr} from '../../../shared/services';
import {generateReport} from '../../services/methodReport';
import {BETA_FEATURES_ACCESS} from '../../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../../authentication/selectors/currentUser';

class MethodReport extends ReportComponent {

  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  buildPdfDefinition(resolve) {
    const {id, loadStandardForReport, loadStandardRevisionForReport, revision, isPreviousRevision} = this.props;

    if (isPreviousRevision) {
      loadStandardRevisionForReport(id, isPreviousRevision ? revision : -1)
        .then(result => {
          const time = moment().format('MM/DD/YYYY hh:mm:ss A');
          resolve(this.generate(result.value.data, time));
        })
        .catch(() => {
          toastr.error('An error occurred while attempting to load the report data.');
          resolve();
        });
    } else {
      loadStandardForReport(id)
        .then(result => {
          const time = moment().format('MM/DD/YYYY hh:mm:ss A');
          resolve(this.generate(result.value.data, time));
        })
        .catch(() => {
          toastr.error('An error occurred while attempting to load the report data.');
          resolve();
        });
    }
  }

  generate(data) {
    return generateReport(data, this.props, this.styles, this.footer, this.header);
  }

  render() {
    const {id, standardName, reportType, asMenuItem, title} = this.props;
    return (
      <GeneratePdfButton
        title={title ?? `Export ${reportType} Report`}
        buildPdfDefinition={this.buildPdfDefinition}
        asMenuItem={asMenuItem}
        reportFileName={`${id} - ${standardName} - ${reportType} Report.pdf`} />
    );
  }
}

function mapStateToProps(state) {
  const hasBetaAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);

  return {
    id: idSelector(state),
    standardName: nameSelector(state),
    clientName: clientNameSelector(state),
    timeFormat: timeFormatSelector(state),
    filingFields: filingFieldsSelectListOptionsSelector(state),
    departmentName: departmentNameSelector(state),
    revision: revisionSelector(state),
    isPreviousRevision: isPreviousRevisionSelector(state),
    hasBetaAccess: hasBetaAccessSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    loadStandardForReport,
    loadStandardRevisionForReport,
  }
)(MethodReport);
