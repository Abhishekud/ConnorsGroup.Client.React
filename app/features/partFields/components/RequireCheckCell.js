import React from 'react';

import {makeClasses} from '../../shared/services';

export default class RequireCheckCell extends React.Component {
  render() {
    const value = this.props.dataItem[this.props.field];
    const classes = makeClasses({'fa': true, 'fa-check': value});
    return (
      <td><i className={classes} /></td>
    );
  }
}
