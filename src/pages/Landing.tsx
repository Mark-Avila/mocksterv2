import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { FormRegister } from "../components";
import { LoginInputs, RegisterInputs } from "../types";
import FormLogin from "../components/FormLogin";
import { useDispatch, useSelector } from "react-redux";
import { login, register, reset } from "../store";
import { AppThunkDispatch, RootState } from "../main";

interface RegisterBody {
  fname: string;
  lname: string;
  email: string;
  tupid: string;
  pwd: string;
  gender: 1 | 0;
}

export const ToggleFormContext = createContext<{ toggleForm?: () => void }>({
  toggleForm: undefined,
});

function Landing() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading] = useState(false);

  const { error, message } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(message);
      return;
    }

    dispatch(reset());
  }, [error]);

  useEffect(() => {
    if (message !== "" && !error) {
      toast.success(message);
    }
  }, [message]);

  const dispatch = useDispatch<AppThunkDispatch>();

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

    dispatch(register(userData)).then(() => {
      setIsRegister(false);
    });
  };

  const onLoginSubmit = (e: Event) => {
    e.preventDefault();

    const userData = {
      email: logFormInputs.email,
      password: logFormInputs.pwd,
    };

    dispatch(login(userData));
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

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <main
      className={`flex h-full min-h-full items-center justify-between font-inter xl:grid xl:grid-cols-2`}
    >
      <div
        className={`bg-bright bg-studying box-border hidden h-full w-full bg-red-500 bg-cover p-12 font-inter xl:block`}
      >
        <img
          src="https://media.wired.com/photos/6340c6c2f93a1584dc57f353/master/w_2560%2Cc_limit/Tips-and-Apps-to-Help-Students-Gear-GettyImages-1132647177.jpg"
          alt="landing-photo"
        />
        <h1 className={`font-inter text-7xl font-bold text-white`}>Mockster</h1>
        <div className="my-8 h-2 w-32 bg-white"></div>
        <p className={`w-3/4 font-inter text-3xl font-bold text-white`}>
          Practice makes perfect with when it’s like the real thing
        </p>
      </div>
      <div
        className={`relative box-border flex h-full w-full items-center justify-center bg-blue-100 px-10`}
      >
        {/*Right container*/}
        <div className="w-full lg:w-8/12 xl:w-[400px]">
          <ToggleFormContext.Provider value={{ toggleForm: toggleForm }}>
            {isRegister ? (
              <FormRegister
                onSubmit={onRegisterSubmit as (e: unknown) => void}
                inputs={regFormInputs}
                onChange={onRegisterChange}
                onRadioChange={onRadioChange}
                disabled={false}
              />
            ) : (
              <FormLogin
                onSubmit={onLoginSubmit}
                disabled={false}
                inputs={logFormInputs}
                onChange={onLoginChange}
              />
            )}
          </ToggleFormContext.Provider>
        </div>
      </div>
    </main>
  );
}

export default Landing;
