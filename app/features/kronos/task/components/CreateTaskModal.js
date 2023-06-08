import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {mapSelectedOptionsToValues} from '../../../forms/services';
import {CreateEditModal} from '../../../shared/components';
import {
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/createTask';
import {
  hideCreateModal,
  setPropertyForCreate,
  create,
} from '../actions';
import {TaskForm} from '.';
import {taskGroupsSelector} from '../selectors/pages/list';
import {handleApiError} from '../../../shared/services';
import wfdSelector from '../../shared/selectors/wfdSelector';

class CreateTaskModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    this.props.hideCreateModal();
  }

  handleSave(event) {
    event.preventDefault();

    const {create, model, router, reloadTasks} = this.props;
    create(model)
      .then(() => {
        reloadTasks();
      })
      .catch(
        error => {
          const {status} = error.response || {};
          if (status !== 404 && status !== 400) {
            handleApiError(error, router, 'An error occurred trying to create the Task.');
          }
        });
  }

  handleFieldChange(e) {
    const {tagName, multiple, id, value} = e.target;
    if (tagName === 'SELECT' && multiple) {
      this.handleMultiSelectFieldChange(e);
    } else {
      this.props.setPropertyForCreate(id, value);
    }
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
    const {show, saving, model, taskGroups, validationErrors, isWfd} = this.props;
    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={'New Task'}
        onCancel={this.handleCancel}
        onSave={this.handleSave} >
        <TaskForm
          onFieldChange={this.handleFieldChange}
          onCheckboxChange={this.handleCheckboxChange}
          formValidationErrors={validationErrors}
          onSubmit={this.handleSave}
          model={model} taskGroupsList={taskGroups}
          isWfd={isWfd} />
      </CreateEditModal>
    );
  }
}

CreateTaskModal.propTypes = {
  saving: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,

  setPropertyForCreate: PropTypes.func.isRequired,

  hideCreateModal: PropTypes.func.isRequired,
  taskGroups: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: false,
    taskGroups: taskGroupsSelector(state),
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
)(CreateTaskModal));
