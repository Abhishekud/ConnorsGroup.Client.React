import React from 'react';
import {PropTypes} from 'prop-types';
import NavigationGroup from './NavigationGroup';

export default function NavigationSubGroup({visible, ...props}) {
  return (
    visible
      ? <NavigationGroup subgroup {...props} />
      : null
  );
}

NavigationSubGroup.propTypes = {
  visible: PropTypes.bool,
};
