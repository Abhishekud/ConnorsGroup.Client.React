import React from 'react';
import {PropTypes} from 'prop-types';

export default function SidebarHeaderActions({collapsed, children}) {
  return (
    <div className="sidebar-header-actions">
      {collapsed ? null : children}
    </div>
  );
}

SidebarHeaderActions.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
