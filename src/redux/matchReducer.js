import actionTypes from './actionTypes'

const initialState = {
    matches:[]
}

const {SET_MATCHES} = actionTypes

export function setMatches(payload){
    return{type: SET_MATCHES, payload}
}


export default function matchReducer(state = initialState, action){
    const {type, payload} = action
        switch(type){
            case SET_MATCHES:
                console.log(payload)
                return {...state, matches: payload}
            default:
                return state
    }
}