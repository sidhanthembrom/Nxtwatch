import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {formatDistanceToNow} from 'date-fns'
import {
  FaMoon,
  FaSearch,
  FaSun,
  FaHome,
  FaFire,
  FaGamepad,
  FaBookmark,
} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import SavedVideoListContext from '../../SavedVideoListContext/SavedVideoListContext'

import TabItems from '../TabItems/TabItems'

import {
  HomePageContainer,
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
  BodyRight,
  BannerContainer,
  GetItNowBtnOnBanner,
  CloseBtn,
  LoaderContainer,
  VideoListContainerWithSearch,
  ContactUsHeading,
  ParaText,
  InputContainer,
  NoVideoPageContainer,
  VideoListContainer,
  ListItemVideo,
  TextContainer,
  Footer,
} from '../../styledComponents'
import './Home.css'

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

class Home extends Component {
  state = {
    videosList: [],
    searchText: '',
    search: '',
    tabId: 'HOME',
    isLoading: true,
    displayBanner: true,
  }

  componentDidMount() {
    this.fetchHomeVideo()
  }

  fetchHomeVideo = async () => {
    const {search} = this.state

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${search}`,
      options,
    )
    const data = await response.json()

    // console.log(data)
    this.setState({videosList: data.videos, isLoading: false})
  }

  changeActiveTab = id => {
    this.setState({tabId: id})
    // console.log(id)
  }

  searchForVideo = event => {
    this.setState({searchText: event.target.value})
  }

  clickToSearch = () => {
    const {searchText} = this.state
    this.setState({search: searchText, isLoading: true}, this.fetchHomeVideo)
  }

  changeStatusOfBanner = () => {
    this.setState({displayBanner: false})
  }

  getUploadInfoInWords = uploadDate => formatDistanceToNow(new Date(uploadDate))

  clickToLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {videosList, tabId, isLoading, searchText, displayBanner} = this.state

    return (
      <SavedVideoListContext.Consumer>
        {value => {
          const {lightTheme, changeTheme} = value

          const clickToChangeTheme = () => {
            changeTheme()
          }

          return (
            <HomePageContainer lightTheme={lightTheme} data-testid="home">
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
                  />
                  <Popup
                    modal
                    trigger={<GreyOutlineBtn>Logout</GreyOutlineBtn>}
                  >
                    {close => (
                      <BgOfPopup>
                        <PopupBox>
                          <div>
                            <p>Are you sure, you want to logout?</p>
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
                        alt="twitter logo"
                      />
                      <img
                        width="40px"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                        alt="linked in logo"
                      />
                    </LogoContainer>
                    <p>Enjoy! Now to see your channels and recommendations!</p>
                  </div>
                </BodyLeft>

                <BodyRight className="bodyRight">
                  {displayBanner ? (
                    <BannerContainer data-testid="banner">
                      <div>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="banner-img"
                        />
                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        <GetItNowBtnOnBanner>GET IT NOW</GetItNowBtnOnBanner>
                      </div>
                      <CloseBtn
                        onClick={this.changeStatusOfBanner}
                        data-testid="close"
                      >
                        <AiOutlineClose />
                      </CloseBtn>
                    </BannerContainer>
                  ) : null}

                  {isLoading ? (
                    <LoaderContainer data-testid="loader">
                      <Loader
                        type="ThreeDots"
                        color="#3b82f6"
                        height="50"
                        width="50"
                      />
                    </LoaderContainer>
                  ) : (
                    <VideoListContainerWithSearch
                      displayBanner={displayBanner}
                      lightTheme={lightTheme}
                    >
                      <InputContainer className="inputContainer">
                        <input
                          onChange={this.searchForVideo}
                          value={searchText}
                          type="search"
                          placeholder="Search"
                        />
                        <button
                          type="button"
                          data-testid="searchButton"
                          onClick={this.clickToSearch}
                          className="searchButton"
                        >
                          <FaSearch />
                        </button>
                      </InputContainer>
                      {videosList.length === 0 ? (
                        <NoVideoPageContainer>
                          <img
                            width="200px"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                            alt="no videos"
                          />
                          <ContactUsHeading lightTheme={lightTheme}>
                            No Search Results Found
                          </ContactUsHeading>
                          <ParaText lightTheme={lightTheme}>
                            Try different key words or remove search filter
                          </ParaText>
                        </NoVideoPageContainer>
                      ) : (
                        <VideoListContainer className="videoListContainer">
                          {videosList.map(video => (
                            <ListItemVideo key={video.id}>
                              <Link
                                to={`/videos/${video.id}`}
                                className="links"
                              >
                                <img
                                  width="100%"
                                  src={video.thumbnail_url}
                                  alt="video thumbnail"
                                />
                                <TextContainer lightTheme={lightTheme}>
                                  <img
                                    width="30px"
                                    src={video.channel.profile_image_url}
                                    alt="channel logo"
                                  />
                                  <div>
                                    <p>{video.title}</p>
                                    <p>{video.channel.name}</p>
                                    <p>
                                      {video.view_count}
                                      {this.getUploadInfoInWords(
                                        video.published_at,
                                      )}
                                    </p>
                                  </div>
                                </TextContainer>
                              </Link>
                            </ListItemVideo>
                          ))}
                        </VideoListContainer>
                      )}
                    </VideoListContainerWithSearch>
                  )}
                </BodyRight>
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
            </HomePageContainer>
          )
        }}
      </SavedVideoListContext.Consumer>
    )
  }
}

export default Home
