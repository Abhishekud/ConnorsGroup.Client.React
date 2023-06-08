import numeral from 'numeral';
import {formatTMUs, formatRate, formatTMUsNumericOnly} from '../../shared/services';
import {TMUs, SECONDS, MINUTES, HOURS} from '../../shared/constants/timeFormats';
import {displayName} from '../constants/standardStatuses';
import {METHOD, BACKUP, METHOD_TIME} from '../constants/standardReportTypes';
import {flatMap, concat} from 'lodash';

/// Constant representing common border configurations
const BORDER = {
  NONE: [false, false, false, false],
  UNDERLINE: [false, false, false, true],
  LEFT: [true, false, false, false],
  TOP: [false, true, false, false],
  RIGHT: [false, false, true, false],
  BOTTOM: [false, false, false, true],
  LEFT_TOP: [true, true, false, false],
  TOP_RIGHT: [false, true, true, false],
  LEFT_BOTTOM: [true, false, false, true],
  RIGHT_BOTTOM: [false, false, true, true],
  LEFT_RIGHT: [true, false, true, false],
  LEFT_TOP_BOTTOM: [true, true, false, true],
  TOP_RIGHT_BOTTOM: [false, true, true, true],
  LEFT_RIGHT_BOTTOM: [true, false, true, true],
};

const blankColumn = {text: '', border: BORDER.NONE};

function unifyReportModel(data, props, timestamp) {
  const characteristics = data.characteristics.map(c => ({
    name: c.name,
    value: numeral(c.defaultValue).format('0,0.0000'),
    definition: c.definition || '',
  }));

  const systemFilingFields = [{
    name: props.departmentName,
    value: data.details.departmentName,
  }, {
    name: 'Attribute',
    value: data.details.attributeName || '',
  }, {
    name: 'Labor Category',
    value: data.details.laborCategoryName || '',
  }, {
    name: 'Classification',
    value: data.details.classificationName || '',
  }, {
    name: 'Fixed/Variable',
    value: data.details.fixed ? 'Fixed' : 'Variable',
  }];
  const customFilingFields = props.filingFields.map(ffDef => {
    const selectedFFOption = data.details.filingFieldValues.find(ffValue => ffValue.standardFilingFieldId === ffDef.get('id'));
    const selectedOptionId = selectedFFOption ? selectedFFOption.standardFilingFieldOptionId : null;

    if (selectedOptionId === null) {
      return null;
    }

    const valueName = ffDef.get('options').find(y => y.value === selectedOptionId);
    return {
      name: ffDef.get('name'),
      value: valueName.label,
    };
  }).filter(ff => ff !== null).valueSeq().toArray();
  const filingFields = systemFilingFields.concat(customFilingFields);

  // element == step, op == stepstep
  const method = data.standardItems.map((element, index) => {
    const elementsForReport = data.elementsForReport.filter(op =>
      (op.standardElementId === null && op.elementId === element.elementId) ||
      (op.elementId === null && op.standardElementId === element.id)
    );
    const operations = elementsForReport.map(op => ({
      number: op.number,
      description: op.description || '',
      sequenceModel: op.sequenceModel || '',
      adjustedMeasuredTMUs: op.adjustedMeasuredTimeMeasurementUnits ? formatTMUs(op.adjustedMeasuredTimeMeasurementUnits, props.timeFormat) : '',
      frequency: numeral(op.frequency).format('0,0.0000'),
    }));
    let isLastElement = true;
    if (data.standardItems[index + 1]) {
      isLastElement = false;
    }
    return {
      index: element.index,
      elementId: element.elementId || '',
      name: element.name,
      frequencyFormula: element.type === 'StandardElement' ? element.frequencyFormula : '',
      measuredTMUs: element.type === 'StandardElement' ? formatTMUs(element.measuredTimeMeasurementUnits, props.timeFormat) : '',
      normalTMUs: element.type === 'StandardElement' ? formatTMUs(element.normalTimeMeasurementUnits, props.timeFormat) : '',
      internal: element.internal,
      machineAllowance: element.machineAllowance,
      unitOfMeasureName: element.unitOfMeasureName,
      type: element.type,
      standardElementGroupId: element.standardElementGroupId,
      isLastElement,
      operations,
      frequencyValue: element.type === 'StandardElementGroup' ? '' : numeral(element.frequencyValue).format('0,0.0000'),
      comment: element.comment,
    };
  });

  const standardUnitsOfMeasure = data.standardUnitsOfMeasure.map(uom => ({
    name: uom.unitOfMeasureName,
    totalManualStandardTMUs: uom.totalManualStandardTimeMeasurementUnits,
    totalMachineStandardTMUs: uom.totalMachineStandardTimeMeasurementUnits,
    totalStandardTMUs: uom.totalStandardTimeMeasurementUnits,
  }));

  return {
    client: props.clientName || '',
    name: `Standard ${props.reportType} Report`,
    timestamp,
    timeFormat: props.timeFormat,
    standard: {
      id: props.id,
      applicatorName: data.details.applicatorName || '',
      lastEditorName: data.details.lastEditorName || '',
      status: displayName(data.details.status) || '',
      title: data.details.name || '',
      characteristics,
      filingFields,
      method,
      allowanceFactor: data.details.allowanceFactor ? numeral(data.details.allowanceFactor * 100).format('0,0.00') : '0',
      machineAllowancePercent: numeral(data.details.machineAllowancePercent).format('0,0.00'),
      standardUnitsOfMeasure,
      applicatorInstructions: data.details.applicatorInstructions,
      defaultCharacteristicSetName: data.defaultCharacteristicSetName,
    },
  };
}

