import autoBind from 'react-autobind';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {FormattedDate} from '../../shared/components';
import {layout} from '../../shared/constants';

export default class UsersList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  rowClassName({index}) {
    if (index < 0) return '';

    const {users, selectedUserId} = this.props;
    if (users[index].get('id') === selectedUserId) return 'clickable selected';

    return index % 2 === 0 ? 'clickable even' : 'clickable odd';
  }

  noRowsRenderer() {
    return <div className="no-rows"><h3>No users found</h3></div>;
  }

  getUserAtIndex({index}) {
    return this.props.users[index];
  }

  getScrollToIndex() {
    const {users, selectedUserId} = this.props;

    return selectedUserId ? users.findIndex(u => u.get('id') === selectedUserId) : null;
  }

  renderRolesCell({cellData}) {
    return cellData ? cellData.toArray().join(', ') : '';
  }

  renderLastLoginDateCell({cellData}) {
    return cellData ? <FormattedDate date={cellData} /> : null;
  }

  renderFromMasterCell({cellData}) {
    return cellData ? 'Y' : 'N';
  }

  render() {
    const {users, sort, onSort, onRowClick, sidebarShown} = this.props;
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

            rowClassName={this.rowClassName}
            rowCount={users.length}
            rowGetter={this.getUserAtIndex}

            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}

            noRowsRenderer={this.noRowsRenderer}

            onRowClick={onRowClick}

            {...conditionalProps}>

            <Column dataKey="email" width={100} flexGrow={1} label="Email" />
            <Column dataKey="roles" width={100} flexGrow={1} label="Roles" cellRenderer={this.renderRolesCell} />
            <Column dataKey="status" width={90} label="Status" />
            <Column dataKey="lastLoginDate" width={180} label="Last Login Date" cellRenderer={this.renderLastLoginDateCell} />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  selectedUserId: PropTypes.number,
  onRowClick: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sidebarShown: PropTypes.bool.isRequired,
};
