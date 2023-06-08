import React from 'react';
import autoBind from 'react-autobind';

import {NumericTextBox} from '@progress/kendo-react-inputs';

export default class NumericFilterCell extends React.Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleFilterChange(event) {
    this.props.onChange({
      value: event.target.value === null ? '' : event.target.value.toString(),
      operator: event.target.value === null ? '' : 'contains',
      syntheticEvent: event.syntheticEvent,
    });
  }

  handleClear(event) {
    event.preventDefault();
    this.props.onChange({
      value: '',
      operator: '',
      syntheticEvent: event,
    });
  }

  clearButton() {
    if (this.props.value) {
      return (
        <button className="k-button k-button-icon k-clear-button-visible k-filtercell-operator" title="Clear" onClick={this.handleClear}>
          <span className="k-icon k-i-filter-clear" />
        </button>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="k-filtercell">
        <NumericTextBox value={this.props.value} onChange={this.handleFilterChange} spinners={false} format={'#'} />
        {this.clearButton()}
      </div>
    );
  }
}
