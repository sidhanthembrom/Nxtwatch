import {Link} from 'react-router-dom'

import {TabItem} from '../../styledComponents'

import SavedVideoListContext from '../../SavedVideoListContext/SavedVideoListContext'

const TabItems = props => {
  const {isActive, tab, changeActiveTab} = props

  const changingActiveTab = () => {
    changeActiveTab(tab.tabId)
  }

  return (
    <SavedVideoListContext.Consumer>
      {value => {
        const {lightTheme} = value

        return (
          <Link to={tab.link}>
            <li onClick={changingActiveTab}>
              <TabItem lightTheme={lightTheme} isActive={isActive}>
                {tab.displayText}
              </TabItem>
            </li>
          </Link>
        )
      }}
    </SavedVideoListContext.Consumer>
  )
}

export default TabItems
