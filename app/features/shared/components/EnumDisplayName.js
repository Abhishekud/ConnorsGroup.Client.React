import React from 'react';
import {PropTypes} from 'prop-types';

export default function EnumDisplayName({enumClass, value}) {
  return <span>{enumClass.displayName(value)}</span>;
}

EnumDisplayName.propTypes = {
  enumClass: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
