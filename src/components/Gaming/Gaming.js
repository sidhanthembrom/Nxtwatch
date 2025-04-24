import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Popup from 'reactjs-popup'

import {formatDistanceToNow} from 'date-fns'

import {
  FaMoon,
  FaSun,
  FaHome,
  FaFire,
  FaGamepad,
  FaBookmark,
} from 'react-icons/fa'

import {
  NavbarContainer,
  NavbarRight,
  ThemeBtn,
  GreyOutlineBtn,
  LogoutBtn,
  BgOfPopup,
  PopupBox,
  LogoutModalBtnContainer,
  Body,
  BodyLeft,
  TabListContainer,
  LogoContainer,
  LoaderContainer,
  TrendingPageContainer,
  BodyRightTrending,
  ContactUsHeading,
  ListContainerGamingPage,
  ListItemGamingPage,
  Footer,
} from '../../styledComponents'

import TabItems from '../TabItems/TabItems'
import './Gaming.css'

import SavedVideoListContext from '../../SavedVideoListContext/SavedVideoListContext'

const tabs = [
  {tabId: 'HOME', displayText: 'Home', icon: FaHome, link: '/'},
  {tabId: 'TRENDING', displayText: 'Trending', icon: FaFire, link: '/trending'},
  {tabId: 'GAMING', displayText: 'Gaming', icon: FaGamepad, link: '/gaming'},
  {
    tabId: 'SAVED VIDEOS',
    displayText: 'Saved videos',
    icon: FaBookmark,
    link: '/saved-videos',
  },
]

class Gaming extends Component {
  state = {tabId: 'GAMING', trendingVideoList: [], isLoading: true}

  componentDidMount() {
    this.fetchTrendingVideo()
  }

  fetchTrendingVideo = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    const response = await fetch(`https://apis.ccbp.in/videos/gaming`, options)
    const data = await response.json()

    // console.log(data)
    this.setState({trendingVideoList: data.videos, isLoading: false})
  }

  changeActiveTab = id => {
    this.setState({tabId: id})
    // console.log(id)
  }

  getUploadInfoInWords = uploadDate => formatDistanceToNow(new Date(uploadDate))

  clickToLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {tabId, trendingVideoList, isLoading} = this.state

    // console.log(tabId)

    return (
      <SavedVideoListContext.Consumer>
        {value => {
          const {lightTheme, changeTheme} = value

          const clickToChangeTheme = () => {
            changeTheme()
          }

          return (
            <TrendingPageContainer lightTheme={lightTheme} data-testid="gaming">
              <NavbarContainer lightTheme={lightTheme}>
                <Link to="/">
                  <img
                    className="navbar-logo"
                    src={
                      lightTheme
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    }
                    alt="website logo"
                  />
                </Link>
                <NavbarRight>
                  <ThemeBtn onClick={clickToChangeTheme} data-testid="theme">
                    {lightTheme ? (
                      <FaMoon size="20px" />
                    ) : (
                      <FaSun color="white" size="20px" />
                    )}
                  </ThemeBtn>
                  <img
                    width="30px"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-img"
                  />
                  <Popup
                    modal
                    trigger={<GreyOutlineBtn>Logout</GreyOutlineBtn>}
                  >
                    {close => (
                      <BgOfPopup>
                        <PopupBox>
                          <div>
                            <p>Are you sure you want to logout?</p>
                          </div>
                          <LogoutModalBtnContainer>
                            <GreyOutlineBtn onClick={() => close()}>
                              Cancel
                            </GreyOutlineBtn>
                            <LogoutBtn onClick={this.clickToLogout}>
                              Confirm
                            </LogoutBtn>
                          </LogoutModalBtnContainer>
                        </PopupBox>
                      </BgOfPopup>
                    )}
                  </Popup>
                </NavbarRight>
              </NavbarContainer>
              <Body>
                <BodyLeft className="bodyLeft" lightTheme={lightTheme}>
                  <TabListContainer>
                    {tabs.map(tab => (
                      <TabItems
                        changeActiveTab={this.changeActiveTab}
                        key={tab.tabId}
                        isActive={tab.tabId === tabId}
                        tab={tab}
                      />
                    ))}
                  </TabListContainer>
                  <div className="contact-us-section">
                    <p>CONTACT US</p>
                    <LogoContainer>
                      <img
                        width="40px"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                        alt="facebook logo"
                      />
                      <img
                        width="40px"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                        alt="twitter"
                      />
                      <img
                        width="40px"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                        alt="linkedin logo"
                      />
                    </LogoContainer>
                    <p>Enjoy! Now to see your channels and recommendations!</p>
                  </div>
                </BodyLeft>

                <BodyRightTrending
                  className="bodyRightTrending"
                  lightTheme={lightTheme}
                >
                  <ContactUsHeading lightTheme={lightTheme}>
                    Gaming
                  </ContactUsHeading>
                  {isLoading ? (
                    <LoaderContainer data-testid="loader">
                      <Loader
                        type="ThreeDots"
                        color="blue"
                        height="50"
                        width="50"
                      />
                    </LoaderContainer>
                  ) : (
                    <ListContainerGamingPage className="listContainerGamingPage">
                      {trendingVideoList.map(video => (
                        <li key={video.id}>
                          <ListItemGamingPage
                            lightTheme={lightTheme}
                            to={`/videos/${video.id}`}
                          >
                            <img
                              width="220px"
                              src={video.thumbnail_url}
                              alt="video thumbnail"
                            />
                            <p>{video.title}</p>
                            <p>{`${video.view_count} Watching Worldwide`}</p>
                          </ListItemGamingPage>
                        </li>
                      ))}
                    </ListContainerGamingPage>
                  )}
                </BodyRightTrending>
              </Body>
              <Footer className="footer" lightTheme={lightTheme}>
                {tabs.map(item => {
                  const Icon = item.icon
                  return (
                    <Link
                      to={item.link}
                      key={item.tabId}
                      className={item.tabId === tabId ? 'selected' : ''}
                      onClick={() => {
                        this.changeActiveTab(item.tabId)
                      }}
                    >
                      <Icon color={lightTheme ? 'black' : 'white'} />
                    </Link>
                  )
                })}
              </Footer>
            </TrendingPageContainer>
          )
        }}
      </SavedVideoListContext.Consumer>
    )
  }
}

export default Gaming
