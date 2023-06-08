import React from 'react';


export default class BoolYesNoCell extends React.Component {
  render() {
    const {className, style} = this.props;
    const value = this.props.dataItem[this.props.field];
    return (
      <td className={className} style={style}>{value ? 'Yes' : 'No'}</td>
    );
  }
}
