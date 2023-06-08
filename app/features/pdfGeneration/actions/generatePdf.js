const GENERATE_PDF = 'GENERATE_PDF';
export const GENERATE_PDF_PENDING = `${GENERATE_PDF}_PENDING`;
export const GENERATE_PDF_REJECTED = `${GENERATE_PDF}_REJECTED`;

export function generatePdf(generatePdfCallback) {
  return {
    type: GENERATE_PDF,
    payload: new Promise((resolve, reject) => setTimeout(() => generatePdfCallback(resolve, reject), 25)),
  };
}
