import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';
import {makeClasses} from '../../shared/services';
import {layout} from '../../shared/constants';

export default class PartFieldsList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  rowClassName({index}) {
    if (index < 0) return '';

    const {partFields, selectedPartFieldId} = this.props;
    if (partFields[index].get('id') === selectedPartFieldId) return 'clickable selected';

    return index % 2 === 0 ? 'clickable even' : 'clickable odd';
  }

  noRowsRenderer() {
    const {partName} = this.props;
    return <div className="no-rows"><h3>{`No ${partName} Fields found`}</h3></div>;
  }

  getPartFieldAtIndex({index}) {
    return this.props.partFields[index];
  }

  getScrollToIndex() {
    const {partFields, selectedPartFieldId} = this.props;

    return selectedPartFieldId ? partFields.findIndex(u => u.get('id') === selectedPartFieldId) : null;
  }

  renderRequiredCell({dataKey, rowData}) {
    const checked = rowData.get(dataKey);
    const classes = makeClasses({'fa': true, 'fa-check': checked});
    return (
      <i className={classes} />
    );
  }


  render() {
    const {partFields, sort, onSort, onRowClick, sidebarShown} = this.props;
    const conditionalProps = {};
    const scrollToIndex = this.getScrollToIndex();

    if (scrollToIndex) conditionalProps.scrollToIndex = scrollToIndex;

    return (
      <AutoSizer>
        {({width, height}) => (
          <Table
            width={width + (sidebarShown ? layout.SIDEBAR_WIDTH : 0)}
            height={height}
            headerHeight={50}
            rowHeight={30}

            rowCount={partFields.length}
            rowGetter={this.getPartFieldAtIndex}
            rowClassName={this.rowClassName}

            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}

            noRowsRenderer={this.noRowsRenderer}

            onRowClick={onRowClick}

            {...conditionalProps}>

            <Column dataKey="name" width={500} flexGrow={1} label="Name" />
            <Column dataKey="required" width={200} flexGrow={1} label="Required" headerClassName="column-header-center-align" className="column-center-align" cellRenderer={this.renderRequiredCell} />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

PartFieldsList.propTypes = {
  partFields: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  selectedPartFieldId: PropTypes.number,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  sidebarShown: PropTypes.bool.isRequired,
  partName: PropTypes.string.isRequired,
};
