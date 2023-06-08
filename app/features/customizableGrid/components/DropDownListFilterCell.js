import React from 'react';
import autoBind from 'react-autobind';

import {DropDownList} from '@progress/kendo-react-dropdowns';
import {PropTypes} from 'prop-types';

export default class DropDownListFilterCell extends React.Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleFilterChange(event) {
    this.props.onChange({
      value: event.target.value.value,
      operator: event.target.value.value === '' ? '' : 'eq',
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
    if (this.props.value !== '') {
      return (
        <button className="k-button k-button-icon k-clear-button-visible" title="Clear" onClick={this.handleClear}>
          <span className="k-icon k-i-filter-clear" />
        </button>
      );
    }

    return null;
  }

  render() {
    const selected = this.props.options.find(x => x.value === this.props.value);
    return (
      <div className="k-filtercell">
        <DropDownList data={this.props.options} textField="text" value={selected} onChange={this.handleFilterChange} />
        {this.clearButton()}
      </div>
    );
  }
}

DropDownListFilterCell.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  })).isRequired,
};
