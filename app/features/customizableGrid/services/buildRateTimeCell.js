import React from 'react';

import {convertToTMUs, formatRateWithUnits} from '../../shared/services';

export default function (inputTimeFormat, outputTimeFormat) {

  class TimeCell extends React.Component {
    render() {
      const {className, style} = this.props;
      const value = convertToTMUs(this.props.dataItem.standardMinutes, inputTimeFormat);
      const rate = formatRateWithUnits(value, outputTimeFormat);
      return (
        <td className={className} style={style}>{rate}</td>
      );
    }
  }

  return TimeCell;
}
