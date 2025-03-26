import React from 'react'

const SavedVideoListContext = React.createContext({
  saveState: false,
  updateSave: () => {},
  resetSaveState: () => {},
  savedList: [],
  addVideoToSavedList: () => {},
  deleteVideoFromSavedList: () => {},
  lightTheme: true,
  changeTheme: () => {},
})

export default SavedVideoListContext
