export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const token_exp = localStorage.getItem("token_exp");
  const current_time = new Date().getUTCSeconds();

  if (current_time > token_exp || token === null) {
    return false;
  } 

  else {
    return true;
  }
}
