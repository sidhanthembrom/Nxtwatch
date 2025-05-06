import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './Login.css'

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
    const {
      username,
      password,
      passwordVisibility,
      loginError,
      loginErrorText,
    } = this.state

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
            <div className="show-password-container">
              <input
                onChange={this.changePasswordVisibility}
                id="input-checkbox"
                type="checkbox"
              />
              <label id="show-password-text" htmlFor="input-checkbox">
                Show Password
              </label>
            </div>
            <LoginBtn>Login</LoginBtn>
            {loginError && (
              <LoginErrorText>{`*${loginErrorText}`}</LoginErrorText>
            )}
          </Form>
          <div className="demo-credentials-container">
            <h3 className="demo-credentials-title">Demo Credentials:</h3>
            <div className="img-container-with-text">
              <img
                height="15px"
                src="https://media-hosting.imagekit.io/a97e54910f0f46df/user.png?Expires=1841150697&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=J-fins-cD38301XXOUx~onf4V4wWPii8D2Ly-DZtOlnw3yijt4nXgHV9twbGVvDHHNkggdqQjhkkU8L4omSjCO5YQDlYTbF43CADzTzY8cXGtEz2W3OCWGJqTZg7ap~seSi66lAc134c-o4Hm3xXoSTeV0TE7tQ3eHnrI4R8EJwYcAbhVsrYqTgw2aNkJQrE2w~PAcF~n2~9a~OrKu4AFcuP7MjvRpMkPBGKG82SCfHR~Z1nBNl1TmoKE19NdWreBpWwj5ThhnavSFOqDTMxDStvKgtVCtAeWkvhGgtbLjIoF5TYd1-10SOvkT-FSpyHvswIdH6n9URySZwYA53pOA__"
                alt="username-icon"
              />
              <p>rahul</p>
            </div>
            <div className="img-container-with-text">
              <img
                height="16px"
                src="https://media-hosting.imagekit.io/c9053b4c997b4640/padlock.png?Expires=1841149277&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=stMSBv~xD1fbxCQErUBH0NepflvXwtZtwskDUVGz96KDzTCm5Y6pbgF5BgjKbjM5TALOloqa5bKVNbD6exezkikd25s~uWzPo3uM6ztIRYjY9S1P8-2LdWM6KS2UjlA8YyVbc06-CoF52Ip8gofEod1GwXoil7WuepO6qW5NDZnvLIV4n81nA0FceiUiQXQlhQe78z6w6d~-ZQm3cWCJ6O4rp9hzy2N1RRPTzjOiH~8l4MrX3X9R26wNDPmJ1a7Nl26m9cNyN5zZJiry1fgYldU0eSBiJ5pU3r3fKKDbAQk-1BXo4-pn~xdAuzhQOUsZVuc0tcEG4GfVbw2hLfGNzw__"
                alt="password-icon"
              />
              <p>rahul@2021</p>
            </div>
          </div>
        </FormContainer>
      </LoginPageContainer>
    )
  }
}

export default Login
