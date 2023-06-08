import React from 'react';


export default class ExportStatusCell extends React.Component {
  render() {
    const value = this.props.dataItem[this.props.field];

    switch (value) {
      case 'InProgress':
        return (
          <td><i className="fa fa-sync" title="In Progress" /> In Progress</td>
        );
      case 'Success':
        return (
          <td><i className="fa fa-check-square" title="Success" /> Success</td>
        );
      case 'Failure':
        return (
          <td><i className="fa fa-exclamation-triangle" title="Failure" /> Failure</td>
        );
      default:
        return (<td />);
    }
  }
}
