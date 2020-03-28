import { users } from './db'

console.log(users)

const resolvers = {
    Query: {
        users: (parent, args, context, info) => {
            return users
        },
        user: (parent, { id }, context, info) => {
            console.log(id)
            let result = users.find(user => user.id == id)
            console.log(result)
            return result
        },
        hello: () => "Hello World!"
    },
    Mutation: {
        createUser: (parent, { id, name, email, age }, context, info) => {
            const newUser = {
                id, name, email, age
            }
            users.push(newUser)
            return newUser
        },
        updateUser: (parent, { id, name, email, age }, context, info) => {
            let newUser = users.find(user => user.id == id)
            newUser.name = name
            newUser.email = email
            newUser.age = age
            return newUser
        },
        deleteUser: (parent, { id }, context, info) => {
            let userIndex = users.findIndex(user => user.id == id)
            if (userIndex == -1) throw new Error("User not found.")
            const deletedUsers = users.splice(userIndex, 1)
            return deletedUsers[0]
        }
    }
}

export default resolvers
