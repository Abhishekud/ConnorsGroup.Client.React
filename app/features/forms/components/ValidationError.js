import React from 'react';
import {PropTypes} from 'prop-types';

export default function ValidationError({error}) {
  return <li className="validation-error">{error}</li>;
}

ValidationError.propTypes = {
  error: PropTypes.string.isRequired,
};
