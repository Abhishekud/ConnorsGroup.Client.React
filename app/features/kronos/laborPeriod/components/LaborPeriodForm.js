import React, {PureComponent, Fragment} from 'react';
import {ControlLabel, Grid, Row, Col, Button} from 'react-bootstrap';
import {Map} from 'immutable';
import {PropTypes} from 'prop-types';
import {partial} from 'lodash';
import {
  Select,
  TextInput,
  withAutoFocusOnEdit,
  HiddenSubmitButton,
  CheckBox,
  Time,
  TimeOffset,
} from '../../../forms/components';
import {KRONOS_DAY_SELECT_OPTIONS} from '../../constants/KronosDays';
import {
  KRONOS_TRAFFIC_PATTERN_SELECT_OPTIONS,
  KRONOS_TRAFFIC_PATTERN_ENUM_INDEX,
} from '../../constants/KronosTrafficPatterns';
import {
  KRONOS_LABOR_DISTRIBUTION_SELECT_OPTIONS,
  KRONOS_LABOR_DISTRIBUTION_ENUM_INDEX,
} from '../../constants/KronosLaborDistributionTypes';
import {
  KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX,
  KRONOS_LABOR_PERIOD_TYPE_SELECT_OPTIONS,
} from '../../constants/KronosLaborPeriodTypes';

const step = {hour: 1, minute: 15};

function AbsoluteHours({model, formValidationErrors, onRemoveAbsoluteHoursRow, onAddAbsoluteHoursRow, onAbsoluteHoursChange, disabled}) {
  return (
    <Fragment>
      <ControlLabel>Absolute Hours</ControlLabel>
      <Grid style={{width: '100%'}}>
        <Row>
          <Col smOffset={1} sm={3}>Day</Col>
          <Col sm={4}>Start</Col>
          <Col sm={4}>End</Col>
        </Row>
        {model.get('laborPeriodDays').map((period, i) => (
          <Row key={i}>
            {!disabled && <Col sm={1}>
              <Button bsStyle="default" className="delete" bsSize="small" onClick={partial(onRemoveAbsoluteHoursRow, i)}>
                <i className="fa fa-trash" title="Delete" />
              </Button>
            </Col>}
            <Col sm={3}>
              <Select id={`day_${i}`} value={period.get('day')} options={KRONOS_DAY_SELECT_OPTIONS} onChange={onAbsoluteHoursChange} formValidationErrors={formValidationErrors} />
            </Col>
            <Col sm={4}>
              <Time id={`timeField1_${i}`}
                value={period.get('timeField1')}
                formValidationErrors={formValidationErrors} onChange={onAbsoluteHoursChange}
                step={step} />
            </Col>
            <Col sm={4}>
              <Time id={`timeField2_${i}`}
                value={period.get('timeField2')}
                formValidationErrors={formValidationErrors} onChange={onAbsoluteHoursChange}
                step={step} />
            </Col>
          </Row>
        ))}
        {!disabled && <Row>
          <Col sm={12}>
            <Button bsStyle="default" bsSize="small" onClick={onAddAbsoluteHoursRow}>
              <i className="fa fa-plus" title="Add" />
            </Button>
          </Col>
        </Row>}
      </Grid>
    </Fragment>
  );
}

function OperationHours({model, formValidationErrors, onAddOperationHoursRow, onRemoveOperationHoursRow, onOperationHoursChange, disabled}) {
  return (
    <Fragment>
      <ControlLabel>Hours of Operation</ControlLabel>
      <Grid style={{width: '100%'}}>
        <Row>
          <Col smOffset={1} sm={11}>Day</Col>
        </Row>
        {model.get('laborPeriodDays').map((period, i) => (
          <Row key={i}>
            {!disabled && <Col sm={1}>
              <Button bsStyle="default" className="delete" bsSize="small" onClick={partial(onRemoveOperationHoursRow, i)}>
                <i className="fa fa-trash" title="Delete" />
              </Button>
            </Col>}
            <Col sm={11}><Select id={`day_${i}`} value={period.get('day')} options={KRONOS_DAY_SELECT_OPTIONS} onChange={onOperationHoursChange} formValidationErrors={formValidationErrors} /></Col>
          </Row>
        ))}
        {!disabled && <Row>
          <Col sm={12}>
            <Button bsStyle="default" bsSize="small" onClick={onAddOperationHoursRow}>
              <i className="fa fa-plus" title="Add" />
            </Button>
          </Col>
        </Row>}
      </Grid>
    </Fragment>
  );
}

