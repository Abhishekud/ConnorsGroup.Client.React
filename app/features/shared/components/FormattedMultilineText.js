import React from 'react';
import {PropTypes} from 'prop-types';

export default function FormattedMultilineText({text}) {
  return <span style={{whiteSpace: 'pre-wrap'}}>{text}</span>;
}

FormattedMultilineText.propTypes = {
  text: PropTypes.string,
};
