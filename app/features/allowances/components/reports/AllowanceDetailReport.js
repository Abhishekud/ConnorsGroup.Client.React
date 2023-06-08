import React from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import GeneratePdfButton from '../../../pdfGeneration/components/GeneratePdfButton';
import ReportComponent from '../../../shared/components/ReportComponent';
import {
  allowanceTimesSelector,
  allowanceSelector,
} from '../../selectors/pages/builder';
import {
  clientNameSelector,
} from '../../../shared/selectors/components/settings';
import {makeCurrentUserHasPermissionSelector} from '../../../authentication/selectors/currentUser';
import {ALLOWANCES_EXPORT} from '../../../authentication/constants/permissions';
import {generate} from '../../services/allowanceDetailReport';

class AllowanceDetailReport extends ReportComponent {

  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  buildPdfDefinition(resolve) {
    resolve(generate(this.props, this.footer, this.header, this.styles));
  }

  render() {

    const {allowance, asMenuItem, canExport} = this.props;
    return (
      canExport && <GeneratePdfButton
        title="Allowance Detail Report"
        buildPdfDefinition={this.buildPdfDefinition}
        asMenuItem={asMenuItem}
        reportFileName={`Allowance Detail Report - ${allowance.name}.pdf`} />
    );
  }
}

function mapStateToProps(state) {
  const canExportSelector = makeCurrentUserHasPermissionSelector(ALLOWANCES_EXPORT);
  return {
    allowance: allowanceSelector(state),
    clientName: clientNameSelector(state),
    allowanceTimes: allowanceTimesSelector(state),
    canExport: canExportSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    generate,
  }
)(AllowanceDetailReport);