function AfterOpenHours({model, formValidationErrors, onRemoveAfterOpenHoursRow, onAddAfterOpenHoursRow, onAfterOpenHoursChange, disabled}) {
  const offsetMinValue = new Map({hour: -11, minute: 45});
  const offsetMaxValue = new Map({hour: 12, minute: 0});

  const durationMinValue = new Map({hour: 0, minute: 0});
  const durationMaxValue = new Map({hour: 12, minute: 0});

  return (
    <Fragment>
      <ControlLabel>After Open Hours</ControlLabel>
      <Grid style={{width: '100%'}}>
        <Row>
          <Col smOffset={1} sm={3}>Day</Col>
          <Col sm={4}>Offset</Col>
          <Col sm={4}>Duration</Col>
        </Row>
        {model.get('laborPeriodDays').map((period, i) => (
          <Row key={i}>
            {!disabled && <Col sm={1}>
              <Button bsStyle="default" className="delete" bsSize="small" onClick={partial(onRemoveAfterOpenHoursRow, i)}>
                <i className="fa fa-trash" title="Delete" />
              </Button>
            </Col>}
            <Col sm={3}><Select id={`day_${i}`} value={period.get('day')} options={KRONOS_DAY_SELECT_OPTIONS} onChange={onAfterOpenHoursChange} formValidationErrors={formValidationErrors} /></Col>
            <Col sm={4}>
              <TimeOffset id={`timeField1_${i}`}
                value={period.get('timeField1')}
                formValidationErrors={formValidationErrors} onChange={onAfterOpenHoursChange}
                step={step} minValue={offsetMinValue} maxValue={offsetMaxValue} />
            </Col>
            <Col sm={4}>
              <TimeOffset id={`timeField2_${i}`}
                value={period.get('timeField2')}
                formValidationErrors={formValidationErrors} onChange={onAfterOpenHoursChange}
                step={step} minValue={durationMinValue} maxValue={durationMaxValue} />
            </Col>
          </Row>
        ))}
        {!disabled && <Row>
          <Col sm={12}>
            <Button bsStyle="default" bsSize="small" onClick={onAddAfterOpenHoursRow}>
              <i className="fa fa-plus" title="Add" />
            </Button>
          </Col>
        </Row>}
      </Grid>
    </Fragment>
  );
}

function AfterCloseHours({model, formValidationErrors, onRemoveAfterCloseHoursRow, onAddAfterCloseHoursRow, onAfterCloseHoursChange, disabled}) {
  const offsetMinValue = new Map({hour: -11, minute: 45});
  const offsetMaxValue = new Map({hour: 12, minute: 0});

  const durationMinValue = new Map({hour: 0, minute: 0});
  const durationMaxValue = new Map({hour: 12, minute: 0});

  return (
    <Fragment>
      <ControlLabel>After Close Hours</ControlLabel>
      <Grid style={{width: '100%'}}>
        <Row>
          <Col smOffset={1} sm={3}>Day</Col>
          <Col sm={3}>Offset</Col>
          <Col sm={3}>Duration</Col>
        </Row>
        {model.get('laborPeriodDays').map((period, i) => (
          <Row key={i}>
            {!disabled && <Col sm={1}>
              <Button bsStyle="default" className="delete" bsSize="small" onClick={partial(onRemoveAfterCloseHoursRow, i)}>
                <i className="fa fa-trash" title="Delete" />
              </Button>
            </Col>}
            <Col sm={3}><Select id={`day_${i}`} value={period.get('day')} options={KRONOS_DAY_SELECT_OPTIONS} onChange={onAfterCloseHoursChange} formValidationErrors={formValidationErrors} /></Col>
            <Col sm={4}>
              <TimeOffset id={`timeField1_${i}`}
                value={period.get('timeField1')}
                formValidationErrors={formValidationErrors} onChange={onAfterCloseHoursChange}
                step={step} minValue={offsetMinValue} maxValue={offsetMaxValue} />
            </Col>
            <Col sm={4}>
              <TimeOffset id={`timeField2_${i}`}
                value={period.get('timeField2')}
                formValidationErrors={formValidationErrors} onChange={onAfterCloseHoursChange}
                step={step} minValue={durationMinValue} maxValue={durationMaxValue} />
            </Col>
          </Row>
        ))}
        {!disabled && <Row>
          <Col sm={12}>
            <Button bsStyle="default" bsSize="small" onClick={onAddAfterCloseHoursRow}>
              <i className="fa fa-plus" title="Add" />
            </Button>
          </Col>
        </Row>}
      </Grid>
    </Fragment>
  );
}

