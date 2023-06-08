import React from 'react';


export default class DefaultCell extends React.Component {
  render() {
    const {className, style} = this.props;
    const mergedStyles = {
      ...style,
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
    };
    return (<td className={className} style={mergedStyles}>
      {this.props.dataItem[this.props.field]}
    </td>);
  }
}
