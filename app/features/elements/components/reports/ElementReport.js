import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import numeral from 'numeral';
import moment from 'moment';
import GeneratePdfButton from '../../../pdfGeneration/components/GeneratePdfButton';
import ReportComponent from '../../../shared/components/ReportComponent';
import {formatTMUs} from '../../../shared/services';
import {timeFormats} from '../../../shared/constants';
import {timeFormatSelector} from '../../../shared/selectors/components/timeFormatSelector';
import {
  clientNameSelector,
} from '../../../shared/selectors/components/settings';
import {Map} from 'immutable';
import {displayName} from '../../../standards/constants/standardStatuses';
import makeCurrentUserHasPermissionSelector from '../../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {ELEMENTS_EXPORT} from '../../../authentication/constants/permissions';

class ElementReport extends ReportComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  buildPdfDefinition(resolve) {
    const {header, mostSteps, timeFormat} = this.props;

    const methodSteps = mostSteps.valueSeq().map(mostStep => [
      {text: mostStep.get('number').toString(), style: 'cellStyleCenter'},
      {text: `${mostStep.get('description')}\r\u0020\u2007\u2007\u2007${mostStep.get('sequenceModel') || ''}`, style: 'cellStyle'},
      {text: numeral(mostStep.get('frequency')).format('0,0.000'), style: 'cellStyleRight'},
      {text: mostStep.get('simultaneous') === true ? 'Y' : 'N', style: 'cellStyleCenter'},
      {text: formatTMUs(mostStep.get('measuredTimeMeasurementUnits'), timeFormats.TMUs), style: 'cellStyleRight'},
      {text: formatTMUs(mostStep.get('adjustedMeasuredTimeMeasurementUnits'), timeFormat), style: 'cellStyleRight'},
    ]).toJSON();

    methodSteps.unshift([
      {text: 'Step', style: 'tableHeaderCenter'},
      {text: 'Method Description', style: 'tableHeader'},
      {text: 'Freq.', style: 'tableHeaderRight'},
      {text: 'Simo', style: 'tableHeaderCenter'},
      {text: 'TMU', style: 'tableHeaderRight'},
      {text: 'Total', style: 'tableHeaderRight'},
    ]);

    const report = {
      footer: this.footer(),
      header: this.header('Element Report', this.props.clientName, header.get('id'), false),
      content: [
        {
          style: 'topTable',
          table: {
            widths: [150, '*'],
            body: [[
              [{
                style: 'topTable',
                table: {
                  body: [
                    [{text: this.props.clientName, border: [true, false, false, false], style: 'title'}],
                    [{text: moment().format('YYYY-MM-DD hh:mm:ss A'), border: [true, false, false, false]}],
                  ],
                },
                layout: this.styles().DOUBLE_BORDER,
              }],
              [{
                style: 'topTable',
                table: {
                  widths: [65, '*'],
                  body: [
                    [{text: 'Title:', border: [true, false, false, false], style: 'title'},
                      {text: header.get('name'), border: [false, false, false, false], style: 'title'}],
                    [{text: 'Element ID:', border: [true, false, false, false]},
                      {text: header.get('id'), border: [false, false, false, false]}],
                    [{text: 'Status:', border: [true, false, false, false]},
                      {text: displayName(header.get('status')), border: [false, false, false, false]}],
                  ],
                },
                layout: this.styles().DOUBLE_BORDER,
              }],
            ]],
          },
          layout: this.styles().ZERO_BORDERS,
        },
        {
          style: 'table',
          table: {
            body: [
              [{
                style: 'table',
                table: {
                  body: [
                    [{text: 'ELEMENT FILING INFO', border: [true, false, false, false], style: 'title'}],
                  ],
                },
                layout: this.styles().DOUBLE_BORDER,
              }],
            ],
          },
          layout: this.styles().ZERO_BORDERS,
        },
        {
          style: 'subtable',
          table: {
            widths: [90, 150, 90, '*'],
            body: [
              [
                {text: 'Unit Of Measure:', style: 'cellTitleStyle'},
                {text: header.get('elementUnitOfMeasureName'), style: 'cellStyle'},
                {text: 'Activity:', style: 'cellTitleStyle'},
                {text: header.get('elementActivityId'), style: 'cellStyle'},
              ],
              [
                {text: 'Total Time (TMUs):', style: 'cellTitleStyle'},
                {text: formatTMUs(header.get('measuredTimeMeasurementUnits'), timeFormats.TMUs), style: 'cellStyle'},
                {text: `Total Time (${timeFormat}):`, style: 'cellTitleStyle'},
                {text: formatTMUs(header.get('measuredTimeMeasurementUnits'), timeFormat), style: 'cellStyle'},
              ],
            ],
          },
          layout: this.styles().ZERO_BORDERS,
        },
        {
          style: 'subtable',
          table: {
            widths: [90, 150, 90, '*'],
            body: [
              [
                {text: 'Applicator:', style: 'cellTitleStyle'},
                {text: header.get('applicatorName') || '', style: 'cellStyle'},
                {text: 'Last Edited By:', style: 'cellTitleStyle'},
                {text: header.get('lastEditorName') || '', style: 'cellStyle'},
              ],
            ],
          },
          layout: this.styles().ZERO_BORDERS,
        },
        {
          style: 'table',
          table: {
            widths: ['*', '*'],
            body: [
              [{
                style: 'table',
                table: {
                  body: [
                    [{text: 'METHOD STEPS', border: [true, false, false, false], style: 'title'}],
                  ],
                },
                layout: this.styles().DOUBLE_BORDER,
              }],
            ],
          },
          layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
          },
        },
        {
          style: 'table',
          table: {
            headerRows: 1,
            widths: [30, 280, 40, 30, 30, 30],
            body: methodSteps,
          },
          layout: 'headerLineOnly',
        },
      ],
      styles: this.styles().STYLES,
    };

    resolve(report);
  }

  render() {
    const {header, canExport} = this.props;
    if (!canExport) return null;
    return (
      <GeneratePdfButton title="Element Report" buildPdfDefinition={this.buildPdfDefinition} reportFileName={`Element Report - ${header.get('id')}.pdf`} />
    );
  }
}

ElementReport.propTypes = {
  header: PropTypes.instanceOf(Map).isRequired,
  mostSteps: PropTypes.instanceOf(Map).isRequired,
};

function mapStateToProps(state) {
  const canExportSelector = makeCurrentUserHasPermissionSelector(ELEMENTS_EXPORT);
  return {
    clientName: clientNameSelector(state),
    timeFormat: timeFormatSelector(state),
    canExport: canExportSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {}
)(ElementReport);
