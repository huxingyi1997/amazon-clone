import { ChangeEvent, useReducer } from "react";
import { Action } from "../../shared/models/action.interface";
import {
  InputActionEnum,
} from "./models/InputAction";
import { InputState } from "./models/InputState.interface";
import { ValidatorFn } from "../../shared/utils/validation/models/ValidatorFn";

const initialInputState: InputState = {
  text: "",
  hasBeenTouched: false,
};

const inputReducer = (
  state: InputState,
  action: Action<InputActionEnum>
): InputState => {
  const { type, value = "" } = action;

  switch (type) {
    case InputActionEnum.INPUT_ACTION_CHANGE:
      return { text: value, hasBeenTouched: state.hasBeenTouched };
    case InputActionEnum.INPUT_ACTION_BLUR:
      return { text: state.text, hasBeenTouched: true };
    case InputActionEnum.INPUT_ACTION_CLEAR:
      return { text: "", hasBeenTouched: false };
    default:
      return { ...state };
  }
};

const useInput = (validatorFn?: ValidatorFn) => {
  const [{ text, hasBeenTouched }, dispatch] = useReducer(
    inputReducer,
    initialInputState
  );

  let shouldDisplayError;

  if (validatorFn) {
    const isValid = validatorFn(text);

    shouldDisplayError = !isValid && hasBeenTouched;
  }

  const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: InputActionEnum.INPUT_ACTION_CHANGE,
      value: e.target.value,
    });
  };

  const inputBlurHandler = () => {
    dispatch({ type: InputActionEnum.INPUT_ACTION_BLUR });
  };

  const clearHandler = () => {
    dispatch({ type: InputActionEnum.INPUT_ACTION_CLEAR });
  };

  return {
    text,
    shouldDisplayError,
    textChangeHandler,
    inputBlurHandler,
    clearHandler,
  };
};

export default useInput;
