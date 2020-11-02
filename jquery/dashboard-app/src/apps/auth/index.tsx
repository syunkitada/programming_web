import Login from "../../components/login/Login";
import Loading from "../../components/login/Loading";
import service from "../service";
import data from "../../data";

function loginWithToken() {
  Loading.Render({ id: "root" });
  sleep({
    ms: 500,
    callback: function () {
      console.log("loginWithToken");

      const ls = window.localStorage;
      const token = ls.getItem("token");
      if (token) {
        const auth = JSON.parse(token);
        data.auth = auth;
        service.init();
      } else {
        Login.Render({
          id: "root",
          onSubmit: function (input: any) {
            login(input);
          },
        });
        return;
      }
    },
  });
}

function sleep(input: any) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(input.callback());
    }, input.ms);
  });
}

function login(input: any) {
  sleep({
    ms: 500,
    callback: function () {
      console.log("debug callback");
      // input.onError();
      // return;
      const ls = window.localStorage;
      const auth = {
        user: input.userName,
      };
      ls.setItem("token", JSON.stringify(auth));
      data.auth = auth;
      service.init();
    },
  });
}

function init() {
  loginWithToken();
}

const index = {
  init,
};
export default index;
