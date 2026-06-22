import { getItem } from "./localstorage";

export interface TokenUser {
  name: string;
  email: string;
}

// Tokendagi payloaddan foydalanuvchi ma'lumotini ajratib oladi.
export const getUserFromToken = (): TokenUser | null => {
  const token = getItem();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const fullName = payload.firstName
      ? `${payload.firstName} ${payload.lastName ?? ""}`.trim()
      : payload.name ?? payload.fullName ?? payload.email ?? "Foydalanuvchi";

    return { name: fullName, email: payload.email ?? "" };
  } catch {
    return null;
  }
};
