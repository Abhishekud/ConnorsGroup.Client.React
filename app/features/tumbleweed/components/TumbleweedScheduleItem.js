import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router';

class TumbleweedScheduleItem extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEdit() {
    const {schedule, onEdit} = this.props;
    onEdit(schedule);
  }

  handleSkip() {
    const {schedule, onSkip} = this.props;
    onSkip(schedule);
  }

  handleConfirmResume() {
    const {schedule, onConfirmResume} = this.props;
    onConfirmResume(schedule);
  }

  handleDelete() {
    const {schedule, onConfirmDelete} = this.props;
    onConfirmDelete(schedule);
  }

  handleExport() {
    const {onManualExport, schedule} = this.props;
    onManualExport(schedule.get('scheduleType'));
  }

  render() {
    const {title, description, schedule, onManualExport, canEdit, canSkipResume, canExport, canDelete} = this.props;
    const hasSchedule = schedule !== null && schedule.get('readableCrontab') !== null;

    return (
      <>
        <h4>{title}</h4>
        {description}
        <div className="item-label">Export Schedule</div>
        {!hasSchedule && <div>No Schedule Set</div>}
        {hasSchedule && <div>{schedule.get('readableCrontab')}</div>}
        {hasSchedule && schedule.get('lastOccurrence') &&
          <>
            <div className="item-label">Last Export</div>
            <div>{schedule.get('lastOccurrence')} (<Link to={`/export-scheduler/scheduling/logs/${schedule.get('scheduleType')}`}>View Logs</Link>)</div>
          </>
        }
        {!hasSchedule && schedule.get('lastOccurrence') &&
          <>
            <div className="item-label">Last Export</div>
            <div>{schedule.get('lastOccurrence')} (<Link to={`/export-scheduler/scheduling/logs/${schedule.get('scheduleType')}`}>View Logs</Link>)</div>
          </>
        }
        {hasSchedule && schedule.get('pauseFrom') &&
          <>
            <div className="item-label">Export Scheduled Paused</div>
            <div>{schedule.get('skipMessage')}</div>
            {canSkipResume && <Button bsStyle="link" onClick={this.handleConfirmResume}>Resume Schedule</Button>}
          </>
        }
        {hasSchedule && schedule.get('nextOccurrence') &&
          <>
            <div className="item-label">Next Scheduled Export</div>
            <div>{schedule.get('nextOccurrence')}</div>
          </>
        }
        <div className="action-buttons">
          {hasSchedule &&
            <>
              {canEdit && <Button className="schedule-button" onClick={this.handleEdit}>Edit</Button>}
              {canSkipResume && <Button className="schedule-button" onClick={this.handleSkip}>Skip</Button>}
              {canDelete && <Button className="schedule-delete-button" onClick={this.handleDelete}>
                <i className="fa fa-trash-o" title="Delete" />
              </Button>}
            </>
          }
          {!hasSchedule &&
            <Button className="schedule-button" onClick={this.handleEdit}>Set Schedule</Button>
          }
          {canExport && onManualExport && <Button className="schedule-button padded" onClick={this.handleExport}>Export</Button>}
        </div>
      </>
    );
  }
}

export default TumbleweedScheduleItem;
