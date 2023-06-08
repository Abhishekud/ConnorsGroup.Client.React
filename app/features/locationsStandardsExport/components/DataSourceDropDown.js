import React from 'react';
import {PropTypes} from 'prop-types';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {DRAFT, PRODUCTION} from '../constants/DataSources';

const toLabel = dataSource => {
  switch (dataSource) {
    case DRAFT:
      return 'Draft';
    case PRODUCTION:
      return 'Prod';
    default:
      return 'Unknown data source selected';
  }
};

const DataSourceDropDown = ({disabled, onDataSourceChange, selectedDataSource}) => (
  <DropdownButton id="data-source-selector" className="btn-default" pullRight disabled={disabled}
    title={toLabel(selectedDataSource)}>
    <MenuItem eventKey={DRAFT} onSelect={onDataSourceChange}>
      Draft
    </MenuItem>
    <MenuItem eventKey={PRODUCTION} onSelect={onDataSourceChange}>
      Production
    </MenuItem>
  </DropdownButton>
);

DataSourceDropDown.propTypes = {
  disabled: PropTypes.bool.isRequired,
  selectedDataSource: PropTypes.string,

  onDataSourceChange: PropTypes.func.isRequired,
};

export default DataSourceDropDown;
