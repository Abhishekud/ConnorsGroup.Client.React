import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {mapSelectedOptionsToValues} from '../../../forms/services';
import {CreateEditModal} from '../../../shared/components';
import {handleApiError} from '../../../shared/services';
import {
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/createTaskGroup';
import {
  hideCreateModal,
  setPropertyForCreate,
  create,
} from '../actions';
import {TaskGroupForm} from '.';
import wfdSelector from '../../shared/selectors/wfdSelector';

class CreateTaskGroupModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    this.props.hideCreateModal();
  }

  handleSave(event) {
    event.preventDefault();

    const {create, model, router, reloadList} = this.props;
    create(model)
      .then(() => {
        reloadList();
      })
      .catch(
        error => {
          const {status} = error.response || {};
          if (status !== 404 && status !== 400) {
            handleApiError(error, router, 'An error occurred trying to update the Task Group.');
          }
        });
  }

  handleFieldChange(e) {
    const {id, value} = e.target;
    this.props.setPropertyForCreate(id, value);
  }

  handleMultiSelectFieldChange(e) {
    const {id, options} = e.target;
    this.props.setPropertyForCreate(id, List(mapSelectedOptionsToValues(options)));
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setPropertyForCreate(id, checked);
  }

  render() {
    const {show, saving, model, jobs, validationErrors, isWfd} = this.props;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={'New TaskGroup'}
        onCancel={this.handleCancel}
        onSave={this.handleSave} >
        <TaskGroupForm
          onFieldChange={this.handleFieldChange}
          onCheckboxChange={this.handleCheckboxChange}
          formValidationErrors={validationErrors}
          onSubmit={this.handleSave}
          model={model}
          jobsList={jobs}
          isWfd={isWfd} />
      </CreateEditModal>
    );
  }
}

CreateTaskGroupModal.propTypes = {
  saving: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,

  setPropertyForCreate: PropTypes.func.isRequired,

  hideCreateModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: false,
    validationErrors: validationErrorsSelector(state),
    isWfd: wfdSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps, {
    hideCreateModal,
    setPropertyForCreate,
    create,
  }
)(CreateTaskGroupModal));
