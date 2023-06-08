import React from 'react';
import {DropDownListFilterCell} from './';

const listItems = [
  {text: '', value: ''},
  {text: 'In Progress', value: 'InProgress'},
  {text: 'Success', value: 'Success'},
  {text: 'Failure', value: 'Failure'},
];

export default function ExportStatusFilterCell(props) {
  return (<DropDownListFilterCell options={listItems} {...props} />);
}
