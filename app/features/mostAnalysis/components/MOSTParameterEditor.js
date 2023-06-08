import autoBind from 'react-autobind';
import {Map} from 'immutable';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {NumericInput, Select} from '../../forms/components';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {getMOSTParameterIndexValues, calculateTabIndex} from '../services';

export default class MOSTParameterEditor extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);

    const {mostType, mostParameter, mostPhaseName} = props;
    this.state = {indexValues: getMOSTParameterIndexValues(mostType, mostPhaseName, mostParameter.get('name'))};
  }

  componentDidUpdate(prevProps) {
    const {mostType, mostParameter, mostPhaseName} = this.props;
    const {mostParameter: prevPropsMOSTParameter, mostPhaseName: prevPropsMOSTPhaseName} = prevProps;
    if (mostParameter.get('name') !== prevPropsMOSTParameter.get('name') || mostPhaseName !== prevPropsMOSTPhaseName) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({indexValues: getMOSTParameterIndexValues(mostType, mostPhaseName, mostParameter.get('name'))});
    }
  }

  handleFieldChanged(event) {
    const {mostParameter, onFieldChanged} = this.props;

    onFieldChanged(mostParameter.get('number'), event);
  }

  handleParameterClicked() {
    const {mostParameter, onParameterClicked} = this.props;
    onParameterClicked(mostParameter.get('number'), mostParameter.get('name'));
  }

  render() {
    const {
      mostStepNumber,
      mostPhaseNumber,
      mostParameter,
      disabled,
      validationErrors,
    } = this.props;

    const {indexValues} = this.state;

    return (
      <div className="most-parameter">
        <div className="index-values-row">
          <Tooltip anchorElement="target" position="top" openDelay={1}>
            <span title="Open the MOST data card" className="clickable" onClick={this.handleParameterClicked}>{mostParameter.get('name')}</span>
          </Tooltip>
          <Select formGroupClassName="index-value" componentClass="select" id="indexValue" disabled={disabled}
            value={mostParameter.get('indexValue')} onChange={this.handleFieldChanged}
            tabIndex={calculateTabIndex(mostStepNumber, ((mostPhaseNumber - 1) * 3) + (mostParameter.get('number') - 1) + 10)}>
            {indexValues.map(indexValue => <option key={indexValue} value={indexValue}>{indexValue}</option>)}
          </Select>
        </div>
        <label className="partial-frequency-label">
          {mostParameter.get('number') === 1 ? <div className="partial-frequency-label-text">Freq:</div> : null}
          <NumericInput formGroupClassName="partial-frequency" id="frequency"
            disabled={disabled || mostParameter.get('frequencyIsLocked')}
            min="0" value={mostParameter.get('frequency')} onChange={this.handleFieldChanged}
            formValidationErrors={validationErrors}
            tabIndex={calculateTabIndex(mostStepNumber, ((mostPhaseNumber - 1) * 3) + (mostParameter.get('number') - 1) + 26)} />
        </label>
        <div className="partial-simo-row">
          <label>
            <input type="checkbox" name="simultaneous" disabled={disabled}
              checked={mostParameter.get('simultaneous')} onChange={this.handleFieldChanged}
              tabIndex={calculateTabIndex(mostStepNumber, ((mostPhaseNumber - 1) * 3) + (mostParameter.get('number') - 1) + 42)} />
            <span>Partial SIMO</span>
          </label>
        </div>
      </div>
    );
  }
}

MOSTParameterEditor.propTypes = {
  mostType: PropTypes.string.isRequired,
  mostStepNumber: PropTypes.number.isRequired,
  mostPhaseName: PropTypes.string.isRequired,
  mostPhaseNumber: PropTypes.number.isRequired,
  mostParameter: PropTypes.instanceOf(Map).isRequired,
  disabled: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map),
  onFieldChanged: PropTypes.func.isRequired,
  onParameterClicked: PropTypes.func.isRequired,
};
