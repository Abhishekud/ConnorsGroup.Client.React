import React from 'react';


export default class ElementApplicatorInstructionsCell extends React.Component {
  render() {
    const {className, style, dataItem, field} = this.props;
    const row = dataItem[field];
    const instructions = row ? row : '';
    const hasInstructions = instructions ? instructions.length > 0 : false;

    return hasInstructions ? <td className={className} style={style}><i className={'fa fa-info'} title={instructions} /></td> : <td className={className} style={style} />;
  }
}
