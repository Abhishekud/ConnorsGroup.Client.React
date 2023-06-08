import React from 'react';


export default class LocationStatusCell extends React.Component {
  render() {
    const value = this.props.dataItem[this.props.field];
    const {className, style} = this.props;

    if (typeof value === 'undefined') {
      return (
        <td className={className} style={style} />
      );
    }

    return (
      <td className={className} style={style}>{value ? 'Active' : 'Inactive'}</td>
    );
  }
}
