import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {Modal, Button} from 'react-bootstrap';
import {closeVolumeDriverValuesImportValidationErrors} from '../actions';
import {
  showSelector,
  createdRecordCountSelector,
  updatedRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
} from '../selectors/modals/importValidationErrors';
import {PARSE, REQUIRED, NOT_FOUND, LENGTH, DUPLICATE, NON_NEGATIVE, DUPLICATE_HEADER} from '../constants/importErrorTypes';
import {toastr} from '../../shared/services';
import ModalHeader from '../../shared/components/ModalHeader';

class VolumeDriverValuesImportValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {createdRecordCount, updatedRecordCount, totalRecordCount} = this.props;

    this.props.closeVolumeDriverValuesImportValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Volume Driver Value${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const updatedMsg = `${updatedRecordCount} Volume Driver Value${(updatedRecordCount === 1) ? ' has' : 's have'} been updated.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
  }

  renderError(fieldName, error) {
    const recordCount = error.get('recordCount');
    const type = error.get('type');
    let value = error.get('value');

    const countLabel = (recordCount === 1) ? 'record' : 'records';

    let message;
    switch (type) {
      case PARSE:
        message = `Failed to parse ${fieldName}`;
        break;

      case REQUIRED:
        message = `Missing ${fieldName}`;
        break;

      case NOT_FOUND:
        message = `"${value}" not found`;
        break;

      case LENGTH:
        message = `${fieldName} over 256 characters`;
        break;

      case DUPLICATE:
        message = `"${value}" duplicated`;
        break;

      case NON_NEGATIVE:
        message = `${fieldName} less than 0`;
        break;

      case DUPLICATE_HEADER:
        return <div>{`- ${value}`}</div>;

      default:
        return null;
    }

    if (value) value = `-${value.replace(/\s+/g, '-')}`;

    return (
      <div key={`${fieldName}-${type}${value}`}>
        {message} in <strong>{recordCount}</strong> {countLabel}
      </div>
    );
  }

  renderValidationErrors(fieldName, validationErrors) {
    const errors = validationErrors.sortBy(e => e.get('type'));

    return (
      <div className="volume-driver-values-import-field" key={fieldName}>
        <h4>{fieldName.toUpperCase()}</h4>
        {errors.map(e => this.renderError(fieldName, e))}
      </div>
    );
  }

  render() {
    const {show, validationErrors} = this.props;

    return (
      <Modal className="volume-driver-values-import-errors-modal" show={show} backdrop="static" animation={false}>
        <Modal.Header>
          <ModalHeader onClick={this.handleConfirm} />
          <Modal.Title>Import Errors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {validationErrors.map(value => this.renderValidationErrors(value.getIn([0, 'fieldName']), value)).valueSeq()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleConfirm} autoFocus>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    createdRecordCount: createdRecordCountSelector(state),
    updatedRecordCount: updatedRecordCountSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    closeVolumeDriverValuesImportValidationErrors,
  }
)(VolumeDriverValuesImportValidationErrorsModal);
