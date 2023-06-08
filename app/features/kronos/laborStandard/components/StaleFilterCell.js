import React from 'react';
import {DropDownListFilterCell} from '../../../customizableGrid/components';

const listItems = [
  {text: '', value: ''},
  {text: 'Stale', value: true},
  {text: 'Current', value: false},
];

export default function ActiveFilterCell(props) {
  return (<DropDownListFilterCell options={listItems} {...props} />);
}
