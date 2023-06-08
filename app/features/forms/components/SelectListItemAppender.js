import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {Button, FormControl} from 'react-bootstrap';
import {List} from 'immutable';
import TagList from './TagList';

export default class SelectListItemAppender extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);

    this.state = ({currentSelection: -1});
  }

  handleFieldChanged(e) {
    this.setState({currentSelection: Number(e.target.value)});
  }

  handleApply() {
    const value = this.state.currentSelection;
    const {items, onAddSelectedItem} = this.props;

    if (value >= 0) {
      const label = items.find(x => x.value === value).label;
      onAddSelectedItem(value, label);
      this.setState({currentSelection: -1});
    }
  }

  render() {
    const {
      saving,
      editing,
      items,
      selectedItems,
      label,
      onRemoveSelectedItem,
    } = this.props;
    const {currentSelection} = this.state;

    return (
      <div className="select-list-item-appender">
        <label>{label}</label>
        <div className="list-selection">
          <FormControl componentClass="select" disabled={saving} value={currentSelection}
            onChange={this.handleFieldChanged}>
            <option key={-1} value={-1} />
            {items.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </FormControl>
          <Button onClick={this.handleApply} className="btn btn-primary" disabled={currentSelection === -1}>Apply</Button>
        </div>
        <TagList disabled={saving || !editing} items={selectedItems} onRemoveItem={onRemoveSelectedItem} />
      </div>
    );
  }
}

SelectListItemAppender.propTypes = {
  onAddSelectedItem: PropTypes.func.isRequired,
  onRemoveSelectedItem: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selectedItems: PropTypes.instanceOf(List).isRequired,
  editing: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
};
