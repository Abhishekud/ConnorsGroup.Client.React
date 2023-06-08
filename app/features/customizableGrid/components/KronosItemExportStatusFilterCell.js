import React from 'react';
import {DropDownListFilterCell} from './';

const listItems = [
  {text: '', value: ''},
  {text: 'Success', value: 'Success'},
  {text: 'Failure', value: 'Failure'},
  {text: 'Not Sent', value: 'NotSent'},
];
export default function KronosItemExportStatusFilterCell(props) {
  return (<DropDownListFilterCell options={listItems} {...props} />);
}
