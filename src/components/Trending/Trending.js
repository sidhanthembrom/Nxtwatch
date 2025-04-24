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

import SavedVideoListContext from '../../SavedVideoListContext/SavedVideoListContext'

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
  ParaText,
  Footer,
  ListContainerTrendingPage,
} from '../../styledComponents'

import './Trending.css'

import TabItems from '../TabItems/TabItems'

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

class Trending extends Component {
  state = {tabId: 'TRENDING', trendingVideoList: [], isLoading: true}

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

    const response = await fetch(
      `https://apis.ccbp.in/videos/trending`,
      options,
    )
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
            <TrendingPageContainer
              lightTheme={lightTheme}
              data-testid="trending"
            >
              <NavbarContainer lightTheme={lightTheme}>
                <li>
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
                </li>
                <li>
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
                </li>
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
                    Trending
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
                    <ListContainerTrendingPage>
                      {trendingVideoList.map(video => (
                        <li key={video.id}>
                          <Link
                            to={`/videos/${video.id}`}
                            className="trending-links"
                          >
                            <img
                              className="trending-page-list-item-img"
                              src={video.thumbnail_url}
                              alt="video thumbnail"
                            />
                            <div>
                              <ParaText lightTheme={lightTheme}>
                                {video.title}
                              </ParaText>
                              <ParaText lightTheme={lightTheme}>
                                {video.channel.name}
                              </ParaText>
                              <ParaText lightTheme={lightTheme}>
                                {video.view_count} |{' '}
                                {this.getUploadInfoInWords(video.published_at)}
                              </ParaText>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ListContainerTrendingPage>
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

export default Trending
