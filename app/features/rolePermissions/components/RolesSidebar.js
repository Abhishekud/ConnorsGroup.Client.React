import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
} from '../../layout/components';
import {loadRolesList} from '../actions';
import {
  showSelector,
  rolesSelector,
  sortedPristineRolesArraySelector,
} from '../selectors/sidebars/roles';
import RoleListEntryContainer from './RoleListEntryContainer';
import DeleteRoleModel from './DeleteRoleModal';
import {withRouter} from 'react-router';

class RolesSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      show,
      roles,
      pristineRoles,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar>
        <div className="sidebar-scrollable">
          <SidebarSection
            title="Roles"
            className="action-buttons-none"
            collapsible={false}>
            {pristineRoles.map(pa => (
              <RoleListEntryContainer
                key={pa.get('id')}
                pristineRole={pa}
                role={roles.get(pa.get('id'))} />
            ))}
            <DeleteRoleModel />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    roles: rolesSelector(state),
    pristineRoles: sortedPristineRolesArraySelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadRolesList,
  }
)(RolesSidebar));
