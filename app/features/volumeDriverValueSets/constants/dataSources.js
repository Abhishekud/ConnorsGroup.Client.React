import {PRODUCTION} from '../../shared/constants/exportTypes';
const ExportUrls = {
  DRAFT: 'locations-standards-export/export-for-vdv-sets/development/',
  PRODUCTION: 'locations-standards-export/export-for-vdv-sets/production/',
};
export const toExportUrl = exportType => (exportType === PRODUCTION ? ExportUrls.PRODUCTION : ExportUrls.DRAFT);
