import React from 'react';
import {DROP_DOWN_VALUES} from '../../constants/IntegrationStatus';

export default function IntegrationStatusCell(props) {
  const value = props.dataItem[props.field];
  const text = DROP_DOWN_VALUES.find(status => status.value === value).text;
  return (<td {...props}>{text}</td>);
}

