import { User } from '../model/user'

export const addUserToLocalStorage = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
}

export const getUserFromLocalStorage = (): User | null => {
  const result = localStorage.getItem('user')
  const user: User | null = result ? JSON.parse(result) : null
  return user
}
