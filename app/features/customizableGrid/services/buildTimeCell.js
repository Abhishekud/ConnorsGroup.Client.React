import React from 'react';

import {convertToTMUs} from '../../shared/services';
import {FormattedTMUs} from '../../shared/components';

export default function (inputTimeFormat, outputTimeFormat, formatId) {

  class TimeCell extends React.Component {
    render() {
      const {className, style, dataItem, field} = this.props;
      const value = convertToTMUs(dataItem[field], inputTimeFormat);
      return (
        <td className={className} style={style}><FormattedTMUs timeMeasurementUnits={value} timeFormat={outputTimeFormat} formattedTMUsId={formatId} /></td>
      );
    }
  }

  return TimeCell;
}
