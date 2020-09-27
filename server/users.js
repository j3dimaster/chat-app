const users = []

/**
 * Check if user exists in room
 *
 * @param {string} name - name of the user to check
 * @param {string} room - room of the user to check
 */
const existUser = (name, room) => {
  const existingUser = users.find((user) => user.room === room && user.name === name)

  if (existingUser) {
    return { error: 'Username is taken' }
  }
  return false
}

/**
 * Add user in room, otherwise return error
 *
 * @param {Object} user - user object
 * @param {string} user.id - user's id
 * @param {string} user.room - user's room
 * @param {string} user.name - user's name
 */
const addUser = (user) => {
  const name = user.name.trim().toLowerCase()
  const room = user.room.trim().toLowerCase()

  // if user already exist in room, return error
  const { error } = existUser(name, room)

  if (error) {
    return { error: 'Username is taken' }
  }

  // create new user
  const newUser = { id: user.id, name, room }
  users.push(newUser)
  return { newUser }
}

/**
 * Remove user using given id
 *
 * @param {string} id - user's id
 */
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)
  // if there is an index
  if (index !== -1) {
    return users.splice(index, 1)[0] // return spliced user
  }
  return false
}

/**
 * get specific user using given id
 *
 * @param {string} id - user's id
 */
const getUser = (id) => users.find((user) => user.id === id)

/**
 * get users from specific room using given id
 *
 * @param {string} room - room's name
 */
const getUserInRoom = (room) => users.filter((user) => user.room === room)

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
}
