import React from 'react';

import numeral from 'numeral';

const defaultStyle = {
  textAlign: 'right',
  verticalAlign: 'top'};

export default class volumeDriverValueNumericCell extends React.Component {
  render() {
    const {className, style, dataItem, field} = this.props;
    const value = dataItem[field];

    return (<td style={{...style, ...defaultStyle}} title={value} className={className}>
      {numeral(value).format('0,0.000')}
    </td>);
  }
}
