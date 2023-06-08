import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import SetUserPasswordForm from './SetUserPasswordForm';
import {cancelSetUserPassword, setSetUserPasswordModelProperty, setUserPassword} from '../actions';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/setUserPassword';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class SetUserPasswordModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.handleFieldChange(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {handleSave, model, router} = this.props;
    handleSave(model)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to set this user\'s password.', 'Error'));
  }

  render() {
    const {handleCancel, model, saving, show, validationErrors} = this.props;

    const form =
      <SetUserPasswordForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        loading={false}
        saving={saving}
        title="Set User Password"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

SetUserPasswordModal.propTypes = {
  handleCancel: PropTypes.func,
  handleFieldChange: PropTypes.func,
  handleSave: PropTypes.func,
  model: PropTypes.instanceOf(Map),
  saving: PropTypes.bool,
  show: PropTypes.bool,
  validationErrors: PropTypes.instanceOf(Map),
};

function mapStateToProps(state) {
  return {
    model: modelSelector(state),
    saving: savingSelector(state),
    show: showSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelSetUserPassword,
    handleFieldChange: setSetUserPasswordModelProperty,
    handleSave: setUserPassword,
  }
)(SetUserPasswordModal));
