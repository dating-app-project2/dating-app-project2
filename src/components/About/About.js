import React from "react"
import {createUseStyles} from 'react-jss'
import { page } from '../../globalStyles/globalStyles'

const useStyles = createUseStyles({
  about: {
    ...page,
    margin: {bottom: '5vh'},
    paddingBottom: 20,
    paddingLeft: 20,
    textAlign: 'left',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})

const About = () => {
  const {about} = useStyles()
  return (
    <div className={about}>
      <h2>Core Technologies</h2>
      <ul>
        <li>Database - PostgreSQL</li>
        <li>Server - Node</li>
        <li>Frontend - React</li>
        <li>State Management/Component Lifecycle:</li>
        <ul>
          <li>React-Redux</li>
          <li>React-Hooks</li>
          <ul>
            <li>useState</li>
            <li>useEffect</li>
            <li>useRef</li>
            <li>custom hooks</li>
          </ul>
        </ul>
        <li>HTTP calls - axios</li>
      </ul>
      <h2>Form Construction:</h2>
      <ul>
        <li>Form Functionality: Formik</li>
        <li>Form Basic Style: Material-ui</li>
        <li>Form Validation Schema: Yup</li>
      </ul>
      <h2>CSS in JS/Styling:</h2>
      <ul>
        <li>JSS</li>
        <li>React-JSS</li>
      </ul>
      <h2>Live Chat:</h2>
      <ul>
        <li>Socket.io</li>
      </ul>
      <h2>Email Service:</h2>
      <ul>
        <li>Nodemailer</li>
      </ul>
      <h2>Alert Messages:</h2>
      <ul>
        <li>React-toastify</li>
      </ul>
      <h2>Icons:</h2>
      <ul>
        <li>React-Icons</li>
      </ul>
    </div>
  )
}

export default About
