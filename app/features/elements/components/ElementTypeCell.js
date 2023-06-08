import React from 'react';


export default class ElementTypeCell extends React.Component {
  render() {
    const title = this.props.dataItem.elementType;

    const value = this.props.dataItem[this.props.field];
    const {className, style} = this.props;
    return (
      <td title={title} className={className} style={style}>
        <span>{value}</span>
      </td>
    );
  }
}
