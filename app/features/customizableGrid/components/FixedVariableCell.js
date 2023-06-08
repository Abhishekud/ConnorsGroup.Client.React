import React from 'react';


export default class FixedVariableCell extends React.Component {
  render() {
    const {className, style, dataItem, field} = this.props;
    const value = dataItem[field];
    return (
      <td className={className} style={style}>{value ? 'Fixed' : 'Variable'}</td>
    );
  }
}
