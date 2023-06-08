import numeral from 'numeral';
import moment from 'moment';
import {allowanceDefinitions as definition, allowanceTimeTypes} from '../constants';

function minutes(item) {
  return item.get('minutes');
}

function reduceMinutes(items) {
  return items.map(x => x.get('minutes')).reduce((x, y) => x + y);
}

function formatMinutes(time) {
  if (time === '') return '';
  return `${numeral(time).format('0.00')} m`;
}

function formatPercent(time) {
  if (time === '') return '';
  return `${numeral(time).format('0.00')} %`;
}

function generateRow(name, definition, total, subtotal, percent) {
  return [
    {text: name, border: [false, false, false, false], style: 'cellBottomRightMargin'},
    {text: definition, border: [false, false, false, false], style: 'cellBottomMargin'},
    {text: formatMinutes(total), border: [false, false, false, false], style: 'cellStyleRight'},
    {text: formatMinutes(subtotal), border: [false, false, false, false], style: 'cellStyleRight'},
    {text: formatPercent(percent), border: [false, false, false, false], style: 'cellStyleRight'},
  ];
}

function generateAllowanceInfoRow(item1, item1Value) {
  return [
    {text: item1, style: 'cellTitleStyle'},
    {text: item1Value, style: 'cellStyleRight'},
  ];
}

