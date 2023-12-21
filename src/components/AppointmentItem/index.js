// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {AppointmentDetails, toggleIsFavorite} = props
  const {title, date, isFavorite, id} = AppointmentDetails

  const isFavoriteImageUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavorite = () => {
    toggleIsFavorite(id)
  }

  return (
    <li className="appointment-card">
      <div className="card-top-section">
        <p className="title">{title}</p>
        <button data-testid="star" onClick={onClickFavorite} type="button">
          <img src={isFavoriteImageUrl} alt="star" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
