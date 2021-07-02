import React from "react"
import { Formik, Form } from "formik"
import Button from "@material-ui/core/Button"
import CustomTextField from "../CustomTextField/CustomTextField"
import { } from "../../schema/schema"
import { connect } from "react-redux"
import { setUser } from "../../redux/authReducer"
import { createUseStyles } from "react-jss"
import { page } from '../../globalStyles/globalStyles'
import axios from "axios"
import { toast } from "react-toastify"

const useStyles = createUseStyles({
    registerForm: {
        ...page
    },
    formSection: {
        width: "50%",
        height: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    },
    "@media (max-width: 850px)": {
        registerForm: {
            minHeight: "80vh"
        },
        formSection: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            flexFlow: "column",
            justifyContent: "space-between"
        }
    }
})
//The profile page will be very similar to the RegisterSurveyPage. We will update the users table with any info they decide to edit
//this will also be the page where a user can add 6 profile pictures


const ProfilePage = ({ history, setUser }) => {

    const { registerForm, formSection } = useStyles()

    // const finishRegister = body => {
    //     console.log(body)
    //     axios.put(`/profile/get`, body)
    //         .then(results => {
    //             setUser(results.data)
    //             history.push('/swipingPage')

    //         })
    //         .catch(err => toast.error(err.response.data))
    // }

    return (
        <Formik
            initialValues={{
                first: '',
                last: '',
                age: '',
                gender: '',
                rel_type: '',
                sexual_or: ''
            }}
        // validationSchema={finishRegisterSchema}
        >


            {(values, isSubmitting) => (
                <Form className={registerForm}

                    // onSubmit={() => {
                    //     finishRegister({ ...values.values })
                    //     history.push('/swipingPage')
                    // }}
                >
                    <div className={formSection}>
                        <CustomTextField
                            name="first"
                            placeholder="First Name"
                        />
                        <CustomTextField
                            name="last"
                            placeholder="Last Name"
                        />
                    </div>
                    <div className={formSection}>
                        <CustomTextField
                            name="age"
                            placeholder="Age"
                        />

                    </div>
                    <div className={formSection}>
                        <CustomTextField
                            name="gender"
                            placeholder="Gender"
                        />
                        <CustomTextField
                            name="rel_type"
                            placeholder="Relationship Type"
                        />
                    </div>
                    <div className={formSection}>
                        <CustomTextField
                            name="sexual_or"
                            placeholder="Sexual Orientation"
                        />
                    </div>

                    <Button
                        disabled={isSubmitting}
                        type="edit"
                        variant="contained"
                        color="secondary"
                    >
                        Edit
          </Button>
                </Form>
            )}
        </Formik>
    )
}

const mapDispatchToProps = {
    setUser
}

export default connect(null, mapDispatchToProps)(ProfilePage)