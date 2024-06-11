import { ActionFunctionArgs } from "react-router-dom";

export const RegisterAction = () => async (actionArg: ActionFunctionArgs) => {
  const formData = await actionArg.request.formData();
  console.log(formData);
  return null;
};
