import React from 'react';
import {DROP_DOWN_VALUES} from '../../constants/IntegrationStatus';
import {DropDownListFilterCell} from '../../../customizableGrid/components';

export default function IntegrationStatusFilterCell(props) {
  return (<DropDownListFilterCell options={DROP_DOWN_VALUES} {...props} />);
}
