import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {Modal, Button} from 'react-bootstrap';
import {
  REQUIRED,
  NOT_FOUND,
  DECIMAL_LENGTH,
  LENGTH,
  INVALID_FORMAT,
  INVALID_INACTIVE_DATE,
  INVALID_HEADER_VALUE,
  INVALID_CONTEXT,
  NON_NEGATIVE,
  DUPLICATE,
  PARSE,
  INTEGRATION_DISABLED,
  OVERLAPPED,
  ACCESS_DENIED,
  DUPLICATE_HEADER,
  DUPLICATE_SETTING_COLUMN_VALUE,
  INVALID_VALUE,
} from '../constants/fileImportErrorTypes';
import ModalHeader from './ModalHeader';

export default class ImportFileValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  renderError(fieldName, error) {
    const recordCount = error.get('recordCount');
    const type = error.get('type');
    let value = error.get('value');

    const countLabel = (recordCount === 1) ? 'record' : 'records';
    const invalidFormatValue = value === null ? '' : `"${value}"`;
    let message;
    const fieldLength = value ? value : 256;
    switch (type) {
      case REQUIRED:
        message = `Missing ${fieldName}`; break;

      case NOT_FOUND:
        message = `"${value}" not found`; break;

      case DECIMAL_LENGTH:
        message = `"${value}" Please enter less than 15 digits before decimal point`; break;

      case LENGTH:
        message = `${fieldName} over ${fieldLength} characters`; break;

      case INVALID_INACTIVE_DATE:
        message = 'Inactive date is less than active date';
        break;

      case INVALID_FORMAT:
        message = `Invalid value ${invalidFormatValue}`; break;

      case INVALID_HEADER_VALUE:
        message = `Invalid header value for ${fieldName}`; break;

      case INVALID_CONTEXT:
        message = `"${value}" invalid in this context`; break;

      case NON_NEGATIVE:
        message = 'Less than 0';
        break;

      case DUPLICATE:
        message = `Duplicate value "${value}" for unique field "${fieldName}"`;
        break;

      case PARSE:
        message = `Could not parse value "${value}"`;
        break;

      case INTEGRATION_DISABLED:
        message = `"${fieldName} is invalid because the Integration is disabled`;
        break;

      case OVERLAPPED:
        message = 'Labor Period windows overlap';
        break;

      case ACCESS_DENIED:
        message = `Access denied for ${value}`;
        break;

      case DUPLICATE_HEADER:
      case DUPLICATE_SETTING_COLUMN_VALUE:
      case INVALID_VALUE:
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
      <div className="file-import-field" key={fieldName}>
        <h4>{fieldName.toUpperCase()}</h4>
        {errors.map(e => this.renderError(fieldName, e))}
      </div>
    );
  }

  render() {
    const {show, validationErrors, onConfirm} = this.props;

    return (
      <Modal className="import-file-validation-errors-modal" show={show} backdrop="static" animation={false}>
        <Modal.Header>
          <ModalHeader onClick={onConfirm} />
          <Modal.Title>Import Errors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {validationErrors.map(value => this.renderValidationErrors(value.getIn([0, 'fieldName']), value)).valueSeq()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={onConfirm} autoFocus>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ImportFileValidationErrorsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  validationErrors: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
