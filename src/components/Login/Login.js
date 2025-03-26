import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

import {
  LoginPageContainer,
  FormContainer,
  WebsiteLogo,
  Form,
  LabelAndInputContainer,
  Label,
  InputBox,
  LoginBtn,
  LoginErrorText,
} from '../../styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    passwordVisibility: false,
    loginError: false,
    loginErrorText: '',
  }

  settingUsername = event => {
    this.setState({username: event.target.value})
  }

  settingPassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    console.log('submitted')

    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 1})

      const {history} = this.props
      history.replace('/')
    } else {
      console.log(data.error_msg)
      this.setState({loginError: true, loginErrorText: data.error_msg})
    }
  }

  changePasswordVisibility = event => {
    if (event.target.checked) {
      this.setState({passwordVisibility: true})
    } else {
      this.setState({passwordVisibility: false})
    }
  }

  render() {
    const {username, password, passwordVisibility, loginError, loginErrorText} =
      this.state

    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <LoginPageContainer>
        <FormContainer>
          <WebsiteLogo>
            <img
              width="200px"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </WebsiteLogo>
          <Form onSubmit={this.submitForm}>
            <LabelAndInputContainer>
              <Label htmlFor="input-username">USERNAME</Label>
              <InputBox
                onChange={this.settingUsername}
                value={username}
                id="input-username"
                placeholder="Username"
                type="text"
              />
            </LabelAndInputContainer>
            <LabelAndInputContainer>
              <Label htmlFor="input-password">PASSWORD</Label>
              <InputBox
                onChange={this.settingPassword}
                id="input-password"
                value={password}
                placeholder="Password"
                type={passwordVisibility ? 'text' : 'password'}
              />
            </LabelAndInputContainer>
            <div>
              <input
                onChange={this.changePasswordVisibility}
                id="input-checkbox"
                type="checkbox"
              />
              <label htmlFor="input-checkbox">Show Password</label>
            </div>
            <LoginBtn>Login</LoginBtn>
            {loginError && (
              <LoginErrorText>{`*${loginErrorText}`}</LoginErrorText>
            )}
          </Form>
        </FormContainer>
      </LoginPageContainer>
    )
  }
}

export default Login
