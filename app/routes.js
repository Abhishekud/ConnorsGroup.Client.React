import App from './App';
import allowanceRoutes from './features/allowances/routes';
import allowanceRestRoutes from './features/allowanceRests/routes';
import authenticationRoutes from './features/authentication/routes';
import {Authorize} from './features/authentication/components';
import classificationsRoutes from './features/classifications/routes';
import {DashboardPage} from './features/dashboard/components';
import dashboardRoutes from './features/dashboard/routes';
import disableAccountRoutes from './features/disableAccount/routes';
import laborCategoryRoutes from './features/laborCategories/routes';
import locationRoutes from './features/locations/routes';
import locationMappingRoutes from './features/locationMapping/routes';
import departmentRoutes from './features/departments/routes';
import attributeRoutes from './features/attributes/routes';
import jobClassRoutes from './features/jobClasses/routes';
import React from 'react';
import sharedRoutes from './features/shared/routes';
import standardRoutes from './features/standards/routes';
import standardFilingFieldOptionRoutes from './features/standardFilingFieldOptions/routes';
import elementRoutes from './features/elements/routes';
import orgHierarchyLevelRoutes from './features/orgHierarchyLevels/routes';
import orgHierarchyLevelOptionsRoutes from './features/orgHierarchyLevelOptions/routes';
import partFieldRoutes from './features/partFields/routes';
import partFamilyRoutes from './features/partFamilies/routes';
import partRoutes from './features/parts/routes';
import adminToolsRoutes from './features/adminTools/routes';
import unitOfMeasureRoutes from './features/unitsOfMeasure/routes';
import volumeDriverRoutes from './features/volumeDrivers/routes';
import usersRoutes from './features/users/routes';
import characteristicRoutes from './features/characteristics/routes';
import volumeDriverMappingRoutes from './features/volumeDriverMappings/routes';
import volumeDriverValuesRoutes from './features/volumeDriverValues/routes';
import locationsStandardsExportRoutes from './features/locationsStandardsExport/routes';
import ADAPTExport from './features/ADAPTExport/routes';
import elementListManagementRoutes from './features/elementListManagement/routes';
import standardsListManagementRoutes from './features/standardsListManagement/routes';
import {IndexRoute, Route} from 'react-router';
import * as passwordManagementRoutes from './features/passwordManagement/routes';
import integrationRoutes from './features/integrations/routes';
import kronosRoutes from './features/kronos/routes';
import reflexisRoutes from './features/reflexis/routes';
import tumbleweedRoutes from './features/tumbleweed/routes';
import rolePermissionRoutes from './features/rolePermissions/routes';
import industryElementsRoutes from './features/industryElements/routes';
import industryStandardsRoutes from './features/industryStandards/routes';
import downloadsRoutes from './features/downloads/routes';
import volumeDriverValueSetsRoutes from './features/volumeDriverValueSets/routes';
import industryAllowanceRoutes from './features/industryAllowances/routes';
import volumeDriverMappingVariablesRoute from './features/volumeDriverMappingVariables/routes';

export default (
  <Route path="/" component={App}>
    <Route component={Authorize}>
      <IndexRoute component={DashboardPage} />
      {allowanceRoutes}
      {allowanceRestRoutes}
      {attributeRoutes}
      {jobClassRoutes}
      {classificationsRoutes}
      {dashboardRoutes}
      {departmentRoutes}
      {passwordManagementRoutes.authorizedRoutes}
      {standardRoutes}
      {elementRoutes}
      {laborCategoryRoutes}
      {locationRoutes}
      {locationMappingRoutes}
      {unitOfMeasureRoutes}
      {volumeDriverRoutes}
      {characteristicRoutes}
      {volumeDriverMappingRoutes}
      {partFamilyRoutes}
      {partRoutes}
      {locationsStandardsExportRoutes}
      {ADAPTExport}
      {kronosRoutes}
      {reflexisRoutes}
      {tumbleweedRoutes}
      {elementListManagementRoutes}
      {standardsListManagementRoutes}
      {volumeDriverValuesRoutes}
      {usersRoutes}
      {orgHierarchyLevelRoutes}
      {orgHierarchyLevelOptionsRoutes}
      {adminToolsRoutes}
      {standardFilingFieldOptionRoutes}
      {partFieldRoutes}
      {rolePermissionRoutes}
      {industryElementsRoutes}
      {industryStandardsRoutes}
      {downloadsRoutes}
      {volumeDriverValueSetsRoutes}
      {industryAllowanceRoutes}
      {volumeDriverMappingVariablesRoute}
      <Route path="integrations">
        {integrationRoutes}
      </Route>
    </Route>
    {authenticationRoutes}
    {disableAccountRoutes}
    {passwordManagementRoutes.nonAuthorizedRoutes}
    {sharedRoutes}
  </Route>
);
