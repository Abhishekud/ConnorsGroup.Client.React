import autoBind from 'react-autobind';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';

export default class StandardRevisionsList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  getStandardAtIndex({index}) {
    return this.props.standards.get(index);
  }

  rowClassName({index}) {
    if (index < 0) return '';
    return index % 2 === 0 ? 'even' : 'odd';
  }

  noRowsRenderer() {
    return (
      <div className="no-rows"><h3>No revisions found</h3></div>
    );
  }

  dateRenderer({rowData}) {
    const date = rowData.get('createdDate');
    return moment(date).local().format('MM/DD/YYYY');
  }

  render() {
    const {standards, sort, onSort, onRowClick} = this.props;

    return (
      <AutoSizer>
        {({width, height}) => (
          <Table
            width={width}
            height={height}
            headerHeight={50}
            rowHeight={30}

            rowClassName={this.rowClassName}
            rowCount={standards.size}
            rowGetter={this.getStandardAtIndex}
            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}

            noRowsRenderer={this.noRowsRenderer}

            onRowClick={onRowClick}>

            <Column dataKey="revision" width={90} flexShrink={0} label="Revision" />
            <Column dataKey="name" width={90} flexGrow={1} label="Name" />
            <Column dataKey="createdDate" width={80} flexGrow={1} label="Created Date" headerClassName="column-header-center-align" className="column-center-align" cellRenderer={this.dateRenderer} />
            <Column dataKey="revisionComment" width={400} flexGrow={1} label="Comment" />
            <Column dataKey="lastEditedBy" width={80} flexGrow={1} label="Last Edited By" />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

StandardRevisionsList.propTypes = {
  sort: PropTypes.object.isRequired,
  standards: PropTypes.object.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};
