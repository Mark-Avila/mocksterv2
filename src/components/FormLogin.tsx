import { LoginInputs } from "../types";
import FormHeader from "./FormHeader";
import FormInput from "./FormInput";
import FormItem from "./FormItem";

interface FormLoginProps {
  onChange: (e: unknown) => void;
  onSubmit: (e: any) => void;
  inputs: LoginInputs;
  disabled?: boolean;
}

function FormLogin({ onChange, inputs, disabled, onSubmit }: FormLoginProps) {
  return (
    <>
      <FormHeader
        main="Sign in"
        follow="to your account"
        linkText="Don't have an account? "
        linkMain="Sign Up"
      />
      <form className="mt-8" onSubmit={onSubmit}>
        <FormItem>
          <FormInput
            type="text"
            value={inputs.email}
            placeholder="Enter email address"
            name="email"
            onChange={onChange}
            disabled={disabled}
          />
        </FormItem>
        <FormItem>
          <FormInput
            type="password"
            value={inputs.pwd}
            placeholder="Enter password"
            name="pwd"
            onChange={onChange}
            disabled={disabled}
          />
        </FormItem>
        <div
          id="login-submit"
          className="w-full flex justify-end items-center mt-8"
        >
          {/* {disabled && (
            <div className="mr-8">
              <PageSpinner />
            </div>
          )} */}
          <button
            type="submit"
            disabled={disabled}
            className={`shadow-md ${
              disabled
                ? "bg-red-700"
                : "bg-red-500 hover:bg-red-600 active:bg-red-700"
            } transition text-white text-sm ease-in-out w-32 h-12  rounded-md font-bold hover:cursor-pointer`}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}

export default FormLogin;
