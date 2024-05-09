const {PubSub} = require("graphql-subscriptions")
const { v4: uuidv4 } = require('uuid');

const pubsub = new PubSub();

let tasks=[];

module.exports = {
  Query: {
    tasks: () => tasks,
  },
  Mutation: {
    addTask: (_, { title, description, deadline }) => {
      const newTask = {
        id: uuidv4(),
        title,
        description,
        deadline,
        completed: false,
      };
      tasks.push(newTask);
      pubsub.publish('TASK_CREATED',{
        taskCreated:{
          title:title,
          description:description,
          deadline:deadline
        }
      })
      return newTask;
    },
    updateTask: (_, { id, completed }) => {
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        return tasks[taskIndex];
      }
      throw new Error("Task not found");
    },
    deleteTask: (_, { id }) => {
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        const deletedTask = tasks.splice(taskIndex, 1)[0];
        return deletedTask;
      }
      throw new Error("Task not found");
    },
  },
  Subscription: {
    taskCreated:{
      subscribe:()=>pubsub.asyncIterator('TASK_CREATED')
    }
  },
};