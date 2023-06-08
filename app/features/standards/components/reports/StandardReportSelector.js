import React from 'react';
import {Dropdown} from 'react-bootstrap';
import MethodReport from './MethodReport';
import {METHOD, BACKUP, METHOD_TIME} from '../../constants/standardReportTypes';

export default function StandardReportSelector({generating, canExport}) {
  return (
    canExport && <div className="flyout-button">
      <Dropdown id="standardReports" bsStyle="default" key="standardReports" title="Reports" disabled={generating} pullRight>
        <Dropdown.Toggle>
          <i className="fa fa-file-pdf-o" /> {generating ? <i className="fa fa-spinner fa-spin" /> : null}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MethodReport title={`Export ${BACKUP} Report`} asMenuItem reportType={BACKUP} />
          <MethodReport title={`Export ${METHOD} Report`} asMenuItem reportType={METHOD} />
          <MethodReport title={`Export ${METHOD_TIME} Report`} asMenuItem reportType={METHOD_TIME} />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
