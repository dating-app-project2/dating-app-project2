import React, { useEffect } from "react"
import routes from "./routes"
import Header from './components/Header'
import { withRouter } from "react-router-dom"
import { getUser } from "./redux/authReducer"
import { connect } from "react-redux"
import { createUseStyles } from "react-jss"
import { variables } from './globalStyles/globalStyles'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const {primary}  = variables
const useStyles = createUseStyles({
  app: {
    backgroundColor: primary,
    textAlign: "center",
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "100vh"
  },
  sideBarLayout: {
    width: '100%',
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center'
  },
})

const App = ({ getUser, user }) => {
  const { app, sideBarLayout } = useStyles()
  useEffect(() => {
    getUser()
  }, [getUser])
  return (
    <div className={app}>
      <Header />
      <div className={sideBarLayout}>
        {/* {JSON.stringify(user)} */}
        {routes}
      </div>
      <ToastContainer />
    </div>
  )
}

const mapStateToProps = state => {
  const { user } = state.auth
  return {user}
}

const mapDispatchToProps = {
  getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))