import { Cookies } from "react-cookie";

/* 토큰생성 */
/* 토큰 쿠키에 저장 */
const StoreTokenInCookie = (token) => {
  /* 쿠키생성 */
  const cookies = new Cookies();
  return cookies.set('token', token, { path: '/', httpOnly: false })
}

const GetTokenFromCookie = (name) => {
  const cookies = new Cookies();
  const token = cookies.get(name)
  return token;
}
const DeleteTokenFromCookie = () => {
  const cookies = new Cookies();
  cookies.remove('token', { path: '/' });
}
export { DeleteTokenFromCookie, GetTokenFromCookie, StoreTokenInCookie }
// export { GetTokenFromCookie, StoreTokenInCookie }