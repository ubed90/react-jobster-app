import { useEffect, useState } from 'react'
import { RegisterWrapper } from '../assets/wrappers'
import { FormRow, Logo } from '../components'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../Store'
import { loginUser, registerUser } from '../features/user'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const [values, setValues] = useState<typeof initialState>(initialState)

  // * RTK
  const { user, isLoading } = useSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  // * useEffect to Check when User is Logged In
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [user])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // const formData = new FormData(event.target as HTMLFormElement)
    // const data = Object.fromEntries(formData)
    // console.log(data)

    const { email, isMember, name, password } = values

    if (!email || !password || (!isMember && !name)) {
      toast.error('Please Fill All Fields')
      return
    }

    if (isMember) {
      dispatch(loginUser({ email, password }))
      return
    }

    return dispatch(registerUser({ name, email, password }))
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  return (
    <RegisterWrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            label="name"
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          label="email"
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          label="password"
        />
        <button type="submit" disabled={isLoading} className="btn btn-block">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        <button
          type="button"
          disabled={isLoading}
          className="btn btn-block"
          onClick={() =>
            dispatch(
              loginUser({ email: 'testUser@test.com', password: 'secret' })
            )
          }
        >
          {isLoading ? 'Loading...' : 'Demo User'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </RegisterWrapper>
  )
}

export default Register
