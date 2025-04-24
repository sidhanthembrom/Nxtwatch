import {Link} from 'react-router-dom'

import {TabItem} from '../../styledComponents'
import './TabItem.css'

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
          <Link to={tab.link} className="tab-links">
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
