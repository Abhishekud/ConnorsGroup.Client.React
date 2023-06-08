import React from 'react';
import {DropDownListFilterCell} from '../../customizableGrid/components';

const listItems = [
  {text: '', value: ''},
  {text: 'Enabled', value: 'Enabled'},
  {text: 'Disabled', value: 'Disabled'},
  {text: 'Log In Locked', value: 'LogInLocked'},
];

export default function UserStatusFilterCell(props) {
  return (<DropDownListFilterCell options={listItems} {...props} />);
}
