import React, {Fragment} from 'react';

export default function ExportMessages({model}) {
  const value = model.get('success');
  if (value === 'Success') {
    return (<h2>Export Success</h2>);
  }
  if (value === 'Failure') {
    return (
      <Fragment>
        <h2>Export Failure</h2>
        <p>{model.get('message')}</p>
      </Fragment>
    );
  }
  return (<h2>Not Exported</h2>);
}
