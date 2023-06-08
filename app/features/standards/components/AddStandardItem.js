import classNames from 'classnames';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';
import {Map, List} from 'immutable';
import {handleApiError, toastr} from '../../shared/services';
import {INLINE, STANDALONE} from '../constants/addStandardItemStyles';
import {Button, ControlLabel} from 'react-bootstrap';
import {TextInput, NumericInput} from '../../forms/components';
import EMPTY_VALIDATION_ERROR from '../../forms/constants/emptyValidationError';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {ListItemInsertBar} from '../../shared/components';
import {Popup} from '@progress/kendo-react-popup';

const INITIAL_STATE = {
  elementId: '',
  groupName: '',
  validationErrors: Map(),
  error: false,
};

const anchorAlign = {
  horizontal: 'right',
  vertical: 'bottom',
};

const popupAlign = {
  horizontal: 'right',
  vertical: 'top',
};

class AddStandardItem extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);

    this.state = Object.assign({}, INITIAL_STATE);
    this.elementIdTooltipRef = React.createRef();
  }

  handleKeyUp(event) {
    const {disabled} = this.props;
    if (disabled) return;

    const {keyCode} = event;

    switch (keyCode) {
      case 27: {
        this.handleClose();
        break;
      }

      case 13: {
        const {name, value} = event.target;
        if (!value) return;

        if (name === 'elementId') {
          this.handleAddElementById();
        } else if (name === 'groupName') {
          this.handleAddStandardElementGroup();
        }
        break;
      }
    }
  }

  handleFieldChange(event) {
    const {name, value} = event.target;

    this.setState({[name]: value, error: false});
  }

  handleAddElementById() {
    const {getElementForStandard, insertAtIndex, standardElementGroupId, router} = this.props;
    const {elementId, validationErrors} = this.state;
    getElementForStandard(elementId, insertAtIndex, standardElementGroupId).then(response => {
      this.setState(Object.assign({}, INITIAL_STATE));
      return response;
    }).catch(error => {
      const {status} = error.response || {};
      if (status === 404) {
        this.setState({validationErrors: validationErrors.set('elementId', List([EMPTY_VALIDATION_ERROR])), error: true});
      } else if (status === 400) {
        const errorResponse = error.response.data;
        if (errorResponse.elementIds) {
          for (const errors of errorResponse.elementIds) {
            toastr.error(errors, 'Error');
          }
        }
        if (error.response.data.unitOfMeasureId) {
          for (const errors of errorResponse.unitOfMeasureId) {
            toastr.error(errors, 'Error');
          }
        }
        return;
      } else {
        handleApiError(error, router, 'An error occurred while adding the Element to the Standard.');
      }
    });
  }

  handleAddElementsBySearch() {
    const {onAddElementsBySearch, insertAtIndex} = this.props;
    onAddElementsBySearch(insertAtIndex);
  }

  handleAddStandardElementGroup() {
    const {router, onCreateStandardElementGroup, insertAtIndex} = this.props;
    const {groupName, validationErrors} = this.state;

    onCreateStandardElementGroup(groupName, insertAtIndex)
      .then(response => {
        this.setState(Object.assign({}, INITIAL_STATE));
        return response;
      })
      .catch(error => {
        const {status} = error.response || {};

        if (status === 400) {
          this.setState({validationErrors: validationErrors.set('groupName', List([EMPTY_VALIDATION_ERROR]))});
        } else {
          handleApiError(error, router, 'An error occurred while adding the Standard Element Group to the Standard.');
        }
      });
  }

  handleCreateStandardElement() {
    const {onCreateStandardElement, insertAtIndex} = this.props;
    onCreateStandardElement(insertAtIndex);
  }

  handleBulkPasteStandardItems() {
    const {onBulkPasteStandardItems, insertAtIndex} = this.props;
    onBulkPasteStandardItems(insertAtIndex);
  }

  handleClose() {
    this.setState(Object.assign({}, INITIAL_STATE));

    const {closeable, onToggle} = this.props;
    if (!closeable) return;

    onToggle();
  }

  render() {
    const {
      autoFocus, insertAtIndex, style, collapsed, render, disabled, enableAddGroup, closeable,
      onToggle, showPasteButton} = this.props;

    /*
       disableWhenPasteUnavailable  - Is used to decide whether to keep the close button disabled  or enabled, based on the value of showPasteButton and closeable.
       Once we have selected & copied some standard items disabled is set to true, and showPasteButton is set to true since we now have copied items, inorder to allow paste button to be shown and everything else to be disabled we have added this variable.
    */
    const disableWhenPasteUnavailable = disabled && (!showPasteButton || !closeable);

    if (!render) return null;

    if (collapsed) {
      return (
        <ListItemInsertBar
          disabled={disabled && !showPasteButton}
          insertAtIndex={insertAtIndex} onClick={onToggle} />
      );
    }

    const {elementId, groupName, validationErrors, error} = this.state;

    const rootClassNames = classNames(
      'add-standard-item',
      {
        inline: style === INLINE,
        standalone: style === STANDALONE,
      });

    const addGroupComponent = (
      <div className="group-related">
        <ControlLabel className="add-label">Group:</ControlLabel>
        <TextInput
          id="groupName" placeholder="Group Name" disabled={disabled} maxLength={256}
          value={groupName} onChange={this.handleFieldChange}
          formValidationErrors={validationErrors}
          onKeyUp={this.handleKeyUp} />
        <Button bsStyle="link" disabled={disabled || !groupName} onClick={this.handleAddStandardElementGroup}>
          <i className="fa fa-check valid" />
        </Button>
      </div>
    );

    return (
      <div className={rootClassNames}>
        <div className="element-related">
          <ControlLabel className="add-label">Element:</ControlLabel>
          <div id="element-id" ref={this.elementIdTooltipRef}>
            <NumericInput
              id="elementId" placeholder="Existing Element ID" disabled={disabled}
              min={1} autoFocus={autoFocus}
              value={elementId} onChange={this.handleFieldChange}
              formValidationErrors={validationErrors}
              onKeyUp={this.handleKeyUp} />
            <Popup
              className="error-validation-popup"
              anchor={this.elementIdTooltipRef.current}
              anchorAlign={anchorAlign}
              popupAlign={popupAlign}
              show={error}>
              <span className="validation-error">Element ID does not exist</span>
            </Popup>
          </div>
          <Button bsStyle="link" disabled={disabled || !elementId} onClick={this.handleAddElementById}>
            <i className="fa fa-check" />
          </Button>
          <Button bsStyle="default" title="Search Elements List" disabled={disabled}
            onClick={this.handleAddElementsBySearch}>
            <i className="fa fa-search" />
          </Button>
          <Button
            bsStyle="default" title="New Standard Element" disabled={disabled}
            onClick={this.handleCreateStandardElement}>
            <i className="fa fa-plus" />
          </Button>
          {showPasteButton && <Button
            bsStyle="default" title="Paste Copied Standard Items"
            onClick={this.handleBulkPasteStandardItems}>
            Paste Copied
          </Button>
          }
        </div>

        {enableAddGroup ? <div className="or-divider">OR</div> : null}
        {enableAddGroup ? addGroupComponent : null}

        <Button onClick={this.handleClose} bsStyle="default" title="Cancel" disabled={disableWhenPasteUnavailable}>
          {closeable ? <i className="fa fa-times" /> : 'Clear'}
        </Button>
      </div>
    );
  }
}

AddStandardItem.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  insertAtIndex: PropTypes.number.isRequired,
  style: PropTypes.oneOf([INLINE, STANDALONE]).isRequired,
  render: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  closeable: PropTypes.bool.isRequired,
  enableAddGroup: PropTypes.bool.isRequired,
  onToggle: PropTypes.func,
  onAddElementsBySearch: PropTypes.func.isRequired,
  onCreateStandardElement: PropTypes.func.isRequired,
  onCreateStandardElementGroup: PropTypes.func,
  showPasteButton: PropTypes.bool.isRequired,
  getElementForStandard: PropTypes.func,
  standardElementGroupId: PropTypes.number,
};

export default withRouter(AddStandardItem);
