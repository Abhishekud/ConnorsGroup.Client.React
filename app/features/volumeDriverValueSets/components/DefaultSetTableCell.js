import React from 'react';

const defaultStyle = {
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

const defaultSetStyle = {
  fontWeight: 'bold',
};

export default class DefaultSetTableCell extends React.Component {
  render() {
    const {dataItem, field} = this.props;
    if (dataItem.isDefault) {
      return (<td style={defaultStyle}><span style={defaultSetStyle}>(Default) </span> {dataItem[field]}
      </td>);
    }
    return (<td style={defaultStyle}>
      {dataItem[field]}
    </td>);
  }
}
