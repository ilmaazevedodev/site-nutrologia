import jwt from "jsonwebtoken";

export async function loginService(email: string, senha: string) {

  if (email === "admin@email.com" && senha === "123456") {

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return token;
  }

  return null;
}
