import jwt from 'jsonwebtoken'
import {UserInputError} from 'apollo-server'
import {combineResolvers} from 'graphql-resolvers'
import {isAdmin} from './authorization'

const createToken = async (user, secret, expiresIn) => {
    const {id, email, username} = user
    return await jwt.sign({id,email,username}, secret, {expiresIn})
}

export default {
    Query: {
        users: async (parent, args, { models }) => {
            return await models.User.findAll()
        },
        user: async (parent, { id }, { models }) => {
            return await models.User.findByPk(id)
        },
        me: async (parent, args, { me }) => {
            if(!me){
                return null
            }
            return await models.User.findByPk(me.id)
        },
    },
    
    Mutation: {
        signUp: async ( parent, {username,email,password}, {models, secret} ) => {
            const user = await models.User.create({username,email,password})
            return {token: createToken(user, secret, process.env.TOKEN_EXPIRE)}
        },

        signIn: async (parent, {login, password}, {models, secret}) => {
            const user = await models.User.findByLogin(login)

            if(!user){
                throw new UserInputError('Invalid credentials')
            }
            
            const isValid = await user.validatePassword(password)
            
            if(!isValid){
                throw new UserInputError('Invalid credentials')
            }

            return {token: createToken(user,secret,process.env.TOKEN_EXPIRE)}
        },

        deleteUser: combineResolvers(
            isAdmin,
            async (parent, {id}, {models}) => {
            return await models.User.destroy({
                where: {id}
            })
        })
    },
};