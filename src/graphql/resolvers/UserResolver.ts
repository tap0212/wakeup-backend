import { ApolloError } from 'apollo-server-express'
import { IResolvers } from 'graphql-tools'
import {compare, hash} from 'bcryptjs'
import { AuthenticateResponse, MutationRegisterArgs, QueryLoginArgs } from '../../generated/graphql'
import { issueToken } from '../../utils/UserFunctions'

export const UserResolvers: IResolvers = {
  Query: {
    async login (_: void, args: QueryLoginArgs, {User}): Promise<AuthenticateResponse> {
      try {
        let user = await User.findOne({email: args.email})
        if(!user){
          throw new Error('User with this email does not exist!')
        }
        const isMatch = await compare(args.password, user.password)
        if(!isMatch){
          throw new Error('Invalid credentials!')
        }
        user = user.toObject()
        delete user.password;
        user.id = user._id;
        const token = await issueToken(user) as string        
        return {
          token
        }
      } catch (error) {
        throw new ApolloError(error.message, '403')
      }
    }
  },
  Mutation: {
    async register (_: void, args: MutationRegisterArgs, {User}): Promise<AuthenticateResponse> {
      try {
        const {email, password} = args
        let user;
        user = await User.findOne({email})

        if(user){
          throw new Error("User with this email already exists!")
        }
        user = new User(args)
        user.password = await hash(password, 10)
        let result = await user.save()
        result = result.toObject()
        delete result.password;
        result.id = result._id;
        const token = await issueToken(result) as string
        return {
          token
        }
      } catch (error) {
        throw new ApolloError(error.message, '400')
      }
    }
  }
}