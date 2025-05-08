export const logoutUser = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Logout fallido");
    }

    return true;
  } catch (err) {
    console.error("Error en logout:", err);
    return false;
  }
};
