import React from 'react';
import {PropTypes} from 'prop-types';

export default function SidebarSectionHeader({children}) {
  return (
    <div className="sidebar-header">
      {children}
    </div>
  );
}

SidebarSectionHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
