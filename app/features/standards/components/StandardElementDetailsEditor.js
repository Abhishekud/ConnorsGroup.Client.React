import {Map} from 'immutable';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import {FormattedTMUs, LinkWithTooltip, NoElementListComponent, DropdownHeaderComponent} from '../../shared/components';
import {TextInput, ToggleSwitch, SelectDropdownWithFilter} from '../../forms/components';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {MOST} from '../../elements/constants/elementTypes';

export default class StandardElementDetailsEditor extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {onFieldChange, standardElementId} = this.props;
    onFieldChange(standardElementId, event);
  }

  handleToggleComment() {
    const {onToggleComment, standardElementId} = this.props;
    onToggleComment(standardElementId);
  }
  handleShowCreateUnitOfMeasureModal() {
    const {standardElementId, onShowCreateUnitOfMeasure} = this.props;
    onShowCreateUnitOfMeasure(standardElementId);
  }
  listNoDataRender() {
    return (<NoElementListComponent />);
  }
  render() {
    const {
      disabled, machineAllowance,
      internal, frequencyFormula, normalTimeMeasurementUnits,
      timeFormat, validationErrors, commentCollapsed, commentEntered,
      unitsOfMeasure, standardElementId, onEditFormula, elementType, onFilterChange, canManageStandardList, hasBetaAccess,
    } = this.props;
    const unitOfMeasureId = this.props.unitOfMeasureId ? this.props.unitOfMeasureId.toString() : '';
    const commentIconClasses = classNames(
      'clickable', 'fa',
      {
        'fa-commenting-o': commentEntered && commentCollapsed,
        'fa-comment-o': !commentEntered && commentCollapsed,
        'fa-commenting': commentEntered && !commentCollapsed,
        'fa-comment': !commentEntered && !commentCollapsed,
      });

    const addOn = (<i className="fa fa-superscript" onClick={onEditFormula} />);

    const dropdownHeaderComponent = <DropdownHeaderComponent onClick={this.handleShowCreateUnitOfMeasureModal} />;

    return (
      <div className="details">
        <TextInput
          id={`frequencyFormula${standardElementId}`}
          name="frequencyFormula" formGroupClassName="frequency-formula" maxLength={2048}
          disabled={disabled} addOns={addOn}
          value={frequencyFormula} onChange={this.handleFieldChange}
          formValidationErrors={validationErrors} />

        <SelectDropdownWithFilter
          id={`unitOfMeasureId${standardElementId}`} formGroupClassName="unit-of-measure"
          disabled={disabled} name="unitOfMeasureId"
          value={unitOfMeasureId} onChange={this.handleFieldChange}
          formValidationErrors={validationErrors}
          options={unitsOfMeasure}
          clearButton={false}
          listNoDataRender={this.listNoDataRender}
          onFilterChange={onFilterChange}
          header={canManageStandardList ? dropdownHeaderComponent : false} />

        {hasBetaAccess && <LinkWithTooltip tooltip="Incentive Opportunity Allowance" href="#" id={`machine-allowance-tooltip-${standardElementId}`}>
          <div>
            <ToggleSwitch
              id="machineAllowance" disabled={disabled || (elementType === MOST)} checked={machineAllowance}
              onChange={this.handleFieldChange} />
          </div>
        </LinkWithTooltip>}

        <LinkWithTooltip tooltip="Internal" href="#" id={`internal-tooltip-${standardElementId}`}>
          <div>
            <ToggleSwitch
              id="internal" disabled={disabled} checked={internal}
              onChange={this.handleFieldChange} />
          </div>
        </LinkWithTooltip>

        <div className="comment-indicator">
          <i className={commentIconClasses} onClick={this.handleToggleComment} />
        </div>

        <div className="normal-time">
          <FormattedTMUs
            timeMeasurementUnits={normalTimeMeasurementUnits}
            timeFormat={timeFormat}
            formattedTMUsId={standardElementId} />
        </div>
      </div>
    );
  }
}

StandardElementDetailsEditor.propTypes = {
  disabled: PropTypes.bool.isRequired,
  standardElementId: PropTypes.number.isRequired,
  internal: PropTypes.bool.isRequired,
  machineAllowance: PropTypes.bool.isRequired,
  frequencyFormula: PropTypes.string.isRequired,
  unitOfMeasureId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  normalTimeMeasurementUnits: PropTypes.number.isRequired,
  timeFormat: PropTypes.string.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  commentCollapsed: PropTypes.bool.isRequired,
  commentEntered: PropTypes.bool.isRequired,
  onToggleComment: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  unitsOfMeasure: PropTypes.array.isRequired,
  onEditFormula: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
