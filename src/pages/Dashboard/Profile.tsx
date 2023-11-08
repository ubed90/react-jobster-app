import React, { useState } from 'react'
import { DashboardFormWrapper } from '../../assets/wrappers'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../Store'
import { User } from '../../model/user'
import { toast } from 'react-toastify'
import { FormRow } from '../../components'
import { updateUser } from '../../features/user'

const Profile = () => {
  const { isLoading, user } = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()

  // * Local User State
  const [userData, setUserData] = useState<User>({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      !userData.name ||
      !userData.email ||
      !userData.lastName ||
      !userData.location
    ) {
      toast.error('Please Fill out All Fields')
      return
    }

    dispatch(updateUser(userData))
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name
    const value = event.target.value

    setUserData({ ...userData, [name]: value })
  }

  return (
    <DashboardFormWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </DashboardFormWrapper>
  )
}

export default Profile
