import React from 'react';
import {PropTypes} from 'prop-types';

export default function NavigationGroupExternalLink({text, to, visible, subgroup}) {
  if (!visible) return null;

  return (
    <li className={`link group-link ${subgroup ? 'subgroup' : null}`}>
      <a href={to} target="_blank">{text}</a>
    </li>
  );
}

NavigationGroupExternalLink.propTypes = {
  text: PropTypes.string,
  to: PropTypes.string,
  visible: PropTypes.bool,
  subgroup: PropTypes.bool,
};
