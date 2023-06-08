import React, {Fragment} from 'react';
import {SUCCESS, FAILURE, NOT_SENT, KRONOS_ITEM_EXPORT_STATUS_TYPE_ENUM_TEXT} from '../../constants/KronosItemExportStatusTypes';

export default function ExportMessages({successStatus, message}) {
  if (successStatus === KRONOS_ITEM_EXPORT_STATUS_TYPE_ENUM_TEXT.SUCCESS) {
    return (<h4>{SUCCESS}</h4>);
  }
  if (successStatus === KRONOS_ITEM_EXPORT_STATUS_TYPE_ENUM_TEXT.FAILURE) {
    return (
      <Fragment>
        <h4>{FAILURE}</h4>
        <p>{message}</p>
      </Fragment>
    );
  }
  return (<h4>{NOT_SENT}</h4>);
}
