import React from 'react';
import {PropTypes} from 'prop-types';
import {Map} from 'immutable';
import {Grid, Row, Col} from 'react-bootstrap';
import {Date, HiddenSubmitButton} from '../../forms/components';
import moment from 'moment';

export default function SkipScheduleForm({
  saving, schedule, model, validationErrors, onSubmit, onPauseUntilChanged, onPauseFromChanged,
}) {
  return (
    <div className="tumbleweed-scheduling-form">
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving}>
          {schedule.get('nextOccurrence') &&
            <>
              <div className="item-label">Next Scheduled Export</div>
              <div>{schedule.get('nextOccurrence')}</div>
            </>
          }
          <Grid style={{width: '100%', padding: 0, marginTop: '24px'}}>
            <Row pa>
              <Col sm={4}>
                <Date id="pauseFrom" label="Pause Export From" onChange={onPauseFromChanged}
                  value={model.get('pauseFrom') ? moment(model.get('pauseFrom')) : null}
                  formValidationErrors={validationErrors} disabled={saving} />
              </Col>
              <Col sm={4}>
                <Date id="pauseUntil" label="Pause Export Until" onChange={onPauseUntilChanged}
                  value={model.get('pauseUntil') ? model.get('pauseUntil') : null}
                  formValidationErrors={validationErrors} disabled={saving} />
              </Col>
            </Row>
          </Grid>
          <HiddenSubmitButton />
        </fieldset>
      </form>
    </div>
  );
}

SkipScheduleForm.propTypes = {
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  schedule: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onPauseFromChanged: PropTypes.func.isRequired,
  onPauseUntilChanged: PropTypes.func.isRequired,
};
