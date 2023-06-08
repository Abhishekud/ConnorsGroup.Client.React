export const DRAFT = 'StandardsAndUomsByLocation/DataSource/Development';
export const PRODUCTION = 'StandardsAndUomsByLocation/DataSource/Production';

const Urls = {
  DRAFT: 'locations-standards-export/development/list',
  PRODUCTION: 'locations-standards-export/production/list',
};
export const toUrl = dataSource => (dataSource === PRODUCTION ? Urls.PRODUCTION : Urls.DRAFT);

const ExportUrls = {
  DRAFT: 'locations-standards-export/export/development/',
  PRODUCTION: 'locations-standards-export/export/production/',
};
export const toExportUrl = dataSource => (dataSource === PRODUCTION ? ExportUrls.PRODUCTION : ExportUrls.DRAFT);

const CountUrls = {
  DRAFT: 'locations-standards-export/development/list/count',
  PRODUCTION: 'locations-standards-export/production/list/count',
};
export const toCountUrl = dataSource => (dataSource === PRODUCTION ? CountUrls.PRODUCTION : CountUrls.DRAFT);

const ExportStandardsAndVolumeDriversByLocationsUrls = {
  DRAFT: 'locations-standards-export/export-volume-drivers/development/',
  PRODUCTION: 'locations-standards-export/export-volume-drivers/production/',
};
export const toExportStandardsAndVolumeDriversByLocationsUrls = dataSource =>
  (dataSource === PRODUCTION ? ExportStandardsAndVolumeDriversByLocationsUrls.PRODUCTION : ExportStandardsAndVolumeDriversByLocationsUrls.DRAFT);

