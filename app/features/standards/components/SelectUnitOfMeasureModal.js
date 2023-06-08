import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal, DropdownHeaderComponent, NoElementListComponent} from '../../shared/components';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../../unitsOfMeasure/selectors/modals/create';
import {
  showSelector as showSelectModalSelector,
  selectedUnitOfMeasureSelector,
} from '../selectors/modals/select';
import {
  showSelectUnitOfMeasure,
  cancelSelectUnitOfMeasure,
  selectUnitOfMeasureForElement,
  setStandardElementEditorProperty,
} from '../actions';
import {
  cancelCreateUnitOfMeasure,
  createUnitOfMeasure,
  selectUnitOfMeasure,
  setCreateUnitOfMeasureModelProperty,
  loadUnitOfMeasureSelectListOptions,
  showCreateUnitOfMeasure,
} from '../../unitsOfMeasure/actions';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {ACTIVE_STATUSES} from '../../selectListOptions/constants/selectListTypes';
import {SelectDropdownWithFilter} from '../../forms/components';
import {makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector} from '../../unitsOfMeasure/selectors/selectListOptions';
import {departmentIdSelector} from '../selectors/sidebars/standardDetails';
import CreateUnitOfMeasureModal from '../../unitsOfMeasure/components/CreateUnitOfMeasureModal';
import {Tooltip} from '@progress/kendo-react-tooltip';

class SelectUnitOfMeasureModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: false,
      uom: '',
    };
    autoBind(this);
    this.uomTooltipRef = React.createRef();
  }

  componentDidMount() {
    const {cancelSelectUnitOfMeasure, cancelCreateUnitOfMeasure, showSelectModal} = this.props;
    if (showSelectModal) {
      cancelSelectUnitOfMeasure();
    } else {
      cancelCreateUnitOfMeasure();
    }
  }

  componentDidUpdate(prevProps) {
    const {selectedUnitOfMeasure} = this.props;
    if (prevProps.selectedUnitOfMeasure !== selectedUnitOfMeasure) {
      this.setUoM(selectedUnitOfMeasure);
    }
  }

  setUoM(selectedUnitOfMeasure) {
    this.setState({error: false, uom: selectedUnitOfMeasure});
  }

  handleFieldChange(event) {
    const {value} = event.target;
    this.setState({error: false, uom: value});
    this.props.selectUnitOfMeasureForElement(value);
  }

  handleSave(event) {
    event.preventDefault();
    const {selectedUnitOfMeasure, onSaveUoM, cancelSelectUnitOfMeasure} = this.props;
    if (!selectedUnitOfMeasure) {
      this.setState({error: true});
      return;
    }
    this.setState({error: false});
    cancelSelectUnitOfMeasure();
    onSaveUoM();
  }

  handleCancel() {
    const {cancelSelectUnitOfMeasure, cancelCreateUnitOfMeasure, showSelectModal} = this.props;
    this.setState({error: false, uom: ''});
    if (showSelectModal) {
      cancelSelectUnitOfMeasure();
    } else {
      cancelCreateUnitOfMeasure();
    }
  }

  handleFilterChange(event) {
    this.props.setStandardElementEditorProperty('standardElementUOMFilterValue', event.filter.value);
  }

  listNoDataRender() {
    return (<NoElementListComponent />);
  }

  handleShowCreateUnitOfMeasureModal() {
    const {showCreateUnitOfMeasure, cancelSelectUnitOfMeasure, departmentId} = this.props;
    showCreateUnitOfMeasure(departmentId);
    cancelSelectUnitOfMeasure();
  }

  returnTooltip() {
    if (!this.props.selectedUnitOfMeasure) {
      return <span>Unit of Measure is required</span>;
    }
    return null;
  }

  render() {
    const {saving, show, validationErrors, unitsOfMeasure, showSelectModal, showSelectUnitOfMeasure} = this.props;
    const dropdownHeaderComponent = <DropdownHeaderComponent onClick={this.handleShowCreateUnitOfMeasureModal} />;
    const form = <Tooltip open={this.state.error} parentTitle position="bottom" anchorElement="target" targetElement={this.uomTooltipRef.current} content={this.returnTooltip}>
      <div id="uom-dropdown-holder" title="error" ref={this.uomTooltipRef}>
        <SelectDropdownWithFilter
          aria-required="true"
          title="Unit of Measure"
          id={`unitOfMeasureId${unitsOfMeasure.value}`} formGroupClassName="unit-of-measure"
          disabled={false} name="unitOfMeasureId"
          value={this.state.uom} onChange={this.handleFieldChange}
          formValidationErrors={validationErrors}
          options={unitsOfMeasure}
          clearButton={false}
          listNoDataRender={this.listNoDataRender}
          onFilterChange={this.handleFilterChange}
          header={dropdownHeaderComponent} />
      </div></Tooltip>;

    const createForm =
      <CreateUnitOfMeasureModal handleToggleCreateUnitOfMeasure={this.toggleCreateUnitOfMeasure} disableActiveStatus showChildModal={showSelectUnitOfMeasure} />;

    let showModal = true;
    let showForm;
    if (showSelectModal) {
      showForm = form;
    } else if (show) {
      showForm = createForm;
    } else {
      showModal = false;
    }
    return (
      <CreateEditModal
        show={showModal}
        saving={saving}
        title="Select or Create New Unit of Measure"
        form={showForm}
        onCancel={this.handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  const activeStatusesSelector = makeSelectListOptionsArraySelector(ACTIVE_STATUSES);
  const unitOfMeasureOptions = makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector(state);
  const departmentId = departmentIdSelector(state);

  return {
    saving: savingSelector(state),
    showSelectModal: showSelectModalSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    activeStatuses: activeStatusesSelector(state),
    unitsOfMeasure: unitOfMeasureOptions(departmentId),
    departmentId,
    selectedUnitOfMeasure: selectedUnitOfMeasureSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    cancelCreateUnitOfMeasure,
    setCreateUnitOfMeasureModelProperty,
    createUnitOfMeasure,
    selectUnitOfMeasure,
    loadUnitOfMeasureSelectListOptions,
    showCreateUnitOfMeasure,
    showSelectUnitOfMeasure,
    cancelSelectUnitOfMeasure,
    setStandardElementEditorProperty,
    selectUnitOfMeasureForElement,
  }
)(SelectUnitOfMeasureModal));
