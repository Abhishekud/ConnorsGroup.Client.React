import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {MenuItem} from 'react-bootstrap';
import React, {Component} from 'react';
import {DRAFT, PRODUCTION} from '../../shared/constants/exportTypes';
import {setLocationStandardsDataSource, setIsExportSelectedVDVSetsBackgroundJob} from '../actions';

class ExportRequestButton extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleDataSourceChange(event) {
    const {setLocationStandardsDataSource, setIsExportSelectedVDVSetsBackgroundJob, onExportRequest} = this.props;
    setLocationStandardsDataSource(event);
    setIsExportSelectedVDVSetsBackgroundJob(false);
    onExportRequest();
  }

  handleExportSelectedVDVSets() {
    const {setIsExportSelectedVDVSetsBackgroundJob, onExportRequest} = this.props;
    setIsExportSelectedVDVSetsBackgroundJob(true);
    onExportRequest();
  }

  render() {
    const {
      disabled,
    } = this.props;
    return (
      <>
        <MenuItem eventKey={DRAFT} onSelect={this.handleDataSourceChange} disabled={disabled}>Export Draft Location Standards for Selected Volume Driver Value Sets </MenuItem>
        <MenuItem eventKey={PRODUCTION} onSelect={this.handleDataSourceChange} disabled={disabled}>Export Production Location Standards for Selected Volume Driver Value Sets </MenuItem>
        <MenuItem onSelect={this.handleExportSelectedVDVSets}>Export Volume Driver Values for Selected Volume Driver Value Sets </MenuItem>
      </>
    );
  }
}
function mapStateToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  {
    setLocationStandardsDataSource,
    setIsExportSelectedVDVSetsBackgroundJob,
  }
)(ExportRequestButton);
