import React from 'react';

import numeral from 'numeral';

export default class DefaultCell extends React.Component {
  render() {
    const style = {
      backgroundColor: 'rgb(221, 110, 66, 0.25)',
      textAlign: 'right',
      verticalAlign: 'top'};
    const defaultStyle = {
      textAlign: 'right',
      verticalAlign: 'top'};
    const str = (this.props.field);
    const matches = str.match(/(\d+)/)[1];
    const value = this.props.dataItem[this.props.field];
    if (this.props.dataItem[`neverSpecified${matches}`]) {
      return (
        <td style={style} title={value}>
          {numeral(value).format('0,0.000')}
        </td>
      );
    }
    return (<td title={value} style={defaultStyle}>
      {numeral(value).format('0,0.000')}
    </td>);
  }
}
