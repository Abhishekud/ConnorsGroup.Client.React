import './handleApiError';

export default function (error, defaultErrorMessage) {
        if (error.response.status === 500) {
          defaultErrorMessage = error.response.data.exceptionMessage;
        }
        handleApiError(error, router, defaultErrorMessage, 'Error');

}
