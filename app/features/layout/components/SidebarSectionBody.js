import React from 'react';
import {PropTypes} from 'prop-types';

export default function SidebarSectionBody({collapsed, children}) {
  return (
    <div className="sidebar-body">
      {collapsed ? null : children}
    </div>
  );
}

SidebarSectionBody.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};
