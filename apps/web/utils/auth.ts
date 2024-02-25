import Cookies from "js-cookie";

export function setJwtAccessToken(token: string, expiryDays = 365) {
  Cookies.set("jwtAccessToken", token, {
    expires: expiryDays,
    secure: true,
    sameSite: "Strict",
  });
}

export function removeJwtAccessToken() {
  Cookies.remove("jwtAccessToken", {
    secure: true,
    sameSite: "Strict",
  });
}

export function getJwtAccessToken() {
  return Cookies.get("jwtAccessToken");
}
