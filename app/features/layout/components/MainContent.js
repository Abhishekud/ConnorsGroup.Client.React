import LoadingOverlay from 'react-loading-overlay';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function MainContent({children, loading}) {
  return (
    <div className={`main-content ${loading ? 'loading' : ''}`}>
      {loading && <LoadingOverlay active={loading} text="Loading..." className="loading-overlay" />}
      {!loading && children}
    </div>
  );
}

MainContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    // eslint-disable-next-line no-undefined
    () => undefined, // we need this to suppress warning since children could be undefined
  ]),
  loading: PropTypes.bool,
};