function DistributeByPattern({model, formValidationErrors, onChange, onCheckboxChange}) {
  return (
    <Fragment>
      <TextInput id="volumeDriver" label="Volume Driver" onChange={onChange} value={model.get('volumeDriver')} formValidationErrors={formValidationErrors} />
      <TextInput id="genericCategory" label="Generic Category" onChange={onChange} value={model.get('genericCategory')} formValidationErrors={formValidationErrors} />
      <CheckBox label="Add Volume Across Days" onChange={onCheckboxChange} id="addVolumeAcrossDays" checked={model.get('addVolumeAcrossDays') || false} formValidationErrors={formValidationErrors} />
      <p>
        Instruct the system to accumulate data for all days that precede the first day in the labor period. <br />
        Example: Fleet Maintenance is done on Monday and Thursday. Add driver data from Friday
        through Monday to forecast for Monday. Add driver data from Tuesday through Thursday
        to forecast labor for Thursday.
      </p>
    </Fragment>
  );
}

function LaborDistributionOffset({model, formValidationErrors, onChange}) {
  const offsetMinValue = new Map({hour: 0, minute: 0});
  const offsetMaxValue = new Map({hour: 8, minute: 0});
  return (
    <Fragment>
      <TimeOffset id="laborDistributionOffset" label="Offset Amount"
        value={model.get('laborDistributionOffset', new Map({hour: '', minute: ''}))}
        formValidationErrors={formValidationErrors} onChange={onChange}
        step={step} minValue={offsetMinValue} maxValue={offsetMaxValue} />
    </Fragment>
  );
}

