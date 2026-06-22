import { getItem, removeItem } from "./localstorage";

const verifyToken = () => {
  const token: string | null = getItem();
  if (!token) {
    return false;
  }
  const realToken = token.split(".")[1];
  const decodedToken = JSON.parse(atob(realToken));
  const expireTimeToken = decodedToken.exp * 1000;
  const currentTime = Date.now();
  const isExpiredToken = currentTime > expireTimeToken;
  if (isExpiredToken) {
    removeItem();
  }
  return !isExpiredToken;
};

export default verifyToken;
