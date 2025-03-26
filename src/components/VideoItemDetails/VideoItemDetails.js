import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import ReactPlayer from 'react-player'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {formatDistanceToNow} from 'date-fns'

import {FaMoon, FaSun} from 'react-icons/fa'

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
  ParaText,
  UploadTimeAndLikeDislikeContainer,
  LikeDislikeContainer,
  LikeBtn,
  DislikeBtn,
  SaveButton,
  TextContainerVideoItemDetails,
} from '../../styledComponents'

import TabItems from '../TabItems/TabItems'

import SavedVideoListContext from '../../SavedVideoListContext/SavedVideoListContext'

const tabs = [
  {tabId: 'HOME', displayText: 'Home', link: '/'},
  {tabId: 'TRENDING', displayText: 'Trending', link: '/trending'},
  {tabId: 'GAMING', displayText: 'Gaming', link: '/gaming'},
  {tabId: 'SAVED VIDEOS', displayText: 'Saved videos', link: '/saved-videos'},
]

class VideoItemDetails extends Component {
  state = {
    tabId: '',
    video: {},
    isLoading: true,
    likeState: false,
    dislikeState: false,
  }

  componentDidMount() {
    this.fetchVideo()
  }

  fetchVideo = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
    const data = await response.json()

    console.log(data)
    this.setState({video: data.video_details, isLoading: false})
  }

  getUploadInfoInWords = uploadDate => formatDistanceToNow(new Date(uploadDate))

  likeBtn = () => {
    const {dislikeState, likeState} = this.state

    if (dislikeState) {
      this.setState({dislikeState: false, likeState: true})
    } else {
      this.setState({likeState: true})
    }
    if (likeState) {
      this.setState({likeState: false})
    }
  }

  dislikeBtn = () => {
    const {dislikeState, likeState} = this.state

    if (likeState) {
      this.setState({likeState: false, dislikeState: true})
    } else {
      this.setState({dislikeState: true})
    }
    if (dislikeState) {
      this.setState({dislikeState: false})
    }
  }

  changeActiveTab = id => {
    this.setState({tabId: id})
    console.log(id)
  }

  render() {
    const {tabId, video, isLoading, likeState, dislikeState} = this.state

    return (
      <SavedVideoListContext.Consumer>
        {value => {
          const {updateSave, savedList, lightTheme, changeTheme} = value

          const videoPresent = savedList.find(item => item.id === video.id)

          const clickToChangeTheme = () => {
            changeTheme()
          }

          return (
            <TrendingPageContainer
              lightTheme={lightTheme}
              data-testid="videoItemDetails"
            >
              <NavbarContainer lightTheme={lightTheme}>
                <Link to="/">
                  <img
                    width="200px"
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
                <BodyLeft lightTheme={lightTheme}>
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
                <BodyRightTrending lightTheme={lightTheme}>
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
                    <div>
                      <ReactPlayer width="100%" url={video.video_url} />
                      <ParaText lightTheme={lightTheme}>{video.title}</ParaText>
                      <UploadTimeAndLikeDislikeContainer
                        lightTheme={lightTheme}
                      >
                        <p>
                          {`${video.view_count} views`} |{' '}
                          {this.getUploadInfoInWords(video.published_at)}
                        </p>
                        <LikeDislikeContainer>
                          <LikeBtn likeState={likeState} onClick={this.likeBtn}>
                            Like
                          </LikeBtn>

                          <DislikeBtn
                            dislikeState={dislikeState}
                            onClick={this.dislikeBtn}
                          >
                            Dislike
                          </DislikeBtn>

                          <SaveButton
                            videoPresent={videoPresent}
                            onClick={() => updateSave(video)}
                          >
                            {videoPresent ? 'Saved' : 'Save'}
                          </SaveButton>
                        </LikeDislikeContainer>
                      </UploadTimeAndLikeDislikeContainer>
                      <hr />
                      <TextContainerVideoItemDetails lightTheme={lightTheme}>
                        <img
                          width="40px"
                          src={video.channel.profile_image_url}
                          alt="channel logo"
                        />
                        <div>
                          <p>{video.channel.name}</p>
                          <p>{`${video.channel.subscriber_count} subscribers`}</p>
                          <p>{video.description}</p>
                        </div>
                      </TextContainerVideoItemDetails>
                    </div>
                  )}
                </BodyRightTrending>
              </Body>
            </TrendingPageContainer>
          )
        }}
      </SavedVideoListContext.Consumer>
    )
  }
}

export default VideoItemDetails
