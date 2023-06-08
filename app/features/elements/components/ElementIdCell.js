import React from 'react';

import {statusClass} from '../../standards/constants/standardStatuses';
import classNames from 'classnames';

export default class ElementIdCell extends React.Component {
  render() {
    const {className, style, dataItem, field} = this.props;
    const value = dataItem[field];
    const status = dataItem.status;
    const mergedClass = classNames('elementIdCell', className, statusClass(status));
    const defaultStyle = {
      textAlign: 'right',
      verticalAlign: 'top'};

    return (
      <td className={mergedClass} style={{...style, ...defaultStyle}}>
        <span>{value}</span>
      </td>
    );
  }
}
