import React from 'react';
import moment from 'moment';
import {defaultDateFormat} from '../../shared/constants/defaultDateFormat';

export default class CurrentRevisionCell extends React.Component {
  render() {
    const {field, dataItem} = this.props;
    const defaultStyle = {
      verticalAlign: 'top',
    };
    const style = {
      ...defaultStyle,
      backgroundColor: 'rgb(221, 110, 66, 0.25)',
    };
    const value = dataItem[field];
    if (this.props.dataItem.isCurrentRevision) {
      return (
        <td style={style} title={value}>
          {field === 'createdDate' ? moment(dataItem.createdDate.slice(0, 10)).format(defaultDateFormat) : value}
        </td>
      );
    }
    return (<td title={value} style={defaultStyle}>
      {field === 'createdDate' ? moment(dataItem.createdDate.slice(0, 10)).format(defaultDateFormat) : value}
    </td>);
  }
}
