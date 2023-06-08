import React from 'react';

import numeral from 'numeral';

export default class TwoDecimalNumericCell extends React.Component {
  render() {
    const style = {
      textAlign: 'right',
      verticalAlign: 'top'};
    const value = this.props.dataItem[this.props.field];
    return (<td title={value} style={style}>
      {numeral(value).format('0,0.00')}
    </td>);
  }
}
