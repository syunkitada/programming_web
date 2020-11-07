import Dashboard from "../../components/core/Dashboard";
import auth from "../../apps/auth";

function init() {
  Dashboard.Render({ id: "root", logout: auth.logout });
}

const index = {
  init,
};
export default index;
