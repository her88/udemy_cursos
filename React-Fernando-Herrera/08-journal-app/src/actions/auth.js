import { types } from "../types/types";

//esto es lo mismo que abajo, al encerrar con parentesis el objeto, le decimos que lo estamos retornando
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }

});


/*export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}*/