import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Dropdown, MenuItem, Button} from 'react-bootstrap';
import {
  standardsListSelector,
  selectedStandardIdsSelector,
  filterSelector,
} from '../selectors/pages/list';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {showCreateExportRequest} from '../../shared/actions';
import React, {Component} from 'react';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {STANDARDS_EXPORT} from '../../authentication/constants/permissions';
import {setIsExportBackgroundJob} from '../actions';

class ExportStandardsButton extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleShowCreateExportRequestSelectedIds() {
    const {showCreateExportRequest, selectedStandardIds, timeFormat, setIsExportBackgroundJob} = this.props;
    setIsExportBackgroundJob(false);
    showCreateExportRequest({}, timeFormat, selectedStandardIds);
  }

  handleShowCreateExportRequestFiltered() {
    const {showCreateExportRequest, timeFormat, activeFilters, setIsExportBackgroundJob} = this.props;
    setIsExportBackgroundJob(false);
    showCreateExportRequest(activeFilters, timeFormat);
  }

  handleShowCreateExportRequestDetail() {
    const {showCreateExportRequest, timeFormat, setIsExportBackgroundJob, disableExportDetails} = this.props;
    if (disableExportDetails) {
      return;
    }
    showCreateExportRequest({}, timeFormat);
    setIsExportBackgroundJob(true);
  }

  render() {
    const {
      selectedStandardIds,
      standards,
      canExport,
      disableExportDetails,
    } = this.props;

    if (!canExport) return null;

    if (standards.size === 0) {
      return <Button disabled className="header-button"><i className="fa fa-file-excel-o" /></Button>;
    }

    if (selectedStandardIds.size > 0) {
      return (
        <Dropdown id="export-standards" pullRight className="header-button">
          <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem eventKey="1" onClick={this.handleShowCreateExportRequestSelectedIds}>Export Selected</MenuItem>
            <MenuItem eventKey="2" onClick={this.handleShowCreateExportRequestFiltered}>Export All</MenuItem>
            <MenuItem eventKey="3" disabled={disableExportDetails} onClick={this.handleShowCreateExportRequestDetail}>Export Standards Detail (.xlsx)</MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return (
      <Dropdown id="export-standards" pullRight className="header-button">
        <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem eventKey="1" onClick={this.handleShowCreateExportRequestFiltered}>Export Standards List (.xlsx)</MenuItem>
          <MenuItem eventKey="2" disabled={disableExportDetails} onClick={this.handleShowCreateExportRequestDetail}>Export Standards Detail (.xlsx)</MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

function mapStateToProps(state) {
  const canExportSelector = makeCurrentUserHasPermissionSelector(STANDARDS_EXPORT);
  return {
    selectedStandardIds: selectedStandardIdsSelector(state),
    standards: standardsListSelector(state),
    timeFormat: timeFormatSelector(state),
    activeFilters: filterSelector(state),
    canExport: canExportSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    showCreateExportRequest,
    setIsExportBackgroundJob,
  }
)(ExportStandardsButton);
