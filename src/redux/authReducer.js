import axios from 'axios'
import actionTypes from './actionTypes'

const initialState = {
    user: {
    id: '',
    email: '',
    phone_area: '',
    phone_num1: '',
    phone_num2: '',
    first: '',
    last: '',
    password: '',
    age: '',
    gender: '',
    rel_type: '',
    sexual_or: '',
    bio: '',
    url: ''
    },
    loading: false,
    errorMessage: ''
}

const {GET_USER, PENDING, FULFILLED, REJECTED, SET_USER} = actionTypes

export function setUser(payload){
    return{type: SET_USER, payload}
}

export function getUser(){
  const payload  = axios.get("/auth/user")
  .then(results => {
    return results.data
  }).catch(err => console.log(err))
  return {
    type: GET_USER,
    payload
  }
}

export default function authReducer(state = initialState, action){
    const {type, payload} = action
        switch(type){
            case GET_USER + PENDING:
                return {...state, loading: true}
            case GET_USER + FULFILLED:
                return {...state, user: payload, loading: false}
            case GET_USER + REJECTED:
                return {...state, errorMessage: payload, loading: false}
            case SET_USER:
                console.log(payload)
                return {...state, user: payload}
            default:
                return state
    }
}