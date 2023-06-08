import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Dropdown, MenuItem, Button} from 'react-bootstrap';
import {
  sortedElementsArraySelector,
  selectedElementIdsSelector,
} from '../selectors/pages/list';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {showCreateExportRequest} from '../../shared/actions';
import {
  appliedModelSelector as filterValuesSelector,
} from '../selectors/sidebars/filters';
import React, {Component} from 'react';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {ELEMENTS_EXPORT} from '../../authentication/constants/permissions';

class ExportElementsButton extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleShowCreateExportRequestSelectedIds() {
    const {showCreateExportRequest, selectedElementIds, timeFormat} = this.props;
    showCreateExportRequest({}, timeFormat, selectedElementIds);
  }

  handleShowCreateExportRequestFiltered() {
    const {showCreateExportRequest, appliedFilterValues, timeFormat} = this.props;
    showCreateExportRequest(appliedFilterValues, timeFormat);
  }

  render() {
    const {
      selectedElementIds,
      elements,
      canExport,
    } = this.props;

    if (elements.length === 0) {
      return <Button disabled className="header-button"><i className="fa fa-file-excel-o" /></Button>;
    }

    if (!canExport) return null;

    if (selectedElementIds.length > 0) {
      return (
        <Dropdown id="export-standards" pullRight className="header-button">
          <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem eventKey="1" onClick={this.handleShowCreateExportRequestSelectedIds}>Export Selected</MenuItem>
            <MenuItem eventKey="2" onClick={this.handleShowCreateExportRequestFiltered}>Export All</MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return <Button className="header-button" onClick={this.handleShowCreateExportRequestFiltered}><i className="fa fa-file-excel-o" /></Button>;
  }
}

function mapStateToProps(state) {
  const canExportSelector = makeCurrentUserHasPermissionSelector(ELEMENTS_EXPORT);
  return {
    selectedElementIds: selectedElementIdsSelector(state),
    elements: sortedElementsArraySelector(state),
    appliedFilterValues: filterValuesSelector(state),
    timeFormat: timeFormatSelector(state),
    canExport: canExportSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    showCreateExportRequest,
  }
)(ExportElementsButton);
