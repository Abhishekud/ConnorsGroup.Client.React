import React from 'react';

import numeral from 'numeral';


const defaultStyle = {
  textAlign: 'right',
  verticalAlign: 'top'};

export default class FourDecimalNumericCell extends React.Component {
  render() {
    const value = this.props.dataItem[this.props.field];
    return (<td style={defaultStyle} title={value}>
      {numeral(value).format('0,0.0000')}
    </td>);
  }
}