const ternaryCondition = (condition, then, otherwise) => (condition ? then : otherwise);
const columnIndex = {
  FIRST: 'FIRST',
  MIDDLE: 'MIDDLE',
  LAST: 'LAST',
};
const getBorder = (index, isGroupElement, isLastElement) => {
  let border = BORDER.NONE;
  switch (index) {
    case columnIndex.FIRST:
      border = isGroupElement ? ternaryCondition(isLastElement, BORDER.LEFT_BOTTOM, BORDER.LEFT) : BORDER.LEFT_TOP;
      break;
    case columnIndex.MIDDLE:
      border = isGroupElement ? ternaryCondition(isLastElement, BORDER.BOTTOM, BORDER.NONE) : BORDER.TOP;
      break;
    case columnIndex.LAST:
      border = isGroupElement ? ternaryCondition(isLastElement, BORDER.RIGHT_BOTTOM, BORDER.RIGHT) : BORDER.TOP_RIGHT;
      break;
  }
  return border;
};
function generateTitle(model, styles) {
  return [{
    style: 'topTable',
    table: {
      widths: [150, 300, '*'],
      body: [[
        [{
          style: 'topTable',
          table: {
            body: [
              [{text: model.client, border: BORDER.LEFT, style: 'title'}],
              [{text: model.timestamp, border: BORDER.LEFT}],
            ],
          },
          layout: styles().DOUBLE_BORDER,
        }],
        [{
          style: 'topTable',
          table: {
            widths: [65, '*'],
            body: [
              [{text: 'Title:', border: BORDER.LEFT, style: 'title'},
                {text: model.standard.title, border: BORDER.NONE, style: 'title'}],
              [{text: 'ID:', border: BORDER.LEFT},
                {text: model.standard.id, border: BORDER.NONE}],
              [{text: 'Status:', border: BORDER.LEFT},
                {text: model.standard.status, border: BORDER.NONE}],
            ],
          },
          layout: styles().DOUBLE_BORDER,
        }],
        [{
          style: 'topTable',
          table: {
            body: [
              [{text: 'Applicator Instructions', border: BORDER.LEFT, style: 'title'}],
              [{text: model.standard.applicatorInstructions, border: BORDER.LEFT}],
            ],
          },
          layout: styles().DOUBLE_BORDER,
        }],
      ]],
    },
    layout: styles().ZERO_BORDERS,
  }];
}

function generateFilingInfo(model, styles) {
  const filingFieldList = flatMap(model.standard.filingFields, ff => [{text: `${ff.name}:`, style: 'cellTitleStyle'}, {text: ff.value, style: 'cellStyle'}]);
  const filingFieldsGrouped = [];
  const columns = 6;
  for (let index = 0; index < filingFieldList.length; index += columns) {
    const row = filingFieldList.slice(index, index + columns);
    while (row.length < columns) {
      row.push(
        {text: '', style: 'cellTitleStyle'},
        {text: '', style: 'cellStyle'},
      );
    }
    filingFieldsGrouped.push(row);
  }

  return [{
    style: 'table',
    table: {
      body: [
        [{
          style: 'table',
          table: {
            body: [
              [{text: 'STANDARD FILING INFO', border: BORDER.LEFT, style: 'title'}],
            ],
          },
          layout: styles().DOUBLE_BORDER,
        }],
      ],
    },
    layout: styles().ZERO_BORDERS,
  },
  {
    style: 'subtable',
    table: {
      widths: [90, 130, 90, 130, 90, '*'],
      body: filingFieldsGrouped,
    },
    layout: styles().ZERO_BORDERS,
  },
  {
    style: 'subtable',
    table: {
      widths: [90, 130, 90, 130, 90, '*'],
      body: [
        [
          {text: 'Applicator:', style: 'cellTitleStyle'},
          {text: model.standard.applicatorName || '', style: 'cellStyle'},
          {text: 'Last Edited By:', style: 'cellTitleStyle'},
          {text: model.standard.lastEditorName || '', style: 'cellStyle'},
          {text: 'Default Characteristic Set:', style: 'cellTitleStyle'},
          {text: model.standard.defaultCharacteristicSetName, style: 'cellStyle'},
        ],
      ],
    },
    layout: styles().ZERO_BORDERS,
  }];
}

