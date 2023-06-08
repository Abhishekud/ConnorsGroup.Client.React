import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {AllowanceTimeModel} from '../models';
import AllowanceTime from './AllowanceTime';
import AllowanceTimeEditor from './AllowanceTimeEditor';
import {
  showDeleteAllowanceTime,
  editAllowanceTime,
  updateAllowanceTime,
  cancelEditAllowanceTime,
  setAllowanceTimeModelProperty,
} from '../actions';
import {
  savingSelector,
  makeAllowanceTimeEditingSelector,
  makeAllowanceTimeValidationErrorsSelector,
} from '../selectors/pages/builder';
import {handleApiError, toastr} from '../../shared/services';

class AllowanceTimeContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEdit() {
    const {allowanceTime, editAllowanceTime} = this.props;

    editAllowanceTime(allowanceTime.id);
  }

  handleDelete() {
    const {allowanceTime, showDeleteAllowanceTime} = this.props;

    showDeleteAllowanceTime(allowanceTime);
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    const {setAllowanceTimeModelProperty, allowanceTime} = this.props;

    setAllowanceTimeModelProperty(allowanceTime.id, name, value);
  }

  handleSave() {
    const {updateAllowanceTime, allowanceTime, router} = this.props;
    updateAllowanceTime(allowanceTime)
      .catch(error => {
        const {status} = error.response || {};
        if (status === 400) {
          toastr.error(this.props.validationErrors.get('_').join('\n'));
          return;
        }

        handleApiError(error, router, 'An error occurred while attempting to update the Allowance Time.');
      });
  }

  handleCancel() {
    const {cancelEditAllowanceTime, allowanceTime} = this.props;
    cancelEditAllowanceTime(allowanceTime.id);
  }

  render() {
    const {allowanceTime, validationErrors, saving, editing, disabled} = this.props;

    if (editing) {
      return (
        <AllowanceTimeEditor
          allowanceTime={allowanceTime}
          disabled={saving}
          validationErrors={validationErrors}
          onFieldChange={this.handleFieldChange}
          onSave={this.handleSave}
          onCancel={this.handleCancel} />
      );
    }

    return (
      <AllowanceTime
        allowanceTime={allowanceTime}
        disabled={disabled}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete} />
    );
  }
}

AllowanceTimeContainer.propTypes = {
  allowanceTime: PropTypes.instanceOf(AllowanceTimeModel).isRequired,
};

function makeMapStateToProps() {
  const allowanceTimeEditingSelector = makeAllowanceTimeEditingSelector();
  const allowanceTimeValidationErrorsSelector = makeAllowanceTimeValidationErrorsSelector();

  return (state, ownProps) => ({
    saving: savingSelector(state),
    editing: allowanceTimeEditingSelector(state, ownProps),
    validationErrors: allowanceTimeValidationErrorsSelector(state, ownProps),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    showDeleteAllowanceTime,
    editAllowanceTime,
    updateAllowanceTime,
    cancelEditAllowanceTime,
    setAllowanceTimeModelProperty,
  }
)(AllowanceTimeContainer));
