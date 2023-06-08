import React from 'react';
import {PropTypes} from 'prop-types';

export default function PageTitle({title, children}) {
  return (
    <div className="page-title-container">
      <h3 className="page-title" title={title || (Array.isArray(children) ? children.join('').replace(', ,', ' ') : children)}>
        {children}
      </h3>
    </div>
  );
}

PageTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};
