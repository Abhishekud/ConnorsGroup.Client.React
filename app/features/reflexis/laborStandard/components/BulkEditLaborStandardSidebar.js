import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError} from '../../../shared/services';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../../layout/components';

import {loadSelectListOptions} from '../../../selectListOptions/actions';
import {REFLEXIS_ATTRIBUTES} from '../../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../../selectListOptions/selectors';
import {LaborStandardsBulkEditForm} from './';
import {
  filterSelector,
  allLaborStandardsSelectedSelector,
  selectedLaborStandardIdsSelector,
} from '../selectors/pages/list';
import {savingSelector, showSelector, dirtySelector, modelSelector, validationErrorsSelector} from '../selectors/sidebars/bulkEditLaborStandards';
import {
  setLaborStandardBulkEditModelProperty,
  cancelBulkEditLaborStandards,
  bulkUpdateLaborStandards,
} from '../actions';
import {makeCurrentUserHasPermissionSelector} from '../../../authentication/selectors/currentUser';
import {REFLEXIS_EDIT} from '../../../authentication/constants/permissions';


class BulkEditLaborStandardsSidebar extends React.Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadSelectListOptions, router} = this.props;
    loadSelectListOptions(REFLEXIS_ATTRIBUTES)
      .catch(error => handleApiError(error, router, 'Unable to load list of Reflexis attributes.'));
  }

  handleSave() {
    const {
      bulkUpdateLaborStandards,
      model,
      filter,
      selectedLaborStandardIds,
      allLaborStandardsSelected,
    } = this.props;
    bulkUpdateLaborStandards(selectedLaborStandardIds, model, filter, allLaborStandardsSelected)
      .then(response => {
        if (response.value.status === 200) {
          this.props.onBulkEdit();
        }
      });
  }

  handleCancel() {
    this.props.cancelBulkEditLaborStandards();
  }

  handleFieldChange(e) {
    const id = e.target.name || e.target.id;
    const value = typeof e.target.checked === 'undefined' ? e.target.value : e.target.checked;
    this.props.setLaborStandardBulkEditModelProperty(id, value);
  }

  render() {
    const {
      show,
      model,
      saving,
      dirty,
      canEdit,
      attributes,
      validationErrors,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="bulk-edit-reflexis-labor-standards-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing
          saving={saving}
          dirty={dirty}
          onEdit={this.handleSave}
          onCancel={this.handleCancel}
          onSave={this.handleSave}
          hasPermission={canEdit} />
        <div className="sidebar-scrollable">
          <SidebarSection title="Assign Reflexis Attribute" collapsible>
            <LaborStandardsBulkEditForm
              model={model}
              saving={saving}
              attributes={attributes}
              validationErrors={validationErrors}
              onCheckboxChange={this.handleFieldChange}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave}
              disabled={!canEdit || saving} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const attributesSelector = makeSelectListOptionsArrayWithBlankSelector(REFLEXIS_ATTRIBUTES);
  const canEditSelector = makeCurrentUserHasPermissionSelector(REFLEXIS_EDIT);

  return {
    show: showSelector(state),
    saving: savingSelector(state),
    canEdit: canEditSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    dirty: dirtySelector(state),
    attributes: attributesSelector(state),
    selectedLaborStandardIds: selectedLaborStandardIdsSelector(state),
    allLaborStandardsSelected: allLaborStandardsSelectedSelector(state),
    filter: filterSelector(state),
  };
}

const actions = {
  loadSelectListOptions,
  setLaborStandardBulkEditModelProperty,
  cancelBulkEditLaborStandards,
  bulkUpdateLaborStandards,
};

BulkEditLaborStandardsSidebar.propTypes = {
  show: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  validationErrors: PropTypes.array,
  dirty: PropTypes.bool.isRequired,
  attributes: PropTypes.array.isRequired,
  filter: PropTypes.object,

  // Actions
  loadSelectListOptions: PropTypes.func.isRequired,
  setLaborStandardBulkEditModelProperty: PropTypes.func.isRequired,
  cancelBulkEditLaborStandards: PropTypes.func.isRequired,
  bulkUpdateLaborStandards: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, actions)(BulkEditLaborStandardsSidebar));
