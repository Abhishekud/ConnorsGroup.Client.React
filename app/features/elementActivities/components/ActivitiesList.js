import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';
import {layout} from '../../shared/constants';

export default class ActivitiesList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  rowClassName({index}) {
    if (index < 0) return '';

    const {activities, selectedActivityId} = this.props;
    if (activities[index].get('id') === selectedActivityId) return 'clickable selected';

    return index % 2 === 0 ? 'clickable even' : 'clickable odd';
  }

  noRowsRenderer() {
    return <div className="no-rows"><h3>No Activities found</h3></div>;
  }

  getActivityAtIndex({index}) {
    return this.props.activities[index];
  }

  getScrollToIndex() {
    const {activities, selectedActivityId} = this.props;

    return selectedActivityId ? activities.findIndex(u => u.get('id') === selectedActivityId) : null;
  }

  render() {
    const {activities, sort, onSort, onRowClick, sidebarShown} = this.props;
    const conditionalProps = {};
    const scrollToIndex = this.getScrollToIndex();

    if (scrollToIndex) conditionalProps.scrollToIndex = scrollToIndex;

    return (
      <AutoSizer>
        {({width, height}) => (
          <Table
            width={width + (sidebarShown ? layout.SIDEBAR_WIDTH : 0)}
            height={height - 50}
            headerHeight={50}
            rowHeight={30}

            rowCount={activities.length}
            rowGetter={this.getActivityAtIndex}
            rowClassName={this.rowClassName}

            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}

            noRowsRenderer={this.noRowsRenderer}

            onRowClick={onRowClick}

            {...conditionalProps}>

            <Column dataKey="name" width={500} flexGrow={1} label="Name" />
            <Column dataKey="elementsCount" width={100} flexGrow={1} headerClassName="column-header-elements-count" className="elements-count" label="# of Elements" />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

ActivitiesList.propTypes = {
  activities: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  selectedActivityId: PropTypes.number,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  sidebarShown: PropTypes.bool.isRequired,
};
