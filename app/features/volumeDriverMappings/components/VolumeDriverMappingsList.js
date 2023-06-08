import {fromJS} from 'immutable';
import numeral from 'numeral';
import autoBind from 'react-autobind';
import {
  AutoSizer,
} from 'react-virtualized';

import {CustomizableGrid} from '../../customizableGrid/components';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class VolumeDriverMappingsList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  rowClassName({index}) {
    if (index < 0) return '';

    const {volumeDriverMappings, selectedVolumeDriverMappingId} = this.props;
    if (volumeDriverMappings[index].get('id') === selectedVolumeDriverMappingId) return 'clickable selected';

    return index % 2 === 0 ? 'clickable even' : 'clickable odd';
  }

  noRowsRenderer() {
    return (
      <div className="no-rows"><h3>No Volume Driver Mappings found</h3></div>
    );
  }

  getVolumeDriverMappingAtIndex({index}) {
    return this.props.volumeDriverMappings[index];
  }

  getScrollToIndex() {
    const {volumeDriverMappings, selectedVolumeDriverMappingId} = this.props;

    return selectedVolumeDriverMappingId ? volumeDriverMappings.findIndex(x => x.get('id') === selectedVolumeDriverMappingId) : null;
  }

  handleSetCellClick(event) {
    event.stopPropagation();

    const {onValueClick} = this.props;
    const {id, setId} = event.target.dataset;

    onValueClick(Number(id), Number(setId));
  }

  setCellRenderer({dataKey, rowData}) {
    const value = rowData.get('values').find(cv => cv.get('volumeDriverMappingSetId') === dataKey);
    const formattedValue = value ? numeral(value.get('value')).format('0,0.000') : numeral(0).format('0,0.000');
    return (
      <div
        onClick={this.handleSetCellClick}
        data-id={rowData.get('id')}
        data-set-id={dataKey}>
        {formattedValue}
      </div>
    );
  }

  render() {
    const {volumeDriverMappings, sort, onSort, onRowClick, columns} = this.props;
    const conditionalProps = {};
    const scrollToIndex = this.getScrollToIndex();

    if (scrollToIndex) conditionalProps.scrollToIndex = scrollToIndex;

    return (
      <AutoSizer disableWidth>
        {({width, height}) => (
          <CustomizableGrid
            data={fromJS(volumeDriverMappings)}
            style={{width, height}}
            rowCount={volumeDriverMappings.size}
            rowGetter={this.getVolumeDriverMappingAtIndex}
            noRowsRenderer={this.noRowsRenderer}
            rowClassName={this.rowClassName}
            selectedField="selected"
            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}
            onRowClick={onRowClick}
            columns={columns} />
        )}
      </AutoSizer>
    );
  }
}

VolumeDriverMappingsList.propTypes = {
  volumeDriverMappings: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  selectedVolumeDriverMappingId: PropTypes.number,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onValueClick: PropTypes.func.isRequired,
  columns: PropTypes.func.isRequired,
};
