import React from 'react';
import numeral from 'numeral';

const defaultStyle = {
  textAlign: 'right',
  verticalAlign: 'top',
};

export default function DefaultVolumeDriverMappingSetsCell({className, style, field, dataItem}) {
  const value = dataItem[field];

  return (<td title={value} style={style ? style : defaultStyle} className={className}>
    {numeral(value).format('0,0.000')}
  </td>);
}
