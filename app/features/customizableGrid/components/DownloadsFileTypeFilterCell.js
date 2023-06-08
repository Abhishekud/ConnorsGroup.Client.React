import React from 'react';
import {DropDownListFilterCell} from '.';

import {fileTypes} from '../../downloads/constants';

export default function DownloadsFileTypeFilterCell(props) {
  return (<DropDownListFilterCell options={fileTypes.filterOptions()} {...props} />);
}
