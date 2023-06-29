import { useState, createContext } from "react";
import { toast } from "react-toastify";
import FormRegister from "../components/FormRegister";
import { Form } from "react-router-dom";
import { LoginInputs, RegisterInputs } from "../types";

interface RegisterBody {
  fname: string;
  lname: string;
  email: string;
  tupid: string;
  pwd: string;
  gender: 1 | 0;
}

const ToggleFormContext = createContext<{ toggleForm: () => void } | null>(
  null
);

function Landing() {
  const [isRegister, setIsRegister] = useState(false);

  const [regFormInputs, setRegFormInputs] = useState<RegisterInputs>({
    fname: "",
    lname: "",
    email: "",
    tupid: "",
    pwd: "",
    pwd2: "",
    gender: false,
  });

  const [logFormInputs, setLogFormInputs] = useState<LoginInputs>({
    email: "",
    pwd: "",
  });

  const onRegisterSubmit = (e: Event) => {
    e.preventDefault();

    if (regFormInputs.pwd !== regFormInputs.pwd2) {
      return toast.error("Passwords do not match");
    }

    const userData: RegisterBody = {
      fname: regFormInputs.fname,
      lname: regFormInputs.lname,
      email: regFormInputs.email,
      tupid: regFormInputs.tupid,
      pwd: regFormInputs.pwd,
      gender: regFormInputs.gender ? 1 : 0,
    };

    // dispatch(register(userData));
  };

  const onLoginSubmit = (e: Event) => {
    e.preventDefault();

    const userData = {
      email: logFormInputs.email,
      password: logFormInputs.pwd,
    };

    // dispatch(login(userData));
  };

  const onLoginChange = (e: any) => {
    if (e.target as HTMLInputElement) {
      return setLogFormInputs((prev) => ({
        ...prev,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
          .value,
      }));
    }
  };

  const onRegisterChange = (e: any) => {
    return setRegFormInputs((prev) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    }));
  };

  const onRadioChange = (e: any) => {
    setRegFormInputs((prev) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]:
        (e.target as HTMLInputElement).id === "gender-btn-male" ? 1 : 0,
    }));
  };

  const toggleForm = () => setIsRegister(!isRegister);

  return (
    <main
      className={`flex h-full min-h-full items-center justify-between font-inter xl:grid xl:grid-cols-2`}
    >
      <div
        className={`bg-bright box-border hidden h-full w-full bg-red-500 bg-studying bg-cover p-12 xl:block font-inter`}
      >
        <h1 className={`font-inter text-7xl font-bold`}>Mockster</h1>
        <div className="my-8 h-2 w-32 bg-white"></div>
        <p className={`font-inter w-3/4 text-3xl font-bold text-white`}>
          Practice makes perfect with when it’s like the real thing
        </p>
      </div>
      <div
        className={`relative box-border flex h-full w-full items-center justify-center bg-blue-100 px-10`}
      >
        {/*Right container*/}
        <div className="w-full lg:w-8/12 xl:w-[400px]">
          <ToggleFormContext.Provider value={{ toggleForm: toggleForm }}>
            {/* {isRegister ? (
                <FormRegister
                  onSubmit={onRegisterSubmit}
                  inputs={regFormInputs}
                  onChange={onChange}
                  onRadioChange={onRadioChange}
                  disabled={loading}
                />
              ) : (
                <FormLogin
                  onSubmit={onLoginSubmit}
                  disabled={loading}
                  inputs={logFormInputs}
                  onChange={onChange}
                />
              )} */}
            <FormRegister
              onSubmit={onRegisterSubmit}
              inputs={regFormInputs}
              onChange={onRegisterChange}
              onRadioChange={onRadioChange}
              disabled={false}
            />
          </ToggleFormContext.Provider>
        </div>
      </div>
    </main>
  );
}

export default Landing;