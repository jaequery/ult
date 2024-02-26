import Cookies from "js-cookie";

// Helper function to parse expiresIn and convert to days
function parseExpiresIn(expiresIn: string) {
  const unit = expiresIn.slice(-1);
  const value = parseInt(expiresIn.slice(0, -1), 10);

  switch (unit) {
    case "h": // hours
      return value / 24; // Convert hours to days
    case "d": // days
      return value;
    default:
      return undefined; // Default case, might be useful to handle 's' for seconds or other formats
  }
}

export function setJwtAccessToken(token: string, expiresIn: string) {
  const expires = parseExpiresIn(expiresIn);
  Cookies.set("jwtAccessToken", token, {
    expires,
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
