const USER = '**ncch**user';

exports.getUser = () => {  
  try {
    return JSON.parse(localStorage.getItem(USER));
  } catch {
    return false;
  }  
};
exports.setUser = (data) => {
  localStorage.setItem(USER, JSON.stringify(data));
};
exports.removeUser = () => {
  localStorage.removeItem(USER);
};
