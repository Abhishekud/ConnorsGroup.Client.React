import React from 'react';

import numeral from 'numeral';

export default class DefaultCell extends React.Component {
  render() {
    const {className, style} = this.props;
    const defaultStyle = {
      textAlign: 'right',
      verticalAlign: 'top'};
    const value = this.props.dataItem[this.props.field];
    return (<td title={value} style={style ? style : defaultStyle} className={className}>
      {numeral(value).format('0,0.000')}
    </td>);
  }
}
