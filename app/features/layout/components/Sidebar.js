import React from 'react';
import {PropTypes} from 'prop-types';

export default function Sidebar({closeable, onClose, className, children}) {
  return (
    <div className={`sidebar ${className}`}>
      {closeable ? <i className="fa fa-close clickable close-sidebar" onClick={onClose} /> : null}
      {children}
    </div>
  );
}

Sidebar.propTypes = {
  closeable: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
};
