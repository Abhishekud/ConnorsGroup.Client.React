import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import pluralize from 'pluralize';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {TOOLTIP_OPEN_DELAY} from '../../shared/constants/tooltipOpenDelay';
import formatTotalLaborHours from '../../shared/services/formatTotalLaborHours';

export default function DashboardStats({model, departmentName, locationName, showTotalLaborHoursStats, activeBackgroundJobs, isTotalLaborHoursLoading}) {

  function getToolTipText(model, activeBackgroundJobs, isTotalLaborHoursLoading) {
    if (activeBackgroundJobs) return 'Calculation in progress';
    else if (isTotalLaborHoursLoading) return 'Loading Total Labor Hours';
    return model.get('totalLaborHours');
  }

  const tooltipContent = useCallback(() =>
    getToolTipText(model, activeBackgroundJobs, isTotalLaborHoursLoading)
  , [model, activeBackgroundJobs, isTotalLaborHoursLoading]);

  const totalLaborHoursContent =
    <><div className="dashboard-stat-border" /><div className="dashboard-stat">
      <Tooltip openDelay={TOOLTIP_OPEN_DELAY} position="top" anchorElement="target" content={tooltipContent} parentTitle>
        <div className="dashboard-stat-item" title={'Total Hours'}>
          <div className="stat-number">
            {activeBackgroundJobs || isTotalLaborHoursLoading
              ? <i className="fa fa-spinner fa-spin" />
              : formatTotalLaborHours(model.get('totalLaborHours'))}
          </div>
        </div>
      </Tooltip>
      <div className="stat-name"> Total Hours</div>
    </div></>;

  return (
    <div className="dashboard-stats">
      <div className="dashboard-stat">
        <div className="dashboard-stat-item">
          <div className="stat-number">{model.get('locationCount')}</div>
        </div>
        <div className="stat-name">{model.get('locationCount') === 1 ? locationName : pluralize.plural(locationName)}</div>
      </div>
      <div className="dashboard-stat-border" />
      <div className="dashboard-stat">
        <div className="dashboard-stat-item">
          <div className="stat-number">{model.get('departmentCount')}</div>
        </div>
        <div className="stat-name"> {model.get('departmentCount') === 1 ? departmentName : pluralize.plural(departmentName)}</div>
      </div>
      <div className="dashboard-stat-border" />
      <div className="dashboard-stat">
        <div className="dashboard-stat-item">
          <div className="stat-number">{model.get('standardCount')}</div>
        </div>
        <div className="stat-name"> {model.get('standardCount') === 1 ? 'Standard' : 'Standards'}</div>
      </div>
      {showTotalLaborHoursStats && totalLaborHoursContent}
    </div>
  );
}

DashboardStats.propTypes = {
  model: PropTypes.object,
  departmentName: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
  showTotalLaborHoursStats: PropTypes.bool.isRequired,
  activeBackgroundJobs: PropTypes.bool.isRequired,
  isTotalLaborHoursLoading: PropTypes.bool.isRequired,
};
