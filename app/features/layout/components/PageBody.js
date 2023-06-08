import React from 'react';
import {PropTypes} from 'prop-types';

export default function PageBody({children}) {
  return (
    <div className="page-body">
      {children}
    </div>
  );
}

PageBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
