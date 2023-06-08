import React from 'react';

import {SUCCESS, FAILURE, NOT_SENT, KRONOS_ITEM_EXPORT_STATUS_TYPE_ENUM_TEXT} from '../../kronos/constants/KronosItemExportStatusTypes';

export default class KronosItemExportStatusCell extends React.Component {
  render() {
    const {className, style} = this.props;
    const value = this.props.dataItem[this.props.field];
    switch (value) {
      case KRONOS_ITEM_EXPORT_STATUS_TYPE_ENUM_TEXT.SUCCESS:
        return (
          <td className={className} style={style}><i className="fa fa-check-square" title="Success" /> {SUCCESS}</td>
        );
      case KRONOS_ITEM_EXPORT_STATUS_TYPE_ENUM_TEXT.FAILURE:
        return (
          <td className={className} style={style}><i className="fa fa-exclamation-triangle" title="Failure" /> {FAILURE}</td>
        );
      case KRONOS_ITEM_EXPORT_STATUS_TYPE_ENUM_TEXT.NOT_SENT:
        return (
          <td className={className} style={style}>{NOT_SENT}</td>
        );
      default:
        return (<td className={className} style={style} />);
    }
  }
}
