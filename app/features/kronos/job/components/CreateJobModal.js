import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Map, fromJS} from 'immutable';
import {CreateEditModal} from '../../../shared/components';
import {showSelector, modelSelector} from '../selectors/modals/createJob';
import {
  hideCreateModal,
  setPropertyForCreate,
  create,
  selectJob,
} from '../actions';
import {JobForm} from '.';

class CreateJobModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    this.props.hideCreateModal();
  }

  handleSave(event) {
    event.preventDefault();

    const {create, model, selectJob} = this.props;
    create(model)
      .then(response => selectJob(fromJS(response.action.payload.data)));
  }

  handleFieldChange(e) {
    const {id, value} = e.target;
    this.props.setPropertyForCreate(id, value);
  }

  render() {
    const {show, saving, model} = this.props;
    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={'New Job'}
        onCancel={this.handleCancel}
        onSave={this.handleSave} >
        <JobForm
          onFieldChange={this.handleFieldChange}
          formValidationErrors={new Map()}
          onSubmit={this.handleSave}
          model={model} />
      </CreateEditModal>
    );
  }
}

CreateJobModal.propTypes = {
  saving: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,

  setPropertyForCreate: PropTypes.func.isRequired,

  hideCreateModal: PropTypes.func.isRequired,
  selectJob: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: false,
  };
}

export default withRouter(connect(
  mapStateToProps, {
    hideCreateModal,
    setPropertyForCreate,
    create,
    selectJob,
  }
)(CreateJobModal));
