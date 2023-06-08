import React from 'react';
import {DropDownListFilterCell} from '.';

const listItems = [
  {text: '', value: ''},
  {text: 'Active', value: 0},
  {text: 'Inactive', value: 1},
];

export default function CharacteristicActiveFilterCell(props) {
  return (<DropDownListFilterCell options={listItems} {...props} />);
}
