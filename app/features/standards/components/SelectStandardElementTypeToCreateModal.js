import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CancelButton} from '../../shared/components';
import {HiddenSubmitButton, Select} from '../../forms/components';
import {Button, Modal} from 'react-bootstrap';
import React, {Component} from 'react';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {
  elementTypes,
} from '../../elements/constants';
import {
  cancelSelectStandardElementTypeToCreate,
  setSelectStandardElementTypeToCreateModelProperty,
  showCreateStandardElement,
} from '../actions';
import {
  showSelector,
  modelSelector,
} from '../selectors/modals/selectStandardElementTypeToCreate';

const ELEMENT_TYPE_OPTIONS = elementTypes.ALL.map(et => ({value: et, label: et})).toArray();

class SelectStandardElementTypeToCreateModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setSelectStandardElementTypeToCreateModelProperty(name, value);
  }

  handleOK(event) {
    event.preventDefault();

    const {model, showCreateStandardElement, standardTimeFormat} = this.props;

    showCreateStandardElement(
      model.get('standardElementType'),
      model.get('insertAtIndex'),
      model.get('elementGroupId'),
      standardTimeFormat,
    );
  }

  render() {
    const {
      show,
      model,
      handleCancel,
    } = this.props;

    return (
      <Modal show={show} backdrop="static" animation={false}>
        <Modal.Header>
          <Modal.Title>Select Standard Element Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleOK}>
            <fieldset>
              <Select
                id="standardElementType" autoFocus
                options={ELEMENT_TYPE_OPTIONS} value={model.get('standardElementType')}
                onChange={this.handleFieldChange} />
              <HiddenSubmitButton />
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton onClick={handleCancel} />
          <Button bsStyle="primary" onClick={this.handleOK}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
    standardTimeFormat: timeFormatSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    setSelectStandardElementTypeToCreateModelProperty,
    handleCancel: cancelSelectStandardElementTypeToCreate,
    showCreateStandardElement,
  },
)(SelectStandardElementTypeToCreateModal);
