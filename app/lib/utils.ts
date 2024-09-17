import bcrypt from "bcrypt";

export const saltAndHashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const verifyPassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}