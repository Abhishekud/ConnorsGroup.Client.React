import React from 'react';

import moment from 'moment';

export default class DateCell extends React.Component {
  render() {
    const value = this.props.dataItem[this.props.field];
    return (
      <td>{value === null ? null : <span>{moment(value.toString()).format('MM/DD/YYYY hh:mm:ss A')}</span>}</td>
    );
  }
}
