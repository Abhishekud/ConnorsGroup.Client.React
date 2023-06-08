import React from 'react';
import {DropDownListFilterCell} from '.';

const listItems = [
  {text: '', value: ''},
  {text: '01 - 10', value: '01 - 10'},
  {text: '11 - 20', value: '11 - 20'},
  {text: '21 - 30', value: '21 - 30'},
  {text: '31 - 40', value: '31 - 40'},
  {text: '41 - 50', value: '41 - 50'},
  {text: '51 - 60', value: '51 - 60'},
  {text: '61 - 70', value: '61 - 70'},
  {text: '71 - 80', value: '71 - 80'},
];

export default function PoundsHandledFilterCell(props) {
  return (<DropDownListFilterCell options={listItems} {...props} />);
}
