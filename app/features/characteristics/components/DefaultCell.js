import React from 'react';
import numeral from 'numeral';
import {makeClasses} from '../../shared/services';

export default class DefaultCell extends React.Component {
  render() {
    const {field, dataItem, style, className} = this.props;
    const matches = field.match(/(\d+)/)[1];
    const value = dataItem[field];
    const mergedStyles = {
      ...style,
      textAlign: 'right',
      verticalAlign: 'top',
    };
    const classes = makeClasses({[className]: true, neverSpecifiedCell: dataItem[`neverSpecified${matches}`]});
    return (<td className={classes} style={mergedStyles} title={value}>
      {numeral(value).format('0,0.000')}
    </td>);
  }
}