class LaborPeriodForm extends PureComponent {
  render() {
    const {
      primaryInputRef,
      onFieldChange,

      model,
      onSubmit,
      formValidationErrors,

      onCheckboxChange,

      onAbsoluteHoursFieldChange,
      onOperationHoursFieldChange,
      onAfterOpenHoursFieldChange,
      onAfterCloseHoursFieldChange,

      onAddAbsoluteHoursListItem,
      onAddOperationHoursListItem,
      onAddAfterOpenHoursListItem,
      onAddAfterCloseHoursListItem,

      onRemoveLaborPeriodListItem,

      disabled,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled}>
          <TextInput id="name" inputRef={primaryInputRef} label="Name" onChange={onFieldChange} value={model.get('name')} formValidationErrors={formValidationErrors} />
          <Select id="laborPeriodType" label="Labor Period Type" options={KRONOS_LABOR_PERIOD_TYPE_SELECT_OPTIONS} onChange={onFieldChange} value={model.get('laborPeriodType')} formValidationErrors={formValidationErrors} />
          {parseInt(model.get('laborPeriodType'), 10) === KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.ABSOLUTE_HOURS &&
            <AbsoluteHours
              model={model}
              formValidationErrors={formValidationErrors}
              onAbsoluteHoursChange={onAbsoluteHoursFieldChange}
              onRemoveAbsoluteHoursRow={onRemoveLaborPeriodListItem}
              onAddAbsoluteHoursRow={onAddAbsoluteHoursListItem} disabled={disabled} />}
          {parseInt(model.get('laborPeriodType'), 10) === KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.OPERATION_HOURS &&
            <OperationHours
              model={model}
              formValidationErrors={formValidationErrors}
              onOperationHoursChange={onOperationHoursFieldChange}
              onAddOperationHoursRow={onAddOperationHoursListItem}
              onRemoveOperationHoursRow={onRemoveLaborPeriodListItem} disabled={disabled} />}
          {parseInt(model.get('laborPeriodType'), 10) === KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.AFTER_OPEN_HOURS &&
            <AfterOpenHours
              model={model}
              formValidationErrors={formValidationErrors}
              onAfterOpenHoursChange={onAfterOpenHoursFieldChange}
              onAddAfterOpenHoursRow={onAddAfterOpenHoursListItem}
              onRemoveAfterOpenHoursRow={onRemoveLaborPeriodListItem} disabled={disabled} />}
          {parseInt(model.get('laborPeriodType'), 10) === KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.AFTER_CLOSE_HOURS &&
            <AfterCloseHours
              model={model}
              formValidationErrors={formValidationErrors}
              onAfterCloseHoursChange={onAfterCloseHoursFieldChange}
              onAddAfterCloseHoursRow={onAddAfterCloseHoursListItem}
              onRemoveAfterCloseHoursRow={onRemoveLaborPeriodListItem} disabled={disabled} />}

          <Select id="trafficPatternType" label="Traffic Pattern" options={KRONOS_TRAFFIC_PATTERN_SELECT_OPTIONS} onChange={onFieldChange} value={model.get('trafficPatternType')} formValidationErrors={formValidationErrors} />
          {parseInt(model.get('trafficPatternType'), 10) === KRONOS_TRAFFIC_PATTERN_ENUM_INDEX.DISTRIBUTE_TRAFFIC_PATTERN_COMPRESS &&
            <p>When Traffic Pattern Hours &gt; Labor Period Hours, Compress.</p>}
          {parseInt(model.get('trafficPatternType'), 10) === KRONOS_TRAFFIC_PATTERN_ENUM_INDEX.DISTRIBUTE_TRAFFIC_PATTERN_TRUNCATE &&
            <p>When Traffic Pattern Hours &gt; Labor Period Hours, Truncate.</p>}
          {(parseInt(model.get('trafficPatternType'), 10) === KRONOS_TRAFFIC_PATTERN_ENUM_INDEX.DISTRIBUTE_TRAFFIC_PATTERN_COMPRESS ||
            parseInt(model.get('trafficPatternType'), 10) === KRONOS_TRAFFIC_PATTERN_ENUM_INDEX.DISTRIBUTE_TRAFFIC_PATTERN_TRUNCATE) &&
            <DistributeByPattern model={model} formValidationErrors={formValidationErrors} onChange={onFieldChange} onCheckboxChange={onCheckboxChange} />}
          <Select id="laborDistributionType" label="Labor Distribution" options={KRONOS_LABOR_DISTRIBUTION_SELECT_OPTIONS} onChange={onFieldChange} value={model.get('laborDistributionType')} formValidationErrors={formValidationErrors} />
          {(parseInt(model.get('laborDistributionType'), 10) === KRONOS_LABOR_DISTRIBUTION_ENUM_INDEX.START_AFTER_LABOR_PERIOD ||
            parseInt(model.get('laborDistributionType'), 10) === KRONOS_LABOR_DISTRIBUTION_ENUM_INDEX.START_BEFORE_LABOR_PERIOD) &&
            <LaborDistributionOffset model={model} formValidationErrors={formValidationErrors} onChange={onFieldChange} />}
          <HiddenSubmitButton disabled={disabled} />
        </fieldset>
      </form>
    );
  }
}

LaborPeriodForm.propTypes = {
  model: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,

  onCheckboxChange: PropTypes.func,

  onAbsoluteHoursFieldChange: PropTypes.func,
  onOperationHoursFieldChange: PropTypes.func,
  onAfterOpenHoursFieldChange: PropTypes.func,
  onAfterCloseHoursFieldChange: PropTypes.func,

  onAddAbsoluteHoursListItem: PropTypes.func,
  onAddOperationHoursListItem: PropTypes.func,
  onAddAfterOpenHoursListItem: PropTypes.func,
  onAddAfterCloseHoursListItem: PropTypes.func,

  onRemoveLaborPeriodListItem: PropTypes.func,

  primaryInputRef: PropTypes.func.isRequired,
  formValidationErrors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.boolean,
};

export default withAutoFocusOnEdit()(LaborPeriodForm);
