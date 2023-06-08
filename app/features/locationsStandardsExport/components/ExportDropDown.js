import React from 'react';
import {PropTypes} from 'prop-types';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {KRONOS_INTEGRATION_VERSION_ENUM_INDEX} from '../../kronos/constants/KronosVersions';
import {STANDARDS_AND_UOMS_BY_LOCATIONS, STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS} from '../constants/outputTypes';
import pluralize from 'pluralize';

function DisabledExportDropDown() {
  return (
    <Dropdown id="export" className="btn-default header-button" pullRight disabled>
      <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
      <Dropdown.Menu />
    </Dropdown>
  );
}

function AllOptionsDropDown({onExportRequest, onExportRequestByDate, kronosVersion, onExportTumbleweedRequest, canExportTumbleweed, locationName}) {
  return (
    <Dropdown id="export" className="btn-default header-button" pullRight>
      <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
      <Dropdown.Menu>
        <MenuItem eventKey="1" onClick={onExportRequest} type={STANDARDS_AND_UOMS_BY_LOCATIONS}>Export Standards and UOMs By {pluralize(locationName)}</MenuItem>
        <MenuItem eventKey="2" onClick={onExportRequest} type={STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS}>Export Standards and Volume Drivers By {pluralize(locationName)}</MenuItem>
        {canExportTumbleweed && kronosVersion === KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED && <MenuItem eventKey="3" onClick={onExportTumbleweedRequest}>Export To Tumbleweed</MenuItem>}
        <MenuItem eventKey="4" onClick={onExportRequestByDate}>Export By Snapshot</MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function NoSnapshotOptionsDropDown({onExportRequest, kronosVersion, onExportTumbleweedRequest, canExportTumbleweed, locationName}) {
  return (
    <Dropdown id="export" className="btn-default header-button" pullRight>
      <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
      <Dropdown.Menu>
        <MenuItem eventKey="1" onClick={onExportRequest} type={STANDARDS_AND_UOMS_BY_LOCATIONS}>Export Standards and UOMs By {pluralize(locationName)}</MenuItem>
        <MenuItem eventKey="2" onClick={onExportRequest} type={STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS}>Export Standards and Volume Drivers By {pluralize(locationName)}</MenuItem>
        {canExportTumbleweed && kronosVersion === KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED && <MenuItem eventKey="3" onClick={onExportTumbleweedRequest}>Export To Tumbleweed</MenuItem>}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function ExportDropDown({includeSnapshotExportOption, disabled, onExportRequest, onExportRequestByDate, kronosVersion, onExportTumbleweedRequest, canExportTumbleweed, locationName}) {
  if (disabled) return (<DisabledExportDropDown />);
  if (includeSnapshotExportOption) {
    return (
      <AllOptionsDropDown
        onExportRequest={onExportRequest}
        onExportRequestByDate={onExportRequestByDate}
        kronosVersion={kronosVersion}
        canExportTumbleweed={canExportTumbleweed}
        onExportTumbleweedRequest={onExportTumbleweedRequest}
        locationName={locationName} />
    );
  }
  return (
    <NoSnapshotOptionsDropDown
      onExportRequest={onExportRequest}
      kronosVersion={kronosVersion}
      onExportTumbleweedRequest={onExportTumbleweedRequest}
      canExportTumbleweed={canExportTumbleweed}
      locationName={locationName} />
  );
}

ExportDropDown.propTypes = {
  disabled: PropTypes.bool.isRequired,
  includeSnapshotExportOption: PropTypes.bool,

  onExportRequest: PropTypes.func.isRequired,
  onExportRequestByDate: PropTypes.func.isRequired,
  locationName: PropTypes.isRequired,
};

export default ExportDropDown;
