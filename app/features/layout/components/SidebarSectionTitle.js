import React from 'react';
import {PropTypes} from 'prop-types';

export default function SidebarSectionTitle({collapsible, onClick, children}) {
  const className = `sidebar-title ${collapsible ? 'clickable' : ''}`;

  return (
    <h4 className={className} onClick={onClick}>
      {children}
    </h4>
  );
}

SidebarSectionTitle.propTypes = {
  collapsible: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
