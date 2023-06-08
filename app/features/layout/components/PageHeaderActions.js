import React from 'react';
import {PropTypes} from 'prop-types';

export default function PageHeaderActions({children}) {
  return (
    <div className="page-header-actions">
      {children || <span>&nbsp;</span>}
    </div>
  );
}

PageHeaderActions.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    // eslint-disable-next-line no-undefined
    () => undefined, // we need this to suppress warning since children could be undefined
  ]),
};
