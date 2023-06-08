export const POLL_INTERVAL = 10000;
export const LOCATIONS_STANDARDS = 'LocationStandardsCalculator';
export const VOLUME_DRIVER_VALUE_IMPORTER = 'VolumeDriverValueImporter';
export const VOLUME_DRIVER_MAPPINGS_IMPORTER = 'VolumeDriverMappingsImporter';
export const CALCULATE_LABOR = 'CalculateLabor';
export const KRONOS_LABOR_PERIOD_IMPORTER = 'KronosLaborPeriodImporter';
export const KRONOS_TASK_IMPORTER = 'KronosTaskImporter';
export const LOCATION_ATTRIBUTE_IMPORTER = 'LocationAttributeImporter';
export const KRONOS_TASK_GROUPS_IMPORTER = 'KronosTaskGroupsImporter';
export const LOCATION_STANDARDS_EXPORTER = 'LocationStandardsExporter';
export const CHARACTERISTICS_EXPORTER = 'CharacteristicsExporter';
export const BULK_UPDATE_CHARACTERISTICS = 'BulkUpdateCharacteristics';
export const STANDARD_DETAILS_EXPORTER = 'StandardDetailsExporter';
export const BULK_DELETE_STANDARDS_REVISIONS = 'BulkDeleteStandardsRevisions';
export const KRONOS_LABOR_PERIOD_EXPORTER = 'KronosLaborPeriodExporter';
export const CHARACTERISTICS_IMPORTER = 'CharacteristicsImporter';
export const KRONOS_LABOR_STANDARD_EXPORTER = 'ExportLaborStandardToKronos';
export const KRONOS_LABOR_PERIODS_IMPORT_TEMPLATE_EXPORTER = 'KronosLaborPeriodsImportTemplateExporter';
export const VOLUME_DRIVER_VALUES_EXPORTER = 'VolumeDriverValuesExporter';
export const LOCATION_STANDARDS_FOR_VDV_SETS_EXPORTER = 'LocationStandardsForVdvSetsExporter';
export const LOCATION_IMPORTER = 'LocationImporter';
export const STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_EXPORTER = 'StandardsAndVolumeDriversByLocationsExporter';

export function backgroundJobTitleText(backgroundJob) {
  switch (backgroundJob.toUpperCase()) {
    case CALCULATE_LABOR.toUpperCase() || LOCATIONS_STANDARDS.toUpperCase():
      return 'Calculation';
    case LOCATION_STANDARDS_EXPORTER.toUpperCase():
      return 'Standards and UOMs export';
    case STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_EXPORTER.toUpperCase():
      return 'Standards and Volume Drivers export';
    default:
      return '';
  }
}
