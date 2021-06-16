import {sign} from 'jsonwebtoken'
import { User } from '../models/User'
const SECRET = process.env.SECRET as string

export const issueToken = async (user: User) =>    
    await sign(user, SECRET, {expiresIn: 60 * 60 * 24})

