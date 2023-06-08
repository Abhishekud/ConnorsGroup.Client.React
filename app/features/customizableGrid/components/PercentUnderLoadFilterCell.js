import React from 'react';
import {DropDownListFilterCell} from '.';

const listItems = [
  {text: '', value: ''},
  {text: '01 - 12', value: '01 - 12'},
  {text: '13 - 25', value: '13 - 25'},
  {text: '26 - 50', value: '26 - 50'},
  {text: '51 - 75', value: '51 - 75'},
  {text: '76 - 100', value: '76 - 100'},
];

export default function PercentUnderLoadFilterCell(props) {
  return (<DropDownListFilterCell options={listItems} {...props} />);
}
