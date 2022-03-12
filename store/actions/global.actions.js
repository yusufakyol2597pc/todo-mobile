import { SET_CONFIRM_DIALOG } from "../constants/global.constants"

export function openConfirmDialog(title, okText, onOk) {
    return (dispatch, getState, api) => {
        dispatch({
            type: SET_CONFIRM_DIALOG,
            visible: true,
            title,
            okText,
            onOk
        })
    }
}

export function closeConfirmDialog() {
    return (dispatch, getState, api) => {
        dispatch({
            type: SET_CONFIRM_DIALOG,
            visible: false,
            onOk: null
        })
    }
}