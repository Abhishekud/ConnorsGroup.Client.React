import {toastr} from '../../shared/services';
import {exportResponseText} from '../../shared/constants';

export default function (response) {

  return (response.value.data.backgroundedJob ? toastr.success(exportResponseText.SUCCESS, exportResponseText.SUCCESS_TITLE) : toastr.error(exportResponseText.FAILURE));

}
