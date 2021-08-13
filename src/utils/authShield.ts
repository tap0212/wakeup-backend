import { not, rule, shield } from "graphql-shield";
import {verify} from 'jsonwebtoken'
const SECRET = process.env.SECRET as string

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

export const authShield = shield({
  Query: {
    login: not(isAuthenticated)
  },
  Mutation: {
    register: not(isAuthenticated)
  }
});


export const validateToke = async (token: string) =>{
  try {
    return await verify(token, SECRET, {algorithms:  ['HS256']})
  } catch (error) {
    throw Error(error)
  }
}