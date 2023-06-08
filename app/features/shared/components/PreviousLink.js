import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {PropTypes} from 'prop-types';

class PreviousLink extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleClick() {
    const {router, location, path} = this.props;
    if (location.query.return) {
      router.push(location.query.return);
    } else if (path) {
      router.push(path);
    } else {
      router.goBack();
    }
  }

  render() {
    return (
      <a name="previous-link" title="Previous" onClick={this.handleClick}>
        <i className="fa fa-caret-left" /> Previous
      </a>
    );
  }
}

PreviousLink.propTypes = {
  router: PropTypes.object.isRequired,
  path: PropTypes.string,
};

export default withRouter(PreviousLink);
