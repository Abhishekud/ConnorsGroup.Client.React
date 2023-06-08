import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {Button, Modal} from 'react-bootstrap';
import {toastr} from '../../shared/services';
import CancelButton from '../../shared/components/CancelButton';
import {
  cancelUpdateStandard,
  updateStandard,
  loadStandard,
  setStandardDetailModelProperty,
} from '../actions';
import {
  showSelector,
  processingSelector,
  standardIdSelector,
  performSaveSelector,
} from '../selectors/modals/productionComment';
import {
  modelSelector,
} from '../selectors/sidebars/standardDetails';
import {HiddenSubmitButton, TextArea, withAutoFocusOnEdit} from '../../forms/components';
import {withRouter} from 'react-router';

class ConfirmUpdateStandardModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleSave() {
    const {performSave, model} = this.props;

    if (model.get('revisionComment') === null || model.get('revisionComment') === '') {
      toastr.error('Revision Comment is required when going to production.');
      return;
    }

    performSave();
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setStandardDetailModelProperty(name, value);
  }

  render() {
    const {show, processing, handleCancel, model, primaryInputRef} = this.props;

    if (!show) return null;

    return (
      <Modal show={show} backdrop="static" animation={false}>
        <Modal.Header>
          <Modal.Title>Standard Revision Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSave}>
            <fieldset disabled={processing}>
              <TextArea
                id="revisionComment" label="Revision Comment" maxLength={1024} value={model.get('revisionComment')} rows={5}
                onChange={this.handleFieldChange}
                inputRef={primaryInputRef} />
              <HiddenSubmitButton />
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton onClick={handleCancel} disabled={processing} />
          <Button bsStyle="primary" disabled={processing} onClick={this.handleSave}>{processing ? 'Processing...' : 'Save'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    processing: processingSelector(state),
    model: modelSelector(state),
    standardId: standardIdSelector(state),
    performSave: performSaveSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelUpdateStandard,
    updateStandard,
    loadStandard,
    setStandardDetailModelProperty,
  }
)(withAutoFocusOnEdit()(ConfirmUpdateStandardModal)));