// This function is not currently used but it is useful for reference. Remove in a couple months.
/* eslint-disable-next-line */
function generateStandardTimeOverview(model, styles) {
  const standardTimeOverview = [];
  standardTimeOverview.push(
    {
      style: 'table',
      table: {
        body: [
          [{
            style: 'table',
            table: {
              body: [
                [{text: 'STANDARD TIME', border: BORDER.LEFT, style: 'title'}],
              ],
            },
            layout: styles().DOUBLE_BORDER,
          }],
        ],
      },
      layout: styles().ZERO_BORDERS,
    },
    {
      style: 'subtableBuffered',
      table: {
        widths: [80, 60, 30, 150, 60, '*'],
        body: [
          [{text: 'Allowance Factor:', style: 'cellTitleStyle'},
            {text: model.standard.allowanceFactor, style: 'cellStyleRight'},
            {text: ''},
            {text: 'Incentive Opportunity Allowance %:', style: 'cellTitleStyle'},
            {text: model.standard.machineAllowancePercent, style: 'cellStyleRight'}],
        ],
      },
      layout: styles().ZERO_BORDERS,
    },
  );

  standardTimeOverview.push(
    {
      style: 'subtableTight',
      table: {
        widths: [170, 30, 90, 30, 90, 30, 80, '*'],
        body: [
          [{text: 'Unit Of Measure', style: 'cellTitleStyle', border: BORDER.UNDERLINE},
            {text: '', border: BORDER.NONE},
            {text: 'Total Manual', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            {text: '', border: BORDER.NONE},
            {text: 'Total Incentive Oppty', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            {text: '', border: BORDER.NONE},
            {text: 'Total', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            {text: '', border: BORDER.NONE}],
        ],
      },
    },
  );

  const format = tmu => (tmu ? formatTMUs(tmu, model.timeFormat) : '');
  model.standard.standardUnitsOfMeasure.map(suom =>
    standardTimeOverview.push(
      {
        style: 'subtableTight',
        table: {
          widths: [170, 30, 90, 30, 90, 30, 90, '*'],
          body: [
            [{text: suom.name, style: 'cellTitleStyle'},
              {text: ''},
              {text: format(suom.totalManualStandardTMUs), style: 'cellStyleRight'},
              {text: ''},
              {text: format(suom.totalMachineStandardTMUs), style: 'cellStyleRight'},
              {text: ''},
              {text: format(suom.totalStandardTMUs), style: 'cellStyleRight'},
              {text: ''}],
          ],
        },
        layout: styles().ZERO_BORDERS,
      },
    )
  );
  return [standardTimeOverview];
}

function generateStandardRateOverview(model, styles, hasBetaAccess) {
  function sectionHeader(text, styles) {
    return {
      style: 'table',
      table: {
        body: [
          [{
            style: 'table',
            table: {
              body: [[{text, border: BORDER.LEFT, style: 'title'}]],
            },
            layout: styles().DOUBLE_BORDER,
          }],
        ],
      },
      layout: styles().ZERO_BORDERS,
    };
  }

  function timeCell(tmus, timeFormat) {
    return {text: formatTMUsNumericOnly(tmus, timeFormat), style: 'cellStyleRight', border: BORDER.NONE};
  }

  function uomRow(suom) {
    const totalTMUs = hasBetaAccess ? suom.totalMachineStandardTMUs : suom.totalStandardTMUs;
    return [
      {text: suom.name, style: 'cellTitleStyle', border: BORDER.NONE},
      blankColumn,
      {text: suom.totalStandardTMUs ? formatRate(suom.totalStandardTMUs, MINUTES) : '', style: 'cellStyleRight', border: BORDER.NONE},
      {text: suom.totalStandardTMUs ? formatRate(suom.totalStandardTMUs, HOURS) : '', style: 'cellStyleRight', border: BORDER.NONE},
      blankColumn,
      timeCell(suom.totalManualStandardTMUs, TMUs),
      timeCell(suom.totalManualStandardTMUs, SECONDS),
      timeCell(suom.totalManualStandardTMUs, MINUTES),
      timeCell(suom.totalManualStandardTMUs, HOURS),
      blankColumn,
      timeCell(totalTMUs, TMUs),
      timeCell(totalTMUs, SECONDS),
      timeCell(totalTMUs, MINUTES),
      timeCell(totalTMUs, HOURS),
      blankColumn,
      hasBetaAccess ? timeCell(suom.totalStandardTMUs, TMUs) : blankColumn,
      hasBetaAccess ? timeCell(suom.totalStandardTMUs, SECONDS) : blankColumn,
      hasBetaAccess ? timeCell(suom.totalStandardTMUs, MINUTES) : blankColumn,
      hasBetaAccess ? timeCell(suom.totalStandardTMUs, HOURS) : blankColumn,
    ];
  }

  const table = [sectionHeader('STANDARD TIME', styles),
    {
      style: 'subtableBuffered',
      table: {
        widths: [80, 60, 30, 150, 60, '*'],
        body: [
          [{text: 'Allowance Factor:', style: 'cellTitleStyle', border: BORDER.NONE},
            {text: model.standard.allowanceFactor, style: 'cellStyleRight', border: BORDER.NONE},
            blankColumn,
            {text: hasBetaAccess ? 'Incentive Opportunity Allowance %:' : '', style: 'cellTitleStyle', border: BORDER.NONE},
            {text: hasBetaAccess ? model.standard.machineAllowancePercent : '', style: 'cellStyleRight', border: BORDER.NONE}],
        ],
      },
      layout: styles().ZERO_BORDERS,
    },
    {
      style: 'subtableTight',
      table: {
        widths: [170, 'auto', 30, 30, 'auto', 30, 30, 30, 30, 'auto', 30, 30, 30, 30, 'auto', 30, 30, 30, 30],
        headerRows: 2,
        keepWithHeaderRows: true,
        body: concat([
          [blankColumn,
            blankColumn,
            {text: 'Rate', style: 'cellTitleStyle', alignment: 'center', border: BORDER.UNDERLINE, colSpan: 2},
            {},
            blankColumn,
            {text: 'Total Manual', style: 'cellTitleStyle', alignment: 'center', border: BORDER.UNDERLINE, colSpan: 4},
            {},
            {},
            {},
            blankColumn,
            {text: hasBetaAccess ? 'Total Incentive Oppty' : 'Total', style: 'cellTitleStyle', alignment: 'center', border: BORDER.UNDERLINE, colSpan: 4},
            {},
            {},
            {},
            blankColumn,
            hasBetaAccess ? {text: 'Total', style: 'cellTitleStyle', alignment: 'center', border: BORDER.UNDERLINE, colSpan: 4} : {text: '', border: BORDER.NONE, colSpan: 4},
            {},
            {},
            {},
          ],
          [{text: 'Unit Of Measure', style: 'cellTitleStyle', border: BORDER.UNDERLINE},
            blankColumn,
            {text: '/Min', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            {text: '/Hr', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            blankColumn,
            {text: 'TMUs', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            {text: 'Sec', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            {text: 'Min', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            {text: 'Hr', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            blankColumn,
            {text: 'TMUs', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            {text: 'Sec', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            {text: 'Min', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            {text: 'Hr', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE},
            blankColumn,
            hasBetaAccess ? {text: 'TMUs', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE} : blankColumn,
            hasBetaAccess ? {text: 'Sec', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE} : blankColumn,
            hasBetaAccess ? {text: 'Min', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE} : blankColumn,
            hasBetaAccess ? {text: 'Hr', style: 'cellTitleStyleRight', border: BORDER.UNDERLINE} : blankColumn,
          ],
        ], model.standard.standardUnitsOfMeasure.map(uomRow)),
      },
    },
  ];
  return table;
}

function generateEmptyStandardTimeOverview(/*model, styles*/) {
  return [[]];
}

function generateDetailedMethodSteps(model, styles, hasBetaAccess) {
  const detailSteps = [];
  const widthToAdjust = hasBetaAccess ? 0 : 45;
  const detailStepWidths = [30, 45, 190 + widthToAdjust, 164, 35, 35, 45, 45, 40, 45 - widthToAdjust];
  detailSteps.unshift([
    {text: '\r\rStep', style: 'tableHeaderCenter', border: BORDER.UNDERLINE},
    {text: '\rElement ID', style: 'tableHeaderCenter', border: BORDER.UNDERLINE},
    {text: '\r\rTitle', style: 'tableHeader', border: BORDER.UNDERLINE},
    {text: '\r\rFreq. Formula', style: 'tableHeader', border: BORDER.UNDERLINE},
    {text: '\r\rFreq.', style: 'tableHeaderRight', border: BORDER.UNDERLINE},
    {text: '\r\rUOM', style: 'tableHeader', border: BORDER.UNDERLINE},
    {text: `\rUnit ${model.timeFormat}`, style: 'tableHeaderRight', border: BORDER.UNDERLINE},
    {text: `\rTotal ${model.timeFormat}`, style: 'tableHeaderRight', border: BORDER.UNDERLINE},
    {text: '\r\rInternal', style: 'tableHeaderCenter', border: BORDER.UNDERLINE},
    {text: hasBetaAccess ? 'Incentive Opport. Allow.' : '', style: 'tableHeaderRight', border: BORDER.UNDERLINE},
  ]);
  model.standard.method.forEach(step => {
    const isGroup = step.type === 'StandardElementGroup';
    const isGroupElement = step.type === 'StandardElement' && step.standardElementGroupId;
    const cellStyleCenter = isGroup ? 'cellStyleCenterBoldGray' : 'cellStyleCenter';
    const cellStyleLeft = isGroup ? 'cellStyleBoldGray' : 'cellStyle';
    const cellStyleRight = isGroup ? 'cellStyleRightBoldGray' : 'cellStyleRight';
    const firstElementBorder = isGroupElement ? BORDER.LEFT : BORDER.LEFT_TOP;
    const middleElementBorder = isGroupElement ? BORDER.NONE : BORDER.TOP;
    const lastElementBorder = isGroupElement ? BORDER.RIGHT : BORDER.TOP_RIGHT;
    const isComment = step.comment !== null && step.comment !== '';
    detailSteps.push([
      {text: step.index, style: cellStyleCenter, border: firstElementBorder},
      {text: step.elementId, style: cellStyleLeft, border: middleElementBorder},
      {text: step.name, style: cellStyleLeft, border: middleElementBorder},
      {text: step.frequencyFormula, style: cellStyleLeft, border: middleElementBorder},
      {text: step.frequencyValue, style: cellStyleRight, border: middleElementBorder},
      {text: step.unitOfMeasureName, style: cellStyleLeft, border: middleElementBorder},
      {text: step.measuredTMUs, style: cellStyleRight, border: middleElementBorder},
      {text: step.normalTMUs, style: cellStyleRight, border: middleElementBorder},
      step.internal === true ? {image: 'checkbox', style: cellStyleCenter, border: middleElementBorder} : {text: '', style: cellStyleCenter, border: middleElementBorder},
      step.machineAllowance === true && hasBetaAccess ? {image: 'checkbox', style: cellStyleCenter, border: lastElementBorder} : {text: '', style: cellStyleCenter, border: lastElementBorder},
    ]);

    const detailRows = [];
    step.operations.forEach(stepStep => {
      detailRows.push([
        {text: `${stepStep.number}. ${stepStep.description}`, style: 'cellStyle'},
        {text: stepStep.sequenceModel, style: 'cellStyle'},
        {text: stepStep.frequency, style: 'cellStyleRight'},
        {text: '', border: BORDER.NONE},
        {text: stepStep.adjustedMeasuredTMUs, style: 'cellStyleRight'},
      ]);
    });
    if (detailRows.length > 0) {
      detailSteps.push([
        {text: '', border: step.isLastElement && !isComment ? BORDER.LEFT_BOTTOM : BORDER.LEFT},
        {text: '', border: step.isLastElement && !isComment ? BORDER.UNDERLINE : BORDER.NONE},
        {
          style: 'embeddedTable',
          table: {
            widths: [190 + widthToAdjust, 161, 35, 38, 45],
            body: detailRows,
          },
          layout: styles().ZERO_BORDERS,
          colSpan: 8,
          border: step.isLastElement && !isComment ? BORDER.RIGHT_BOTTOM : BORDER.RIGHT,
        }]);
    }
    // add comment
    if (isComment && !isGroup) {
      detailSteps.push([
        {
          unbreakable: true,
          style: 'embeddedTable',
          table: {
            widths: [30, 45, '*', 30],
            body: [[
              {text: '', style: 'cellStyle', border: BORDER.NONE},
              {text: 'Comment:', style: 'commentCellTitleStyle', border: BORDER.LEFT_TOP_BOTTOM},
              {text: step.comment?.trimEnd(), style: 'commentCellStyle', border: BORDER.TOP_RIGHT_BOTTOM},
              {text: '', style: 'cellStyle', border: BORDER.NONE},
            ]],
          },
          layout: styles().LIGHT_GRAY_BORDERS,
          colSpan: 10,
          border: step.isLastElement ? BORDER.LEFT_RIGHT_BOTTOM : BORDER.LEFT_RIGHT,
        },
      ]);
    }
  });
  return [{
    style: 'table',
    pageBreak: 'before',
    table: {
      widths: ['*', '*'],
      body: [
        [{
          style: 'table',
          table: {
            body: [
              [{text: 'METHOD STEPS', border: BORDER.LEFT, style: 'title'}],
            ],
          },
          layout: styles().DOUBLE_BORDER,
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
      widths: detailStepWidths,
      body: detailSteps,
    },
    layout: styles().GRAY_BORDERS,
  }];
}

function generateTimedMethodSteps(model, styles, hasBetaAccess) {
  const detailSteps = [];
  const widthToAdjust = hasBetaAccess ? 0 : 45;
  const detailStepWidths = [30, 45, 220 + widthToAdjust, 45, 175, 45, 45, 40, 45 - widthToAdjust];
  detailSteps.unshift([
    {text: '\r\rStep', style: 'tableHeaderCenter', border: BORDER.UNDERLINE},
    {text: '\rElement ID', style: 'tableHeaderCenter', border: BORDER.UNDERLINE},
    {text: '\r\rTitle', style: 'tableHeader', border: BORDER.UNDERLINE},
    {text: `\rUnit ${model.timeFormat}`, style: 'tableHeaderRight', border: BORDER.UNDERLINE},
    {text: '\r\rFreq.', style: 'tableHeader', border: BORDER.UNDERLINE},
    {text: '\r\rUOM', style: 'tableHeader', border: BORDER.UNDERLINE},
    {text: `\rTotal ${model.timeFormat}`, style: 'tableHeaderRight', border: BORDER.UNDERLINE},
    {text: '\r\rInternal', style: 'tableHeaderCenter', border: BORDER.UNDERLINE},
    {text: hasBetaAccess ? 'Incentive Opport. Allow.' : '', style: 'tableHeaderRight', border: BORDER.UNDERLINE},
  ]);

  model.standard.method.forEach(step => {
    const isGroup = step.type === 'StandardElementGroup';
    const isGroupElement = step.type === 'StandardElement' && step.standardElementGroupId;
    const cellStyleCenter = isGroup ? 'cellStyleCenterBoldGray' : 'cellStyleCenter';
    const cellStyleLeft = isGroup ? 'cellStyleBoldGray' : 'cellStyle';
    const cellStyleRight = isGroup ? 'cellStyleRightBoldGray' : 'cellStyleRight';
    const firstElementBorder = getBorder(columnIndex.FIRST, isGroupElement, step.isLastElement);
    const middleElementBorder = getBorder(columnIndex.MIDDLE, isGroupElement, step.isLastElement);
    const lastElementBorder = getBorder(columnIndex.LAST, isGroupElement, step.isLastElement);

    detailSteps.push([
      {text: step.index, style: cellStyleCenter, border: firstElementBorder},
      {text: step.elementId, style: cellStyleLeft, border: middleElementBorder},
      {text: step.name, style: cellStyleLeft, border: middleElementBorder},
      {text: step.measuredTMUs, style: cellStyleRight, border: middleElementBorder},
      {text: step.frequencyFormula, style: cellStyleLeft, border: middleElementBorder},
      {text: step.unitOfMeasureName, style: cellStyleLeft, border: middleElementBorder},
      {text: step.normalTMUs, style: cellStyleRight, border: middleElementBorder},
      step.internal === true ? {image: 'checkbox', style: cellStyleCenter, border: middleElementBorder} : {text: '', style: cellStyleCenter, border: middleElementBorder},
      step.machineAllowance === true && hasBetaAccess ? {image: 'checkbox', style: cellStyleCenter, border: lastElementBorder} : {text: '', style: cellStyleCenter, border: lastElementBorder},
    ]);
  });

  return [{
    style: 'table',
    pageBreak: 'before',
    table: {
      widths: ['*', '*'],
      body: [
        [{
          style: 'table',
          table: {
            body: [
              [{text: 'METHOD STEPS', border: BORDER.LEFT, style: 'title'}],
            ],
          },
          layout: styles().DOUBLE_BORDER,
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
      widths: detailStepWidths,
      body: detailSteps,
    },
    layout: styles().GRAY_BORDERS,
  }];
}

function generateMethodSteps(model, styles, hasBetaAccess) {
  const detailSteps = [];
  const widthToAdjust = hasBetaAccess ? 0 : 45;
  const detailStepWidths = [35, 45, 241 + widthToAdjust, 236, 54, 45, 45 - widthToAdjust];
  detailSteps.unshift([
    {text: '\r\rStep', style: 'tableHeaderCenter', border: BORDER.UNDERLINE},
    {text: '\rElement ID', style: 'tableHeaderCenter', border: BORDER.UNDERLINE},
    {text: '\r\rTitle', style: 'tableHeader', border: BORDER.UNDERLINE},
    {text: '\r\rFreq.', style: 'tableHeader', border: BORDER.UNDERLINE},
    {text: '\r\rUOM', style: 'tableHeader', border: BORDER.UNDERLINE},
    {text: '\r\rInternal', style: 'tableHeaderCenter', border: BORDER.UNDERLINE},
    {text: hasBetaAccess ? 'Incentive Opport. Allow.' : '', style: 'tableHeaderRight', border: BORDER.UNDERLINE},
  ]);
  model.standard.method.forEach(step => {
    const isGroup = step.type === 'StandardElementGroup';
    const isGroupElement = step.type === 'StandardElement' && step.standardElementGroupId;
    const cellStyleCenter = isGroup ? 'cellStyleCenterBoldGray' : 'cellStyleCenter';
    const cellStyleLeft = isGroup ? 'cellStyleBoldGray' : 'cellStyle';
    const firstElementBorder = getBorder(columnIndex.FIRST, isGroupElement, step.isLastElement);
    const middleElementBorder = getBorder(columnIndex.MIDDLE, isGroupElement, step.isLastElement);
    const lastElementBorder = getBorder(columnIndex.LAST, isGroupElement, step.isLastElement);
    detailSteps.push([
      {text: step.index, style: cellStyleCenter, border: firstElementBorder},
      {text: step.elementId, style: cellStyleLeft, border: middleElementBorder},
      {text: step.name, style: cellStyleLeft, border: middleElementBorder},
      {text: step.frequencyFormula, style: cellStyleLeft, border: middleElementBorder},
      {text: step.unitOfMeasureName, style: cellStyleLeft, border: middleElementBorder},
      step.internal === true ? {image: 'checkbox', style: cellStyleCenter, border: middleElementBorder} : {text: '', style: cellStyleCenter, border: middleElementBorder},
      step.machineAllowance === true && hasBetaAccess ? {image: 'checkbox', style: cellStyleCenter, border: lastElementBorder} : {text: '', style: cellStyleCenter, border: lastElementBorder},
    ]);
  });

  return [{
    style: 'table',
    table: {
      widths: ['*', '*'],
      body: [
        [{
          style: 'table',
          table: {
            body: [
              [{text: 'METHOD STEPS', border: BORDER.LEFT, style: 'title'}],
            ],
          },
          layout: styles().DOUBLE_BORDER,
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
      widths: detailStepWidths,
      body: detailSteps,
    },
    layout: styles().GRAY_BORDERS,
  }];
}

function generateCharacteristics(model, styles) {
  const characteristicsList = model.standard.characteristics.map(x => [
    {text: x.name, style: 'cellStyle', border: BORDER.NONE},
    {text: x.value, style: 'cellStyleRight', border: BORDER.NONE},
    {text: x.definition, style: 'cellStyle', border: BORDER.NONE},
  ]);
  characteristicsList.unshift([
    {text: 'Characteristic', style: 'tableHeader', border: BORDER.UNDERLINE},
    {text: 'Value', style: 'tableHeaderRight', border: BORDER.UNDERLINE},
    {text: 'Definition', style: 'tableHeader', border: BORDER.UNDERLINE},
  ]);

  return [{
    style: 'table',
    pageBreak: 'before',
    table: {
      body: [
        [{
          style: 'table',
          table: {
            body: [
              [{text: 'CHARACTERISTICS', border: BORDER.LEFT, style: 'title'}],
            ],
          },
          layout: styles().DOUBLE_BORDER,
        }],
      ],
    },
    layout: styles().ZERO_BORDERS,
  }, {
    style: 'subtable',
    table: {
      headerRows: 1,
      widths: [180, 90, '*'],
      body: characteristicsList,
    },
    layout: styles().GRAY_BORDERS,
  }];
}


export function generateReport(data, props, styles, footer, header, timestamp) {
  let content = [];
  switch (props.reportType) {
    case METHOD:
      content = [generateTitle, generateFilingInfo, generateEmptyStandardTimeOverview, generateMethodSteps, generateCharacteristics];
      break;
    case BACKUP:
      content = [generateTitle, generateFilingInfo, generateStandardRateOverview, generateDetailedMethodSteps, generateCharacteristics];
      break;
    case METHOD_TIME:
      content = [generateTitle, generateFilingInfo, generateStandardRateOverview, generateTimedMethodSteps, generateCharacteristics];
      break;
    default:
      throw new Error(`Unknown report type: ${props.reportType}`);
  }

  const reportModel = unifyReportModel(data, props, timestamp);
  const generate = fn => fn(reportModel, styles, props.hasBetaAccess);

  const report = {
    pageOrientation: 'landscape',
    footer: footer(true),
    header: header(reportModel.name, reportModel.client, `ID: ${reportModel.standard.id}`, true),
    images: {
      checkbox: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAFiS0dEAIgFHUgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMTItMTBUMDI6MDA6MjYrMDA6MDDfVHS3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTEyLTEwVDAyOjAwOjI2KzAwOjAwrgnMCwAAABt0RVh0U29mdHdhcmUAQVBORyBBc3NlbWJsZXIgMy4wXkUsHAAAAI1JREFUKFNj/A8EDCQAJihNFPj37x/xGvIz0hgePnjAwAByEiHQWl8Lcvb/N69e/yeoAabYwcwYzAdrsDMx/O/j7AgWQAboikEArCEpKgIsEerjBRYEAWyKQQDupKzkRLCC5OjI/1Mn9GNVDAIofgBpYgUq5MChGAQwPJ0cE/nfVFsDysMEtI1pBgYGBgAxYx1HSh6cTwAAAABJRU5ErkJggg==',
    },
    content: flatMap(content, generate),
    styles: styles().STYLES,
  };
  return report;
}

export function styles() {
  const HEADER_FONT_SIZE = 14;
  const HEADING_FONT_SIZE = 11;
  const FOOTER_FONT_SIZE = 8;
  const NORMAL_FONT_SIZE = 9;
  const TITLE_FONT_SIZE = 13;

  return ({
    HEADER_FONT_SIZE,
    HEADING_FONT_SIZE,
    FOOTER_FONT_SIZE,
    NORMAL_FONT_SIZE,
    TITLE_FONT_SIZE,

    ZERO_BORDERS: {
      hLineWidth: () => 0,
      vLineWidth: () => 0,
    },

    GRAY_BORDERS: {
      hLineWidth: () => 1,
      vLineWidth: () => 1,
      hLineColor: () => 'gray',
      vLineColor: () => 'gray',
    },

    LIGHT_GRAY_BORDERS: {
      hLineWidth: () => 1,
      vLineWidth: () => 1,
      hLineColor: () => '#D3D4D4',
      vLineColor: () => '#D3D4D4',
    },

    DOUBLE_BORDER: {
      hLineWidth: () => 2,
      vLineWidth: () => 2,
    },

    STYLES: {
      header: {
        fontSize: HEADER_FONT_SIZE,
        bold: true,
        alignment: 'center',
        margin: [30, 15, 30, 10],
      },
      headerLeftSideItem: {
        fontSize: HEADING_FONT_SIZE,
        alignment: 'left',
        margin: [0, 5, 0, 0],
      },
      headerRightSideItem: {
        fontSize: HEADING_FONT_SIZE,
        alignment: 'right',
        margin: [0, 5, 0, 0],
      },
      footerRight: {
        fontSize: FOOTER_FONT_SIZE,
        bold: true,
        alignment: 'right',
        margin: [30, 0, 0, 30],
      },
      footerLeft: {
        fontSize: FOOTER_FONT_SIZE,
        bold: true,
        alignment: 'left',
        margin: [0, 0, 30, 30],
      },
      topTable: {
        fontSize: NORMAL_FONT_SIZE,
        margin: [0, 10, 0, 0],
      },
      table: {
        fontSize: NORMAL_FONT_SIZE,
        margin: [0, 10, 0, 0],
      },
      subtable: {
        fontSize: NORMAL_FONT_SIZE,
        margin: [7, 10, 0, 0],
      },
      subtableBuffered: {
        fontSize: NORMAL_FONT_SIZE,
        margin: [7, 10, 0, 10],
      },
      subtableTight: {
        fontSize: NORMAL_FONT_SIZE,
        margin: [7, 0, 0, 0],
      },
      elementEmbeddedTable: {
        fontSize: NORMAL_FONT_SIZE,
        margin: [20, 0, 0, 0],
      },
      tableHeader: {
        bold: true,
        fontSize: HEADING_FONT_SIZE,
        color: 'black',
      },
      tableHeaderCenter: {
        bold: true,
        fontSize: HEADING_FONT_SIZE,
        color: 'black',
        alignment: 'center',
      },
      tableHeaderRight: {
        bold: true,
        fontSize: HEADING_FONT_SIZE,
        color: 'black',
        alignment: 'right',
      },
      title: {
        bold: true,
        fontSize: TITLE_FONT_SIZE,
      },
      cellTitleStyle: {
        fontSize: NORMAL_FONT_SIZE,
        bold: true,
      },
      cellTitleStyleRight: {
        fontSize: NORMAL_FONT_SIZE,
        bold: true,
        alignment: 'right',
      },
      cellStyle: {
        fontSize: NORMAL_FONT_SIZE,
        lineHeight: 1.2,
      },
      cellStyleCenter: {
        fontSize: NORMAL_FONT_SIZE,
        alignment: 'center',
      },
      commentCellTitleStyle: {
        fontSize: NORMAL_FONT_SIZE,
        lineHeight: 1.2,
        margin: [0, 2, 0, 1],
        bold: true,
      },
      commentCellStyle: {
        fontSize: NORMAL_FONT_SIZE,
        lineHeight: 1.2,
        margin: [0, 2, 0, 1],
      },
      cellStyleRight: {
        fontSize: NORMAL_FONT_SIZE,
        alignment: 'right',
      },
      cellStyleBoldGray: {
        fontSize: NORMAL_FONT_SIZE,
        bold: true,
        fillColor: '#eaeaea',
      },
      cellStyleCenterBoldGray: {
        fontSize: NORMAL_FONT_SIZE,
        alignment: 'center',
        bold: true,
        fillColor: '#eaeaea',
      },
      cellStyleRightBoldGray: {
        fontSize: NORMAL_FONT_SIZE,
        alignment: 'right',
        bold: true,
        fillColor: '#eaeaea',
      },
      cellBottomMargin: {
        margin: [0, 0, 0, 10],
      },
      cellBottomRightMargin: {
        margin: [0, 0, 10, 10],
      },
    },
  });
}

export function footer(landscape, timestamp) {
  return (currentPage, pageCount) => ({
    style: 'header',
    table: {
      widths: [landscape ? 385 : 260, landscape ? 385 : 260],
      body: [
        [
          {text: timestamp, border: BORDER.TOP, style: 'footerLeft'},
          {text: `Page ${currentPage.toString()} of ${pageCount}`, border: BORDER.TOP, style: 'footerRight'},
        ],
      ],
    },
    layout: styles().GRAY_BORDERS,
  });
}

export function header(title, clientName, id, landscape) {
  return currentPage => ({
    style: 'header',
    table: {
      widths: [175, landscape ? 400 : 210, 175],
      body: [
        [
          {text: currentPage > 1 ? clientName : '', border: BORDER.UNDERLINE, style: 'headerLeftSideItem'},
          {text: title, border: BORDER.UNDERLINE},
          {text: currentPage > 1 ? id : '', border: BORDER.UNDERLINE, style: 'headerRightSideItem'},
        ],
      ],
    },
    layout: styles().GRAY_BORDERS,
  });
}

export default generateReport;
