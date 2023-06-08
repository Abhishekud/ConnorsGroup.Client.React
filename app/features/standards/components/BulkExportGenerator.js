import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Dropdown, MenuItem} from 'react-bootstrap';
import React, {Component} from 'react';
// import pdfMake from '../pdfMake';
import {
  generateBulkExport,
} from '../actions';
import {
  bulkExportBackroundJobActiveSelector,
  bulkExportBackroundJobExportRequestIdSelector,
  selectedStandardsSelector,
} from '../selectors/pages/list';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {handleApiError, toastr, makeClasses} from '../../shared/services';
import {METHOD, BACKUP, METHOD_TIME, STANDARD_REPORT_TYPES} from '../constants/standardReportTypes';

class BulkExportGenerator extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleBulkExportClick(type) {
    const ReportType = STANDARD_REPORT_TYPES.indexOf(type) + 1;
    const {router, generateBulkExport, timeFormat, selectedStandards} = this.props;
    const selectedIds = selectedStandards.map(obj => obj.get('id'));
    generateBulkExport(selectedIds, ReportType, timeFormat)
      .then(() => {
        toastr.success('This will take some time. The reports are being generated in the background. An email will be sent with a download link once completed.', 'Success');
      })
      .catch(error => {
        console.log(error);
        handleApiError(error, router, 'An error occurred while generating the PDF.');
      });
  }

  handleGenerateBackupReport() {
    this.handleBulkExportClick(BACKUP);
  }
  handleGenerateMethodReport() {
    this.handleBulkExportClick(METHOD);
  }
  handleGenerateMethodTimeReport() {
    this.handleBulkExportClick(METHOD_TIME);
  }
  render() {
    const {bulkExportBackroundJobActive} = this.props;
    const classes = makeClasses({
      'fa': true,
      'fa-file-pdf-o': !bulkExportBackroundJobActive,
      'fa-spinner fa-spin': bulkExportBackroundJobActive,
    });


    return (
      <div className="flyout-button">
        <Dropdown id="standardReports" bsStyle="default" key="standardReports" title="Reports" disabled={bulkExportBackroundJobActive} pullRight>
          <Dropdown.Toggle>
            <i className={classes} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem title={`Export ${BACKUP} Report`} eventKey={`${BACKUP} Report`} onSelect={this.handleGenerateBackupReport}>
              {`Export ${BACKUP} Report`}
            </MenuItem>
            <MenuItem title={`Export ${METHOD} Report`} eventKey={`${METHOD} Report`} onSelect={this.handleGenerateMethodReport}>
              {`Export ${METHOD} Report`}
            </MenuItem>
            <MenuItem title={`Export ${METHOD_TIME} Report`} eventKey={`${METHOD_TIME} Report`} onSelect={this.handleGenerateMethodTimeReport}>
              {`Export ${METHOD_TIME} Report`}
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    timeFormat: timeFormatSelector(state),
    selectedStandards: selectedStandardsSelector(state),
    bulkExportBackroundJobExportRequestId: bulkExportBackroundJobExportRequestIdSelector(state),
    bulkExportBackroundJobActive: bulkExportBackroundJobActiveSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    generateBulkExport,
  }
)(BulkExportGenerator));
