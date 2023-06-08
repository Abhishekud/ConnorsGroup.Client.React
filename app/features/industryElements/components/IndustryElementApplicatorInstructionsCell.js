import React from 'react';


export default class IndustryElementTimeCell extends React.Component {
  render() {
    const row = this.props.dataItem[this.props.field];
    const instructions = row ? row : '';
    const hasInstructions = instructions ? instructions.length > 0 : false;

    return hasInstructions ? <td><i className={'fa fa-info'} title={instructions} /></td> : <td />;
  }
}
