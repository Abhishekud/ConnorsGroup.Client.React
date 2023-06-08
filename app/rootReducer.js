/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import adminTools from './features/adminTools/reducers';
import allowanceRests from './features/allowanceRests/reducers';
import allowances from './features/allowances/reducers';
import attributes from './features/attributes/reducers';
import authentication from './features/authentication/reducers';
import characteristics from './features/characteristics/reducers';
import classifications from './features/classifications/reducers';
import dashboard from './features/dashboard/reducers';
import departments from './features/departments/reducers';
import disableAccount from './features/disableAccount/reducers';
import downloads from './features/downloads/reducers';
import elementActivities from './features/elementActivities/reducers';
import elementListManagement from './features/elementListManagement/reducers';
import elementMassUpdate from './features/elementMassUpdate/reducers';
import elementUnitsOfMeasure from './features/elementUnitsOfMeasure/reducers';
import elements from './features/elements/reducers';
import forms from './features/forms/reducers';
import industryAllowances from './features/industryAllowances/reducers';
import industryElements from './features/industryElements/reducers';
import industryStandards from './features/industryStandards/reducers';
import integrations from './features/integrations/reducers';
import jobClasses from './features/jobClasses/reducers';
import kronosintegrationEndpoint from './features/kronos/integrationEndpoint/reducers';
import kronosjob from './features/kronos/job/reducers';
import kronoslaborDriver from './features/kronos/laborDriver/reducers';
import kronoslaborPeriod from './features/kronos/laborPeriod/reducers';
import kronoslaborStandard from './features/kronos/laborStandard/reducers';
import kronostask from './features/kronos/task/reducers';
import kronostaskGroup from './features/kronos/taskGroup/reducers';
import laborCategories from './features/laborCategories/reducers';
import layout from './features/layout/reducers';
import locationMapping from './features/locationMapping/reducers';
import locations from './features/locations/reducers';
import locationsStandardsExport from './features/locationsStandardsExport/reducers';
import mostAnalysis from './features/mostAnalysis/reducers';
import nonMOSTAnalysis from './features/nonMOSTAnalysis/reducers';
import notifications from './features/notifications/reducers';
import orgHierarchyLevelOptions from './features/orgHierarchyLevelOptions/reducers';
import orgHierarchyLevels from './features/orgHierarchyLevels/reducers';
import partFamilies from './features/partFamilies/reducers';
import partFields from './features/partFields/reducers';
import parts from './features/parts/reducers';
import passwordManagement from './features/passwordManagement/reducers';
import pdfGeneration from './features/pdfGeneration/reducers';
import reflexisattribute from './features/reflexis/attribute/reducers';
import reflexisintegrationEndpoint from './features/reflexis/integrationEndpoint/reducers';
import reflexisintegrationStatus from './features/reflexis/integrationStatus/reducers';
import reflexislaborStandard from './features/reflexis/laborStandard/reducers';
import reflexisstoreAttribute from './features/reflexis/storeAttribute/reducers';
import rolePermissions from './features/rolePermissions/reducers';
import selectListOptions from './features/selectListOptions/reducers';
import shared from './features/shared/reducers';
import standardFilingFieldOptions from './features/standardFilingFieldOptions/reducers';
import standardFilingFields from './features/standardFilingFields/reducers';
import standards from './features/standards/reducers';
import standardsListManagement from './features/standardsListManagement/reducers';
import tumbleweed from './features/tumbleweed/reducers';
import unitsOfMeasure from './features/unitsOfMeasure/reducers';
import users from './features/users/reducers';
import volumeDriverMappingVariables from './features/volumeDriverMappingVariables/reducers';
import volumeDriverMappings from './features/volumeDriverMappings/reducers';
import volumeDriverValueSets from './features/volumeDriverValueSets/reducers';
import volumeDriverValues from './features/volumeDriverValues/reducers';
import volumeDrivers from './features/volumeDrivers/reducers';

const rootReducer = combineReducers({
  features: combineReducers({
    adminTools,
    allowanceRests,
    allowances,
    attributes,
    authentication,
    characteristics,
    classifications,
    dashboard,
    departments,
    disableAccount,
    downloads,
    elementActivities,
    elementListManagement,
    elementMassUpdate,
    elementUnitsOfMeasure,
    elements,
    forms,
    industryAllowances,
    industryElements,
    industryStandards,
    integrations,
    jobClasses,
    kronosintegrationEndpoint,
    kronosjob,
    kronoslaborDriver,
    kronoslaborPeriod,
    kronoslaborStandard,
    kronostask,
    kronostaskGroup,
    laborCategories,
    layout,
    locationMapping,
    locations,
    locationsStandardsExport,
    mostAnalysis,
    nonMOSTAnalysis,
    notifications,
    orgHierarchyLevelOptions,
    orgHierarchyLevels,
    partFamilies,
    partFields,
    parts,
    passwordManagement,
    pdfGeneration,
    reflexisattribute,
    reflexisintegrationEndpoint,
    reflexisintegrationStatus,
    reflexislaborStandard,
    reflexisstoreAttribute,
    rolePermissions,
    selectListOptions,
    shared,
    standardFilingFieldOptions,
    standardFilingFields,
    standards,
    standardsListManagement,
    tumbleweed,
    unitsOfMeasure,
    users,
    volumeDriverMappingVariables,
    volumeDriverMappings,
    volumeDriverValueSets,
    volumeDriverValues,
    volumeDrivers,
  }),
  routing: routerReducer,
});

export default rootReducer;
