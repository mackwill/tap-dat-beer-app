import { useEffect, useReducer } from "react";
import axios from "axios";

// Case variables
const SET_LOGIN = "SET_LOGIN";
const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOGIN: {
      return { ...state, loginOpen: action.value };
    }
    default:
      throw new Error(
        `Tried to reduce with usuppoorted action type: ${action.type}`
      );
  }
};

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    loginOpen,
    registerOpen,
  });

  const openCloseLogin = (open = false, close = false) => {
    if (open) {
      dispatch({
        type: SET_LOGIN,
        value: true,
      });
    } else {
    }
  };

  return {
    ...state,
  };
}
