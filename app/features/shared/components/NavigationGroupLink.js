import {Link} from 'react-router';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function NavigationGroupLink({text, to, visible, subgroup}) {
  if (!visible) return null;

  return (
    <li className={`link group-link ${subgroup ? 'subgroup' : null}`}>
      <Link to={to} activeClassName="active">{text}</Link>
    </li>
  );
}

NavigationGroupLink.propTypes = {
  text: PropTypes.string,
  to: PropTypes.string,
  visible: PropTypes.bool,
};
