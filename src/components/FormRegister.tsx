import { RegisterInputs } from "../types";
import FormHeader from "./FormHeader";
import FormInput from "./FormInput";
import FormItem from "./FormItem";
import FormRadioButton from "./FormRadioButton";

interface Props {
  onChange: (e: any) => void;
  onRadioChange: (e: unknown) => void;
  onSubmit: (e: unknown) => void;
  inputs: RegisterInputs;
  disabled?: boolean;
}

function FormRegister({
  onChange,
  onRadioChange,
  onSubmit,
  inputs,
  disabled,
}: Props) {
  return (
    <>
      <FormHeader
        main="Create"
        follow="your new account"
        linkText="Already have an account? "
        linkMain="Sign In"
      />
      <form onSubmit={onSubmit} className="mt-8">
        <FormItem twoCols>
          <FormInput
            onChange={onChange}
            placeholder="First name"
            name="fname"
            type="text"
            value={inputs.fname}
            disabled={false}
          />
          <FormInput
            onChange={onChange}
            placeholder="Last name"
            name="lname"
            type="text"
            value={inputs.lname}
            disabled={false}
          />
        </FormItem>
        <FormItem>
          <FormInput
            onChange={onChange}
            placeholder="TUP email address"
            name="email"
            type="email"
            value={inputs.email}
            disabled={disabled}
          />
        </FormItem>
        <FormItem>
          <FormInput
            onChange={onChange}
            placeholder="TUP ID number"
            name="tupid"
            type="text"
            value={inputs.tupid}
            disabled={disabled}
          />
        </FormItem>
        <FormItem twoCols>
          <FormInput
            onChange={onChange}
            placeholder="Password"
            name="pwd"
            type="password"
            value={inputs.pwd}
            disabled={disabled}
          />
          <FormInput
            onChange={onChange}
            placeholder="Re-enter password"
            name="pwd2"
            type="password"
            value={inputs.pwd2}
            disabled={disabled}
          />
        </FormItem>
        <div className="flex items-center">
          <p className={`mr-8 font-inter font-bold text-gray-600`}>Gender:</p>
          <FormRadioButton
            label="Male"
            name="gender"
            id="gender-btn-male"
            onChange={onRadioChange}
            checked={inputs.gender}
          />
          <FormRadioButton
            label="Female"
            name="gender"
            id="gender-btn-female"
            onChange={onRadioChange}
            checked={!inputs.gender}
          />
        </div>
        <div
          id="register-submit"
          className="mt-8 flex w-full items-center justify-end"
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
            } h-12 w-32 rounded-md font-bold text-white transition  ease-in-out hover:cursor-pointer xl:text-sm`}
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
}

export default FormRegister;