export function generate(props, footer, header, styles, timestamp) {
  const {allowance, allowanceTimes, clientName} = props;
  const unpaidItems = allowanceTimes.filter(x => x.get('type') === allowanceTimeTypes.UNPAID);
  const excludedPaidItems = allowanceTimes.filter(x => x.get('type') === allowanceTimeTypes.EXCLUDED_PAID);
  const includedPaidScheduledItems = allowanceTimes.filter(x => x.get('type') === allowanceTimeTypes.INCLUDED_PAID_SCHEDULED);
  const includedPaidUnscheduledItems = allowanceTimes.filter(x => x.get('type') === allowanceTimeTypes.INCLUDED_PAID_UNSCHEDULED);
  const includedPaidOtherItems = allowanceTimes.filter(x => x.get('type') === allowanceTimeTypes.INCLUDED_PAID_OTHER);
  const currentTimestamp = timestamp ?? moment().format('YYYY-MM-DD hh:mm:ss A');

  const summaryRows = [];
  summaryRows.push(generateAllowanceInfoRow('Calculated PF&D Allowance Factor', formatPercent(allowance.allowanceFactor)));
  summaryRows.push(generateAllowanceInfoRow('Allowance Percent', formatPercent(allowance.allowancePercent)));
  summaryRows.push(generateAllowanceInfoRow('Incentive Opportunity Allowance', formatPercent(allowance.machineAllowancePercent)));

  const allowanceItems = [
    [{text: 'Allowance Category', border: [false, false, false, true], style: 'tableHeader'},
      {text: 'Definition', border: [false, false, false, true], style: 'tableHeader'},
      {text: 'Total Min', border: [false, false, false, true], style: 'tableHeaderRight'},
      {text: 'Subtotal Min', border: [false, false, false, true], style: 'tableHeaderRight'},
      {text: '%', border: [false, false, false, true], style: 'tableHeaderRight'}],
  ];

  allowanceItems.push(generateRow('Unpaid Time', definition.UNPAID_TIME, reduceMinutes(unpaidItems), '', ''));
  unpaidItems.forEach(x => allowanceItems.push(generateRow(x.get('name'), x.get('definition') || '', '', minutes(x), '')));

  allowanceItems.push(generateRow('Paid Time', definition.PAID_TIME, allowance.paidTimeMinutes, '', ''));
  allowanceItems.push(generateRow('Excluded Paid Time', definition.EXCLUDED_PAID_TIME, allowance.totalExcludedPaidTimeMinutes, '', ''));
  allowanceItems.push(generateRow('Excluded Paid Breaks', definition.EXCLUDED_PAID_BREAKS, '', allowance.excludedPaidBreaksMinutes, ''));
  excludedPaidItems.forEach(x => allowanceItems.push(generateRow(x.get('name'), x.get('definition') || '', '', minutes(x), '')));

  allowanceItems.push(generateRow('Adjusted Paid Time', definition.ADJUSTED_PAID_TIME, allowance.adjustedPaidTime, '', ''));
  allowanceItems.push(generateRow('Relief Time', definition.RELIEF_TIME, allowance.reliefTimeMinutes, '', ''));
  allowanceItems.push(generateRow('Total Included Paid Time', definition.TOTAL_INCLUDED_PAID, allowance.totalIncludedPaidTimeMinutes, '', allowance.totalIncludedPaidTimePercent));

  allowanceItems.push(generateRow('Included Paid Time', 'Scheduled', reduceMinutes(includedPaidScheduledItems) + allowance.includedPaidBreaksMinutes, '', ''));
  allowanceItems.push(generateRow('Included Paid Breaks', definition.INCLUDED_PAID_BREAKS, '', allowance.includedPaidBreaksMinutes, ''));
  includedPaidScheduledItems.forEach(x => allowanceItems.push(generateRow(x.get('name'), x.get('definition') || '', '', minutes(x), '')));

  allowanceItems.push(generateRow('Included Paid Time', 'Unscheduled', reduceMinutes(includedPaidUnscheduledItems), '', ''));
  includedPaidUnscheduledItems.forEach(x => allowanceItems.push(generateRow(x.get('name'), x.get('definition') || '', '', minutes(x), '')));

  allowanceItems.push(generateRow('Included Paid Time', 'Other Activities Not Included in Labor Standards', reduceMinutes(includedPaidOtherItems), '', ''));
  includedPaidOtherItems.forEach(x => allowanceItems.push(generateRow(x.get('name'), x.get('definition') || '', '', minutes(x), '')));

  allowanceItems.push(generateRow('Rest Time Allowed', definition.REST_TIME, allowance.totalRestTimeAllowedMinutes, '', allowance.totalRestTimeAllowedPercent));
  allowanceItems.push(generateRow('Included Paid Breaks', definition.INCLUDED_PAID_BREAKS, '', allowance.includedPaidBreaksMinutes, ''));
  allowanceItems.push(generateRow('Excluded Paid Breaks', definition.EXCLUDED_PAID_BREAKS, '', allowance.excludedPaidBreaksMinutes, ''));
  allowanceItems.push(generateRow('Total Included + Excluded Time', '', '', allowance.totalIncludedAndExcludedPaidBreaksMinutes, ''));
  allowanceItems.push(generateRow('Rest Offset Minutes', definition.REST_OFFSET_MINUTES, '', allowance.restOffsetMinutes, ''));
  allowanceItems.push(generateRow('Total Rest Minutes', definition.TOTAL_REST_MINUTES, '', allowance.totalRestMinutes, ''));
  allowanceItems.push(generateRow('Total Rest Time', definition.TOTAL_REST_TIME, allowance.totalRestTimeMinutes, '', allowance.totalRestTimePercent));
  allowanceItems.push(generateRow('Delay Time', definition.DELAY_TIME, allowance.totalDelayTimeMinutes, '', allowance.totalDelayTimePercent));
  allowanceItems.push(generateRow('Minor Unavoidable Delay', '', allowance.minorUnavoidableDelayMinutes, '', allowance.minorUnavoidableDelayPercent));
  allowanceItems.push(generateRow('Additional Delay', definition.ADDITIONAL_DELAY, allowance.additionalDelayMinutes, '', allowance.additionalDelayPercent));
  allowanceItems.push(generateRow('Allowance Percent', definition.ALLOWANCE_PERCENT, '', '', allowance.allowancePercent));
  allowanceItems.push(generateRow('Calculated PR&D Allowance Factor', definition.ALLOWANCE_FACTOR, '', '', allowance.allowanceFactor));
  allowanceItems.push(generateRow('Incentive Opportunity Allowance', definition.INCENTIVE_OPPORTUNITY_ALLOWANCE, '', '', allowance.machineAllowancePercent));

  const report = {
    pageOrientation: 'landscape',
    footer: footer(true),
    header: header('Allowance Detail Report', clientName || '', allowance.name, true),
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
                  [{text: clientName || '', border: [true, false, false, false], style: 'title'}],
                  [{text: currentTimestamp, border: [true, false, false, false]}],
                ],
              },
              layout: styles().DOUBLE_BORDER,
            }],
            [{
              style: 'topTable',
              table: {
                widths: [65, '*'],
                body: [
                  [{text: 'Name:', border: [true, false, false, false], style: 'title'},
                    {text: allowance.name || '', border: [false, false, false, false], style: 'title'}],
                ],
              },
              layout: styles().DOUBLE_BORDER,
            }],
          ]],
        },
        layout: styles().ZERO_BORDERS,
      },
      {
        style: 'table',
        table: {
          body: [
            [{
              style: 'table',
              table: {
                body: [
                  [{text: 'SUMMARY', border: [true, false, false, false], style: 'title'}],
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
          widths: [160, 40, '*'],
          body: summaryRows,
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
        },
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
                  [{text: 'DETAILS', border: [true, false, false, false], style: 'title'}],
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
        style: 'subtable',
        table: {
          headerRows: 1,
          widths: [140, 380, 70, 70, 50, '*'],
          body: allowanceItems},
      },
    ],
    styles: styles().STYLES,
  };
  return report;
}

export default generate;
