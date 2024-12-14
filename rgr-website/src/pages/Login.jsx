import { useState } from "react";
import { cn } from "../utils";
import { PB } from "../constants";
import store from "../store";
import { loginAction } from "../store/slices/auth.jsx";

const Login = () => {
  const [formType, setFormType] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const [username, setUsername] = useState("");

  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  async function auth() {
    const auth = await PB.collection("users").authWithPassword(email, password);

    store.dispatch(loginAction({ token: auth.token }));
  }

  async function register() {
    await PB.collection("users").create({
      password: password,
      passwordConfirm: verify,
      login: username,
      email: email,
      accessLevel: "user",
    });

    const auth = await PB.collection("users").authWithPassword(email, password);

    store.dispatch(loginAction({ token: auth.token }));
  }

  return (
    <div className="w-full h-screen flex items-center justify-center p-32">
      <div className="flex flex-col gap-6 items-center max-w-2xl w-full border-2 border-[#0a3a40] p-12 rounded-2xl bg-[#000]/30 shadow-xl backdrop-blur-3xl">
        <h1 className="text-4xl text-[#fff]">Добро пожаловать! 👋</h1>
        <div className="flex flex-row items-center justify-center gap-2">
          <div
            onClick={() => setFormType(0)}
            className={cn(
              "text-white bg-[#0a3a40] px-4 py-2 cursor-pointer rounded-lg",
              { "bg-[#0f5959]": formType === 0 }
            )}
          >
            Логин
          </div>
          <div
            onClick={() => setFormType(1)}
            className={cn(
              "text-white bg-[#0a3a40] px-4 py-2 cursor-pointer rounded-lg",
              { "bg-[#0f5959]": formType === 1 }
            )}
          >
            Регистрация
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {formType === 1 && (
            <input
              placeholder="Логин"
              type="text"
              className="w-full border-[#0a3a40] border-2 rounded-lg px-4 py-2 outline-none bg-transparent text-[#fff]"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          )}
          <input
            placeholder="Почта"
            type="email"
            className={cn(
              "w-full border-[#0a3a40] border-2 rounded-lg px-4 py-2 outline-none bg-transparent text-[#fff]",
              { "border-red-700": !validateEmail(email) && email }
            )}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="Пароль"
            type="password"
            className="w-full border-[#0a3a40] border-2 rounded-lg px-4 py-2 outline-none bg-transparent text-[#fff]"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {formType === 1 && (
            <input
              placeholder="Подтвердите пароль"
              type="password"
              value={verify}
              onChange={(e) => setVerify(e.target.value)}
              className={cn(
                "w-full border-[#0a3a40] border-2 rounded-lg px-4 py-2 outline-none bg-transparent text-[#fff]",
                { "border-red-700": verify !== password }
              )}
            />
          )}
        </div>
        <button
          className="border border-[#0a3a40] rounded-lg px-4 py-2 bg-[#0a3a40] text-[#fff] w-full"
          onClick={() => {
            formType === 0 ? auth() : register();
          }}
        >
          {formType === 0 ? "Войти" : "Зарегистрироваться"}
        </button>
      </div>
    </div>
  );
};

export default Login;
