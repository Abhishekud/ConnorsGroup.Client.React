import React from 'react';
import {PropTypes} from 'prop-types';

export default function PageHeader({children}) {
  return (
    <div className="page-header">
      {children}
    </div>
  );
}

PageHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
