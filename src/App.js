import {Switch, Route} from 'react-router-dom'

import {Component} from 'react'
import SavedVideoListContext from './SavedVideoListContext/SavedVideoListContext'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Trending from './components/Trending/Trending'
import Gaming from './components/Gaming/Gaming'
import VideoItemDetails from './components/VideoItemDetails/VideoItemDetails'
import SavedVideos from './components/SavedVideos/SavedVideos'
import NotFound from './components/NotFound/NotFound'

import './App.css'

// Replace your code here
class App extends Component {
  state = {savedList: [], saveState: false, lightTheme: true}

  addVideoToSavedList = videoDetaills => {
    this.setState(prevState => ({
      savedList: [...prevState.savedList, videoDetaills],
    }))
  }

  deleteVideoFromSavedList = videoDetaills => {
    console.log('deleted')
    const {savedList} = this.state

    const updatedVideo = savedList.filter(item => item.id !== videoDetaills.id)
    this.setState({savedList: updatedVideo})
  }

  // choose between adding or deleting a video
  updateSavedVideoList = videoDetaills => {
    const {saveState} = this.state

    if (saveState) {
      this.addVideoToSavedList(videoDetaills)
    } else {
      this.deleteVideoFromSavedList(videoDetaills)
    }
  }

  updateSave = videoDetaills => {
    const {savedList} = this.state
    const isPresent = savedList.find(item => item.id === videoDetaills.id)

    this.setState({saveState: !isPresent}, () => {
      this.updateSavedVideoList(videoDetaills)
    })
  }

  changeTheme = () => {
    this.setState(prevState => ({
      lightTheme: !prevState.lightTheme,
    }))
  }

  render() {
    const {lightTheme, savedList, saveState} = this.state

    return (
      <SavedVideoListContext.Provider
        value={{
          saveState,
          updateSave: this.updateSave,
          savedList,
          addVideoToSavedList: this.addVideoToSavedList,
          deleteVideoFromSavedList: this.deleteVideoFromSavedList,
          lightTheme,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </SavedVideoListContext.Provider>
    )
  }
}

export default App
