const { gql } = require("apollo-server-express");

module.exports = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    deadline: String
    completed: Boolean!
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    addTask(title: String!, description: String, deadline: String): Task!
    updateTask(id: ID!, completed: Boolean!): Task!
    deleteTask(id: ID!): Task!
  }

  type Subscription {
    taskCreated: Task!
  }
`;
