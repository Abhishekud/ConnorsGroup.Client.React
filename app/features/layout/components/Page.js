import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';

class Page extends Component {
  render() {
    const {pageClassName, children} = this.props;

    return (
      <div className={`page ${pageClassName}`}>
        {children}
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  pageClassName: PropTypes.string,
};

export default withRouter(Page);
