import autoBind from 'react-autobind';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class TagItem extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleRemoveItem() {
    const {item, onRemoveItem} = this.props;
    onRemoveItem(item.get('id'));
  }

  render() {
    const {item, disabled} = this.props;

    return (
      <div className="tag-item">
        <span>{item.get('name')}</span>
        {disabled ? null : <i className="fa fa-close clickable" onClick={this.handleRemoveItem} />}
      </div>
    );
  }
}

TagItem.propTypes = {
  disabled: PropTypes.bool.isRequired,
  item: PropTypes.instanceOf(Map).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};
