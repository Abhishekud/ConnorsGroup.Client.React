import {toastr} from '../../shared/services';

export default function (error, router, errorMessage) {
  const {status} = error.response || {};
  if (status === 400) return;
  if (status === 401) {
    router.push('/log-in');
    return;
  }
  if (status === 404) {
    toastr.error(errorMessage, 'Error: Unable to locate resource.', {timeOut: 10000});
  } else if (status === 413) {
    toastr.error(errorMessage, 'Error: Submitted file is too large.', {timeOut: 10000});
  } else {
    toastr.error(errorMessage, 'Error', {timeOut: 10000});
  }
  if (!status) throw error;
}
