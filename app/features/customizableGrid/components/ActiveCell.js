import React from 'react';


export default class ActiveCell extends React.Component {
  render() {
    const {className, style} = this.props;
    const field = this.props.field.includes('activeSymbol') ? this.props.field.replace('activeSymbol', 'active') : this.props.field;
    const value = this.props.dataItem[field];

    if (typeof value === 'undefined') {
      return (
        <td className={className} style={style} />
      );
    }

    return (
      <td className={className} style={style}>{!value && <i className="fa fa-exclamation-triangle" title="Inactive" />}</td>
    );
  }
}
