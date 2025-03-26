import {NotFoundPageContainer, NotFoundBody} from '../../styledComponents'

const NotFound = () => (
  <NotFoundPageContainer>
    <NotFoundBody>
      <img
        width="400px"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found.</p>
    </NotFoundBody>
  </NotFoundPageContainer>
)

export default NotFound
