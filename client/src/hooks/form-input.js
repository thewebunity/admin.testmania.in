import { useState } from "react";

const useFormInput = (validate) => {
  const [input, setinput] = useState("");

  const [inputTouched, setinputTouched] = useState(false);

  const setValue = (val) => {
    setinput(val);
  };

  const inputChangeHandler = (e) => {
    setinput(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setinputTouched(true);
  };

  const isValid = validate(input);
  const hasError = !isValid && inputTouched;

  const resetinput = () => {
    setinput("");
    setinputTouched(false);
  };

  return {
    value: input,
    isValid,
    hasError,
    setValue,
    resetinput,
    inputChangeHandler,
    inputBlurHandler,
  };
};

export default useFormInput;
