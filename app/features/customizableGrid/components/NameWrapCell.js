import React from 'react';


export default class NameWrapCell extends React.Component {
  render() {
    const {className, style, dataItem, field} = this.props;
    const mergedStyle = {...style, whiteSpace: 'nowrap'};
    return (<td className={className} style={mergedStyle}>
      {dataItem[field]}
    </td>);
  }
}
