import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {Modal, Button} from 'react-bootstrap';
import CancelButton from '../../shared/components/CancelButton';
import {Select} from '../../forms/components';
import ApplicationRuleItem from './ApplicationRuleItem';
import {
  setMOSTStepPhaseParameterModelProperty,
  hideMOSTStepApplicationRulesPopup,
  loadApplicationRules,
} from '../actions';
import {
  modelSelector,
  applicationRulesSelector,
  showSelector as showApplicationRulesSelector,
} from '../selectors/modals/applicationRule';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class ApplicationRulesSelectionModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
    this.state = {selections: [0]};
  }

  componentDidUpdate(nextProps) {
    const {router, showApplicationRules, loadApplicationRules, model} = this.props;
    const {showApplicationRules: nextShowApplicationRules} = nextProps;

    if (!nextShowApplicationRules && showApplicationRules) {
      loadApplicationRules(model.get('mostType'))
        .then(() => this.handleResetSelections())
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Application Rules.'));
    }
  }

  handleItemClick(value) {
    return () => {
      const {setModelProperty, model, hideApplicationRulesPopup} = this.props;
      setModelProperty(model.get('mostStepId'), model.get('mostPhaseNumber'), model.get('mostParameterNumber'), 'indexValue', value);
      hideApplicationRulesPopup();
    };
  }

  renderTitle() {
    const {model} = this.props;
    const parameter = model.get('mostParameterName');
    let description = '';
    if (model.get('toolUse')) {
      switch (parameter) {
        case 'C': description = 'Cut'; break;
        case 'S': description = 'Surface Treat'; break;
        case 'M': description = 'Measure'; break;
        case 'R': description = 'Record'; break;
        case 'T': description = 'Think'; break;
        case 'F': description = 'Fasten'; break;
        case 'L': description = 'Loosen'; break;
        case 'P': description = 'Tool Placement'; break;
        case 'A': description = 'Action Distance'; break;
        case 'B': description = 'Body Motion'; break;
        case 'G': description = 'Gain Control'; break;
        case 'W': description = 'Keyboard'; break;
        case 'K': description = 'Keypad'; break;
        case 'H': description = 'Handling'; break;
      }
    } else {
      switch (parameter) {
        case 'A': description = 'Action Distance'; break;
        case 'B': description = 'Body Motion'; break;
        case 'G': description = 'Gain Control'; break;
        case 'P': description = 'Placement'; break;
        case 'M': description = 'Move Controlled'; break;
        case 'X': description = 'Process Time'; break;
        case 'I': description = 'Alignment'; break;
      }
    }
    return (<div className="application-rule-title">{parameter} - {description}</div>);
  }

  clearNextItems(currentSelections, currentIndex) {
    let index = 0;
    const selections = [];
    while (index <= currentIndex) {
      selections[index] = currentSelections[index];
      index++;
    }
    return selections;
  }

  handleResetSelections() {
    this.setState({selections: [0]});
  }

  handleParentSelected(event) {
    const selections = this.state.selections;
    const index = event.target.dataset.index;
    selections[index] = Number(event.target.value);
    this.setState({selections: this.clearNextItems(selections, index)});
  }

  itemsForParent(parentId) {
    const {model, rules} = this.props;
    const paramName = model.get('mostParameterName');
    const toolUse = model.get('toolUse');
    return rules.filter(x => ((paramName === 'A' && x.get('parameter') === 'A') ||
      (paramName === 'P' && toolUse === x.get('toolAction')) ||
      paramName !== 'P' && model.get('isToolAction') === x.get('toolAction')) &&
      x.get('parentId') === parentId &&
      x.get('indexValue') === null);
  }

  renderParentDropdown(parentId, index) {
    const itemsForParent = this.itemsForParent(parentId);
    if (itemsForParent.size === 0) return null;
    return (
      <Select
        id={`parent${index}`} label=""
        key={`parent${index}`}
        data-index={index}
        value={this.state.selections[index]} onChange={this.handleParentSelected}>
        <option key={0} value={null} />
        {itemsForParent.map(x => <option key={x.get('id')} value={x.get('id')}>{x.get('description')}</option>)}
      </Select>
    );
  }

  renderItemsAtParentLevel(parentId) {
    const {model} = this.props;
    const paramName = model.get('mostParameterName');
    const toolUse = model.get('toolUse');
    const rules = this.props.rules
      .filter(x => ((paramName === 'A' && x.get('parameter') === 'A') ||
        (paramName === 'P' && toolUse === x.get('toolAction')) ||
        paramName !== 'P' && model.get('isToolAction') === x.get('toolAction')) &&
        (x.get('parentId') === parentId || (parentId === 0 && x.get('parentId') === null)) &&
        x.get('indexValue') !== null)
      .sortBy(x => x.get('indexValue'));
    return (
      rules.map(rule =>
        (<ApplicationRuleItem
          key={rule.get('id')}
          onClick={this.handleItemClick}
          indexValue={rule.get('indexValue')}
          description={rule.get('description')} />)
      )
    );
  }

  render() {
    const {showApplicationRules, handleCancel} = this.props;

    if (!showApplicationRules) return null;

    const selections = this.state.selections;
    const topLevelItemsForParent = this.itemsForParent(null);

    return (
      <Modal show backdrop="static" animation={false}>
        <Modal.Header>
          <Modal.Title>{this.renderTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderParentDropdown(null, 0)}
          {selections.map((x, index) => this.renderParentDropdown(x, index + 1))}
          {this.renderItemsAtParentLevel(selections[this.state.selections.length - 1])}
        </Modal.Body>
        <Modal.Footer>
          {topLevelItemsForParent.size > 0 ? <Button onClick={this.handleResetSelections}>Reset</Button> : null}
          <CancelButton onClick={handleCancel} />
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    model: modelSelector(state),
    rules: applicationRulesSelector(state),
    showApplicationRules: showApplicationRulesSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setModelProperty: setMOSTStepPhaseParameterModelProperty,
    hideApplicationRulesPopup: hideMOSTStepApplicationRulesPopup,
    handleCancel: hideMOSTStepApplicationRulesPopup,
    loadApplicationRules,
  }
)(ApplicationRulesSelectionModal));
