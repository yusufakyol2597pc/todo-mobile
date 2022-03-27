import { SIGNIN_OR_SIGNUP_STARTED, SIGNIN_OR_SIGNUP_ENDED, SET_CONFIRM_DIALOG } from "../constants/global.constants"

const initialState = {
    loading: false,
    confirmDialog: {
      visible: false,
      onOk: null
    }
  }
  
  export default function globalReducer(state = initialState, action) {
    switch (action.type) {
      case SIGNIN_OR_SIGNUP_STARTED: {
        return {
          ...state,
          loading: true
        }
      }
      case SIGNIN_OR_SIGNUP_ENDED: {
        return {
          ...state,
          loading: false
        }
      }
      case SET_CONFIRM_DIALOG: {
        return {
          ...state,
          confirmDialog: {
            visible: action.visible,
            title: action.title,
            okText: action.okText,
            onOk: action.onOk
          },
        }
      }
      default:
        return state
    }
  }