import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const LoginPageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FormContainer = styled.div`
  width: 350px;
  padding: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
`

export const WebsiteLogo = styled.div`
  text-align: center;
  margin-bottom: 50px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
`
export const LabelAndInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  color: #94a3b8;
  font-weight: bold;
  font-size: 12px;
`

export const InputBox = styled.input`
  height: 30px;
  padding-left: 10px;
`

export const LoginBtn = styled.button`
  border: 0;
  background-color: #3b82f6;
  color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
`

export const LoginErrorText = styled.p`
  margin: 0;
  color: red;
`

export const HomePageContainer = styled.div`
    height: 100vh
    background-color: ${props => (props.lightTheme ? '#f9f9f9' : '#181818')};
`

export const NavbarContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  list-style-type: none;
  margin: 0;
  background-color: ${props => (props.lightTheme ? '' : '#313131')};
`

export const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

export const ThemeBtn = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
`

export const GreyOutlineBtn = styled.button`
  background: transparent;
  border: 2px solid #64748b;
  color: #64748b;
  border-radius: 5px;
  cursor: pointer;
`

export const LogoutBtn = styled.button`
  background-color: #3b82f6;
  color: white;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
`

export const BgOfPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`
export const PopupBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  min-width: 300px;
  z-index: 1001;
`
export const LogoutModalBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`

export const Body = styled.div`
  height: calc(100vh - 81px);
  display: flex;
`

export const BodyLeft = styled.div`
  padding: 0 1rem;
  background-color: ${props => (props.lightTheme ? '' : '#313131')};
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 20%;
  color: ${props => (props.lightTheme ? '' : 'white')};
`

export const TabListContainer = styled.ul`
  padding: 0;
  list-style-type: none;
`
export const LogoContainer = styled.div`
  display: flex;
  gap: 5px;
`

export const BodyRight = styled.div``

export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`

export const CloseBtn = styled.button`
  align-self: flex-start;
  background: transparent;
  border: 0;
  cursor: pointer;
`

export const GetItNowBtnOnBanner = styled.button`
  background: transparent;
  border: 2px solid #94a3b8;
  color: #7e858e;
  font-weight: bold;
  padding: 10px;
  border-radius: 3px;
`

export const LoaderContainer = styled.div`
  height: calc(100% - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const VideoListContainerWithSearch = styled.div`
  background-color: ${props => (props.lightTheme ? '#f9f9f9' : '#181818')};
  padding: 1rem;
  overflow: scroll;
  height: ${props =>
    props.displayBanner ? 'calc(100% - 200px)' : 'calc(100%)'};
`

export const InputContainer = styled.div`
  display: flex;
`

export const NoVideoPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 100px);
  margin-top: 2rem;
`
export const VideoListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  list-style-type: none;
`
export const ListItemVideo = styled.li`
  width: 200px;
`
export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${props => (props.lightTheme ? 'black' : 'white')};
`

export const TrendingPageContainer = styled.div`
  background-color: ${props => (props.lightTheme ? '#f9f9f9' : '#0f0f0f')};
  height: 100vh;
`
export const BodyRightTrending = styled.div`
  background-color: #f8fafc;
  padding: 1rem 2rem;
  overflow: scroll;
  background-color: ${props => (props.lightTheme ? '#f9f9f9' : '#0f0f0f')};
`

export const ContactUsHeading = styled.h1`
  color: ${props => (props.lightTheme ? 'black' : 'white')};
`

export const ListContainerTrendingPage = styled.div`
  padding: 0;
  list-style-type: none;
`
export const ListItemTrendingPage = styled.li`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`

export const ListContainerGamingPage = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  list-style-type: none;
`

export const ListItemGamingPage = styled(Link)`
  display: block;
  color: ${props => (props.lightTheme ? 'black' : 'white')};
  text-decoration: none;
`

export const NoSavedVideoListContainer = styled.div`
  height: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ParaText = styled.p`
  color: ${props => (props.lightTheme ? 'black' : 'white')};
`

export const TabItem = styled.p`
  margin: 0;
  padding: 12px;
  background-color: ${props => (props.isActive ? '#7e858e' : '')};
  font-weight: ${props => (props.isActive ? 'bold' : '')};
  color: ${props => (props.lightTheme ? 'black' : 'white')};
`

export const UploadTimeAndLikeDislikeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => (props.lightTheme ? 'black' : 'white')};
`

export const LikeDislikeContainer = styled.div`
  display: flex;
  gap: 2rem;
`
export const LikeBtn = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  color: ${props => (props.likeState ? '#2563eb' : '#64748b')};
`

export const DislikeBtn = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  color: ${props => (props.dislikeState ? '#2563eb' : '#64748b')};
`

export const SaveButton = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  color: ${props => (props.videoPresent ? '#2563eb' : '#64748b')};
`

export const TextContainerVideoItemDetails = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  color: ${props => (props.lightTheme ? 'black' : 'white')};
`

export const NotFoundPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const NotFoundBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Footer = styled.ul`
  background-color: ${props => (props.lightTheme ? '#f9f9f9' : '#0f0f0f')};
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 0px;
  list-style-type: none;
  padding: 0;
  margin: 0;
`
