
function login({name, password}) {
  const user = {
    name: name,
  }

  console.log("DEBUG: api login")
  return {user: user, error: null}
}

function logout({name}) {
  const user = {
    name: name,
  }

  console.log("DEBUG: api logout")
  return {user: user, error: null}
}

export default {
  login,
  logout,
}
