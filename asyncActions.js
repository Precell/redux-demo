const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleWare = redux.applyMiddleware

const initialState = {
    loading: false,
    users:[],
    error: ''
} 

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDDED = 'FETCH_USERS_SUCCEEDDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequest = () =>{
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUsersSuccess = users =>{
    return {
        type: FETCH_USERS_SUCCEEDDED,
        payload: users
    }
}

const fetchUsersFailure = error =>{
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCEEDDED:
            return {
                loading:false,
                users: action.payload,
                error:''
            }
            
        case FETCH_USERS_FAILED:
            return {
                loading:false,
                users:[],
                error: action.payload
            }    
    }
}


const fetchUsers = () =>{
    return (dispatch)=>{
        dispatch(fetchUsersRequest())
        axios.get('http://jsonplaceholder.typicode.com/users').then((res) =>{
            // res.data is the users  
            const users = res.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users))
        }).catch(err =>{
            // err.message is the error message
            dispatch(fetchUsersFailure(err.message))
        })
    }
}


const store = createStore(reducer, applyMiddleWare(thunkMiddleware))
store.subscribe(()=>{
    console.log(store.getState());
})

store.dispatch(fetchUsers())




























