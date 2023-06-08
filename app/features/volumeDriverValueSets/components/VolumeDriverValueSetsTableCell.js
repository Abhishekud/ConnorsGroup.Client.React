import React from 'react';

const defaultStyle = {
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export default class VolumeDriverValueSetsTableCell extends React.Component {
  render() {
    return (<td style={defaultStyle}>
      {this.props.dataItem[this.props.field]}
    </td>);
  }
}
