import { SchemaDirectiveVisitor } from "graphql-tools";
import {AuthenticationError, AuthorizationError} from 'apollo-server-express'
import models from '../models'
import {defaultFieldResolver} from 'graphql'

export class AuthDirective extends SchemaDirectiveVisitor{

    visitObject(type){
        this.ensureFieldsWrapped(type)
        type._requiredAuthRole = this.args.requires
    }
    
    visitFieldDefinition(field, details){
        this.ensureFieldsWrapped(details.objectType)
        field._requiredAuthRole = this.args.requires
    }

    ensureFieldsWrapped(objectType) {
        if(objectType._authFieldWrapped) return
        objectType._authFieldWrapped = true

        const fields = objectType.getFields()

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName]
            const {resolve = defaultFieldResolver} = field
            
            field.resolve = async function (...args){
                const requiredRole = field._requiredAuthRole || objectType._requiredAuthRole
                
                if( !requiredRole ){
                    return resolve.apply(this, args)
                }
                
                const context = args[2]
                if(!context.me){
                    throw new AuthenticationError('Not authenticated')
                }
                const user = await models.User.findByPk( context.me.id )
                if( user.role !== requiredRole && user.role !== 'ADMIN'){
                    throw new AuthenticationError('Not authorized')
                }
                
                return resolve.apply(this, args)
            }
        })
    }
}