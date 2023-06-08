import React from 'react';
import {DropDownListFilterCell} from './';

const listItems = [
  {text: '', value: ''},
  {text: 'Yes', value: true},
  {text: 'No', value: false},
];
export default function BoolYesNoFilterCell(props) {
  return (<DropDownListFilterCell options={listItems} {...props} />);
}
