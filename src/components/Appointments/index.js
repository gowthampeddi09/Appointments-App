// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', isStarredActive: false}

  /* onStarredAppointments = () => {
    const {appointmentList} = this.state
    const starredAppointments = appointmentList.filter(
      eachAppointment => eachAppointment.isFavorite === true,
    )
    this.setState({appointmentList: starredAppointments})
  } */

  onStarredAppointments = () => {
    this.setState(prevState => ({isStarredActive: !prevState.isStarredActive}))
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  renderAppointmentList = () => {
    const {appointmentList, isStarredActive} = this.state
    const filteredAppointments = isStarredActive
      ? appointmentList.filter(appointment => appointment.isFavorite)
      : appointmentList

    return filteredAppointments.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        AppointmentDetails={eachAppointment}
        toggleIsFavorite={this.toggleIsFavorite}
      />
    ))
  }

  addNewAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeText = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {title, date} = this.state
    return (
      <div className="app">
        <div className="appointments-card">
          <div className="add-appointment-container">
            <form
              className="appointments-card"
              onSubmit={this.addNewAppointment}
            >
              <h1 className="card-heading">Add Appointment</h1>
              <label className="input-label" htmlFor="Title">
                Title
              </label>
              <input
                value={title}
                type="text"
                id="Title"
                className="user-input"
                placeholder="Title"
                onChange={this.onChangeText}
              />
              <label className="input-label" htmlFor="Date">
                Date
              </label>

              <input
                value={date}
                type="date"
                id="Date"
                className="user-input"
                onChange={this.onChangeDate}
              />
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              className="app-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>

          <hr className="line" />
          <div className="new-appointment-top-section">
            <h1 className="heading">Appointments</h1>
            <button
              className="starred-button"
              type="button"
              onClick={this.onStarredAppointments}
            >
              Starred
            </button>
          </div>
          <div>
            <ul className="new-appointment-container">
              {this.renderAppointmentList()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
