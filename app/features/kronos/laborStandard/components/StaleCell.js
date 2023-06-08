import React from 'react';


export default class ActiveCell extends React.Component {
  render() {
    const {className, style} = this.props;
    const value = this.props.dataItem[this.props.field];

    return value ? (<td className={className} style={style}><i className="fa fa-exclamation-triangle" title="A newer version of this standard is in draft." /></td>) : (<td className={className} style={style} />);
  }
}
