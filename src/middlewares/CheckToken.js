// verifyToken.js

const verifyToken = () => {
  const token = localStorage.getItem('token');
  console.log("token found: ", token)
  if (!token) {
    return false;
  }
  return true;
};

export default verifyToken;
