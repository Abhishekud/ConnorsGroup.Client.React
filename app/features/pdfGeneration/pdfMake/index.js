import '../../../babelHelpers';
import pdfMake from 'pdfmake/build/pdfmake';
import fonts from './fonts';

pdfMake.vfs = fonts;
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf',
  },
};

export default pdfMake;
