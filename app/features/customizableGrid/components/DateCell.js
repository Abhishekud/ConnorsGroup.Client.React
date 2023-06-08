import React from 'react';
import moment from 'moment';
import {defaultDateFormat} from '../../shared/constants/defaultDateFormat';

export default class DateCell extends React.Component {
  render() {
    const {className, style, dataItem, field} = this.props;
    const value = dataItem[field];
    return (
      <td className={className} style={style}>{value ? moment(value).format(defaultDateFormat) : ''}</td>
    );
  }
}
