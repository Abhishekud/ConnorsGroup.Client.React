import React from 'react';
import {PropTypes} from 'prop-types';
import {navigationGroups} from '../constants';

export default function NavigationGroup({expanded, icon, onClick, selectedNavigationGroup, name, alternateName, subgroup}) {
  const isSelectedNavigationGroup = selectedNavigationGroup === name;
  const trimmedName = name.includes(navigationGroups.LIST_MANAGEMENT) ? navigationGroups.LIST_MANAGEMENT : alternateName || name;

  return (
    <li className={`group ${subgroup ? 'subgroup' : null} ${expanded ? 'expanded' : 'collapsed'} ${isSelectedNavigationGroup ? 'selected' : ''}`}
      onClick={onClick(name, expanded)}>
      <a>
        <div className="content">
          {subgroup ? null : <i className={`fa fa-${icon} icon`} />}
          <span className="text">{trimmedName}</span>
          <i className={`fa fa-caret-${expanded ? 'down' : 'right'} expanded-indicator`} />
        </div>
      </a>
    </li>
  );
}

NavigationGroup.propTypes = {
  expanded: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  selectedNavigationGroup: PropTypes.string,
};
