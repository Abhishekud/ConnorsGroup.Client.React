import React from 'react';


export default class CharacteristicsStatusCell extends React.Component {
  render() {
    const {className, style} = this.props;
    const mergedStyles = {
      ...style,
      verticalAlign: 'top',
    };
    const value = this.props.dataItem[this.props.field];
    if (typeof value === 'undefined') {
      return (
        <td />
      );
    }
    return (
      <td className={className} style={mergedStyles}>{(value === 'Active') ? 'Active' : 'Inactive'}</td>
    );
  }
}
