import { gql } from 'apollo-server-express';

import userSchema from './user'

const linkSchema = gql`
  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION
  
  scalar Date
  enum Role {
    ADMIN,
    USER
  }
  
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema];