import React from 'react';
import {PropTypes} from 'prop-types';
import TagItem from './TagItem';
import {List} from 'immutable';

export default function TagList({disabled, items, onRemoveItem}) {
  return (
    <div className="tag-list">
      {items.map(item => <TagItem key={item.get('id')} disabled={disabled} item={item} onRemoveItem={onRemoveItem} />)}
    </div>
  );
}

TagList.propTypes = {
  disabled: PropTypes.bool.isRequired,
  items: PropTypes.instanceOf(List).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};
