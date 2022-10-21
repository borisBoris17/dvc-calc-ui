export const getTokenFromStorage = () => {
  const item = JSON.parse(localStorage.getItem('token'))
  const now = new Date().getTime();
  if (now < item.expire) { 
    return item;
  }
  return undefined;
}

export const addTokenToStorage = (token) => {
  const item = {
    token: token,
    expire: new Date().getTime() + getMillisForNumOfMinutes(120)
  }
  localStorage.setItem('token', JSON.stringify(item));
}

const getMillisForNumOfMinutes = (numOfMinutes) => {
  return numOfMinutes * 60 * 1000;
}