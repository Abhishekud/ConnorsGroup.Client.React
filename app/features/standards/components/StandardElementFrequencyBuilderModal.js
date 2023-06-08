import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {handleApiError} from '../../shared/services';
import {CancelButton} from '../../shared/components';
import {SaveButton, TextInput, TextArea, Select} from '../../forms/components';
import {
  showSelector,
  filteredCharacteristicsSelector,
  frequencyFormulaSelector,
  filterSelector,
  standardItemIdSelector,
  modeSelector,
} from '../selectors/modals/frequencyFormula';
import {
  loadCharacteristicsForDepartment,
  hideEditFrequencyFormula,
  setFrequencyFormulaModalValue,
  setStandardItemModelProperty,
  setStandardProfileBulkEditModelProperty,
  setCreateStandardElementModelProperty,
  toggleStandardElementItemFrequencyFormula,
} from '../actions';
import {
  modelSelector,
} from '../selectors/sidebars/standardDetails';
import {frequencyFormulaEditModes} from '../constants';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {showCreateCharacteristic, loadCharacteristicSetsList, setCreateCharacteristicModelProperty} from '../../characteristics/actions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {CHARACTERISTICS_EDIT} from '../../authentication/constants/permissions';

class StandardElementFrequencyBuilderModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      const {model, router, loadCharacteristicsForDepartment} = this.props;
      const departmentId = model.get('departmentId');
      loadCharacteristicsForDepartment(departmentId)
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the characteristic names.'));
    }
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setFrequencyFormulaModalValue(name, value);
  }

  handleClearFormula() {
    this.props.setFrequencyFormulaModalValue('frequencyFormula', '');
  }

  handleClearFilter() {
    this.props.setFrequencyFormulaModalValue('filter', '');
  }

  handleCancel() {
    this.props.hideEditFrequencyFormula();
  }

  handleCharacteristicSelected(event) {
    const {frequencyFormula, setFrequencyFormulaModalValue} = this.props;
    setFrequencyFormulaModalValue('frequencyFormula', `${frequencyFormula} ${event.target.value}`);
  }

  handleSaveFrequency() {
    const {
      standardItemId, frequencyFormula, hideEditFrequencyFormula,
      setStandardItemModelProperty, mode,
      setStandardProfileBulkEditModelProperty,
      setCreateStandardElementModelProperty,
    } = this.props;

    hideEditFrequencyFormula();

    switch (mode) {
      case frequencyFormulaEditModes.EDIT_STANDARD_ELEMENT_FREQUENCY:
        setStandardItemModelProperty(standardItemId, 'frequencyFormula', frequencyFormula);
        break;

      case frequencyFormulaEditModes.EDIT_STANDARD_BULK_EDIT_FREQUENCY:
        setStandardProfileBulkEditModelProperty('frequencyFormula', frequencyFormula);
        break;

      default:
        setCreateStandardElementModelProperty('frequencyFormula', frequencyFormula);
        break;
    }
  }
  handleShowCreateCharacteristicModal() {
    const {showCreateCharacteristic, toggleStandardElementItemFrequencyFormula, loadCharacteristicSetsList, model, setCreateCharacteristicModelProperty, filter} = this.props;
    const departmentId = model.get('departmentId');
    toggleStandardElementItemFrequencyFormula();
    showCreateCharacteristic();
    setCreateCharacteristicModelProperty('name', filter);
    loadCharacteristicSetsList(departmentId);
  }
  render() {
    const {
      // saving,
      frequencyFormula,
      filter,
      show,
      characteristics,
      canEditCharacteristic,
    } = this.props;

    return (
      <Modal show={show} backdrop="static" animation={false}>
        <Modal.Header>
          <Modal.Title>Frequency Builder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextArea
            id="frequencyFormula" label="Frequency Formula" value={frequencyFormula} maxLength={2048}
            onChange={this.handleFieldChange} autoFocus />
          <TextInput id="filter" maxLength={250} label="Filter Characteristics" value={filter} onChange={this.handleFieldChange} />
          { filter !== '' && characteristics.size === 0 && canEditCharacteristic && <div className="text-danger">
            This characteristic is not available.
          </div>}
          <span className="pull-right btn btn-sm btn-secondary" role="button" onClick={this.handleShowCreateCharacteristicModal}><i className="fa fa-plus"> </i> Add New</span>
          <Select id="characteristics" label="Characteristics" multiple
            className="characteristics-select-list" value={[]}
            onChange={this.handleCharacteristicSelected}>
            {characteristics.valueSeq().map(item => (<option key={item.get('id')} value={item.get('name')}>{item.get('name')}</option>))}
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClearFilter} className="pull-left">Clear Filter</Button>
          <Button onClick={this.handleClearFormula} className="pull-left">Clear Formula</Button>
          <CancelButton onClick={this.handleCancel} />
          <SaveButton onClick={this.handleSaveFrequency} />
        </Modal.Footer>
      </Modal>
    );
  }
}

function makeMapStateToProps(state) {
  const canEditCharacteristicSelector = makeCurrentUserHasPermissionSelector(CHARACTERISTICS_EDIT);
  return {
    show: showSelector(state),
    model: modelSelector(state),
    frequencyFormula: frequencyFormulaSelector(state),
    filter: filterSelector(state),
    characteristics: filteredCharacteristicsSelector(state),
    standardItemId: standardItemIdSelector(state),
    mode: modeSelector(state),
    canEditCharacteristic: canEditCharacteristicSelector(state),
  };
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    loadCharacteristicsForDepartment,
    hideEditFrequencyFormula,
    setFrequencyFormulaModalValue,
    setStandardItemModelProperty,
    setStandardProfileBulkEditModelProperty,
    setCreateStandardElementModelProperty,
    showCreateCharacteristic,
    toggleStandardElementItemFrequencyFormula,
    loadCharacteristicSetsList,
    setCreateCharacteristicModelProperty,
  }
)(StandardElementFrequencyBuilderModal));
