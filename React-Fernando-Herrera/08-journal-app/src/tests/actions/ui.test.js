import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Pruebas en ui-actions', () => {

    test('Todas las acciones deben de funcionar', () => {

        const actionSetError = setError('Error');

        const valueSetError = {
            type: types.uiSetError,
            payload: 'Error'
        }

        expect(actionSetError).toEqual(valueSetError);

        const actionRemoveError = removeError();
        const actionStartLoading = startLoading();
        const actionFinishLoading = finishLoading();

        expect(actionRemoveError).toEqual({
            type: types.uiRemoveError
        });

        expect(actionStartLoading).toEqual({
            type: types.uiStartLoading
        });

        expect(actionFinishLoading).toEqual({
            type: types.uiFinishLoading
        });
    });

})
