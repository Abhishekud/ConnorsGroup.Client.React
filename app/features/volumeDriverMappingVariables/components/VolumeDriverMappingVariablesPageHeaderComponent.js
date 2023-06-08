import React, {useCallback} from 'react';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {BulkEditButton} from '../../shared/components/buttons';
import {PropTypes} from 'prop-types';
import {exportDownloader} from '../../shared/services';
import {ClearFiltersButton, ClearSortsButton} from '../../customizableGrid/components';
import {useDispatch} from 'react-redux';
import {clearVolumeDriverMappingVariablesListFilters, clearVolumeDriverMappingVariablesListSorts} from '../actions';

export default function VolumeDriverMappingVariablesPageHeaderComponent({importStatus, onBulkEdit, onShowCreateVolumeDriverMappingVariables,
  onShowCreateVolumeDriverMappingSet, onShowImportVolumeDriverMappingVariables, departments, activeBackgroundJobs,
  selectedDepartmentId, hideClearFiltersButton, hideClearSortsButton, handleShowCreateExportAllRequest}) {

  const dispatch = useDispatch();

  const isDownloadTemplateDisabled = selectedDepartmentId === 0;
  const isExportDropdownDisabled = departments.length === 0 || activeBackgroundJobs;

  const handleExportImportTemplate = useCallback(() => {
    if (isDownloadTemplateDisabled) return;
    exportDownloader(`${process.env.API_BASE_URL}volume-driver-mapping-variables/import/template/${selectedDepartmentId}`);
  });

  const handleClearFilters = useCallback(() =>
    dispatch(clearVolumeDriverMappingVariablesListFilters())
  );

  const handleClearSorts = useCallback(() =>
    dispatch(clearVolumeDriverMappingVariablesListSorts())
  );

  return (
    <PageHeader>
      <PageHeaderActions />
      <PageTitle>Volume Driver Mapping Variables</PageTitle>
      <PageHeaderActions>
        <ClearFiltersButton hide={hideClearFiltersButton} onClear={handleClearFilters} />
        <ClearSortsButton hide={hideClearSortsButton} onClear={handleClearSorts} />
        {importStatus}
        {<BulkEditButton isVisible isOpen={false} onClick={onBulkEdit} disabled={false} />}
        <Dropdown id="export" className="header-button" pullRight disabled={isExportDropdownDisabled}>
          <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem eventKey="1" onClick={handleShowCreateExportAllRequest}>
              Export All Volume Driver Mapping Variables
            </MenuItem>
            <MenuItem eventKey="2" disabled={isDownloadTemplateDisabled} onClick={handleExportImportTemplate}>
              Download Volume Driver Mapping Variables Template
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown id="volumeDriverMappingVariables-list-actions" className="header-button" pullRight disabled={activeBackgroundJobs}>
          <Dropdown.Toggle noCaret>
            <i className="fa fa-plus" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem eventKey="2" onClick={onShowCreateVolumeDriverMappingVariables}>
              New Volume Driver Mapping Variable
            </MenuItem>
            <MenuItem eventKey="2" onClick={onShowCreateVolumeDriverMappingSet}>
              New Volume Driver Mapping Set
            </MenuItem>
            <MenuItem eventKey="3" onClick={onShowImportVolumeDriverMappingVariables}>
              Import Volume Driver Mapping Variables
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </PageHeaderActions>
    </PageHeader>
  );
}

VolumeDriverMappingVariablesPageHeaderComponent.propTypes = {
  onBulkEdit: PropTypes.func,
  onShowCreateVolumeDriverMappingVariables: PropTypes.func,
  onShowCreateVolumeDriverMappingSet: PropTypes.func,
  onShowImportVolumeDriverMappingVariables: PropTypes.func,
};
