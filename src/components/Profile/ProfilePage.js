import React from "react"
import { Formik, Form } from "formik"
import Button from "@material-ui/core/Button"
import CustomTextField from "../CustomTextField/CustomTextField"
import { finishRegisterSchema } from "../../schema/schema"
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

//profile page should allow user to input 6 profile pictures, a bio, their phone number, and edit any of the other information they have on their users table. This is also where the user will be able to set their interests. 
//s3 for the profile pictures. we will be inserting into the pictures table to the user. 
// we will use an update sql to update the users table with a phone number, an id to the pictures table, 

const ProfilePage = ({ history, setUser }) => {

    const { registerForm, formSection } = useStyles()

    const finishRegister = body => {
        console.log(body)
        axios.put(`/auth/finishregister`, body)
            .then(results => {
                toast.success('Account Creation completed!')
                setUser(results.data)
                history.push('/swipingPage')

            })
            .catch(err => toast.error(err.response.data))
    }

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
            validationSchema={finishRegisterSchema}>


            {(values, isSubmitting) => (
                <Form className={registerForm}

                    onSubmit={() => {
                        finishRegister({ ...values.values })
                        history.push('/swipingPage')
                    }}
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
                    <h2>Age</h2>
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
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >

                        Submit

                        Finish registration

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