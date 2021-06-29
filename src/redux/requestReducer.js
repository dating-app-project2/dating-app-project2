// import actionTypes from './actionTypes'

// const initialState = {
//     requests:[]
// }

// const {SET_REQUESTS} = actionTypes

// export function setRequests(payload){
//     return{type: SET_REQUESTS, payload}
// }

// export function getReceivedRequests(receiver_id){
//     axios.get(`/request/received/${receiver_id}`)
//     .then(res=> res.data).catch(err=> console.log(err))
//     return{
//         type: GET
//     }
// }



// export default function requestReducer(state = initialState, action){
//     const {type, payload} = action
//         switch(type){
//             case SET_REQUESTS:
//                 console.log(payload)
//                 return {...state, matches: payload}
//             default:
//                 return state
//     }
// }