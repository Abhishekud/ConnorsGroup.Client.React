import React from 'react';


const defaultStyle = {
  textAlign: 'right',
  verticalAlign: 'top',
  whiteSpace: 'nowrap'};

export default class DefaultTableNumericCell extends React.Component {
  render() {
    return (<td style={defaultStyle}>
      {this.props.dataItem[this.props.field]}
    </td>);
  }
}
