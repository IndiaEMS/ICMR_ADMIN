import { genSalt, hash } from "bcrypt";
async function genPassword(password) {
  const salt = await genSalt();
  password = await hash(password, salt);
  console.log(password);
}
const password = "Icmr@2024";
genPassword(password);
