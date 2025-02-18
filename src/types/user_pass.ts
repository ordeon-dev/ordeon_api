import { User } from "@prisma/client";

export type UserPass = Omit<User, 'password'>;