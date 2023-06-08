import React from 'react';
import {PropTypes} from 'prop-types';

export default function SidebarSectionToggle({collapsed, onClick}) {
  return collapsed
    ? <i className="clickable fa fa-caret-right" onClick={onClick} />
    : <i className="clickable fa fa-caret-down" onClick={onClick} />;
}

SidebarSectionToggle.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
