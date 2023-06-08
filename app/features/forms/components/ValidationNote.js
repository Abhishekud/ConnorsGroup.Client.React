import {Alert} from 'react-bootstrap';
import autoBind from 'react-autobind';
import {List, Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {flattenValidationErrors} from '../services';

export default class ValidationNote extends Component {
  constructor(props) {
    super(props);

    autoBind(this);

    this.state = {closed: false};
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({closed: false});
    }
  }

  handleClose() {
    this.setState({closed: true});
  }

  render() {
    const {dismissable} = this.props;
    let {errors} = this.props;

    if (this.state.closed || !errors.size) return null;

    if (Map.isMap(errors)) errors = flattenValidationErrors(errors);

    return (
      <Alert className="validation-summary" bsStyle="danger"
        onDismiss={dismissable === false ? null : this.handleClose}>
        <span>{errors.first()}</span>
      </Alert>
    );
  }
}

ValidationNote.propTypes = {
  dismissable: PropTypes.bool,
  errors: PropTypes.oneOfType([
    PropTypes.instanceOf(List),
    PropTypes.instanceOf(Map),
  ]).isRequired,
};
