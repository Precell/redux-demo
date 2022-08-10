const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleWare = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()


//ACTIONS
// are objects that define what happened in the app

// restocking cakes 
// step 1 we define the action type. the action type should describe the event that happened

// action payload is any additional information you want to send
// this is for every action in your code base
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'



orderCAke = () =>{
    return {
        type: CAKE_ORDERED,
        payload : 1
    }
}

cakeRestock = (qty = 1) =>{
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

orderIcecream = (qty = 1) =>{
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

restockIcecream = (qty = 1) =>{
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}


// const initialState = {
//     numberOfCakes: 10,
//     numberOfIcecreams: 20
// }

const initialCakeState = {
    numberOfCakes: 10
}

const initialIcecreamState = {
    numberOfIcecreams: 20
}



// (prevState, action) => newState

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return{
                ...state,
                numberOfCakes: state.numberOfCakes + action.payload
            }    
        default:
            return state    
    }
}

const iceCreamReducer = (state = initialIcecreamState, action) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return {
                ...state,
                numberOfIcecreams: state.numberOfIcecreams - action.payload
            }       
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numberOfIcecreams: state.numberOfIcecreams + action.payload
            }    
        default:
            return state    
    }
}

// combineReducers

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: iceCreamReducer
})

// STORE
// the createStore method is responsible for creating the store
// the createStore method accepts a parameter which is a reducer function
// the reducer function has or returns the initial state of the application
// passing the reducer to create is required to make the state transitions based on the actions received
// this is the first responsibility holding the app state

const store = createStore(rootReducer, applyMiddleWare(logger))

// the second responsibility is to expose the getState method
// getState gives the current state in the store 

console.log('initial state', store.getState());

// 4th responsibility is to allow the app to subscribe to changes in the store 
// this is achieved using the subscribe method
// the subscribe method accept a function

const unscribe =  store.subscribe(() => {})


// 3rd responsibility
// the store provides a dispatch method to update the state
// the dispatch method accepts an action as an arguement
// we pass the action creator function to disapatch 


// store.dispatch(orderCAke())
// store.dispatch(orderCAke())
// store.dispatch(orderCAke())
// store.dispatch(cakeRestock(3))


// bindeActionCreators

const actions = bindActionCreators(
    {orderCAke, cakeRestock, orderIcecream, restockIcecream},
     store.dispatch
    )

actions.orderCAke()
actions.orderCAke()
actions.orderCAke()
actions.cakeRestock(3)
actions.orderIcecream()
actions.orderIcecream()
actions.restockIcecream(2)

// the final step is to unscribe from the store by calling the function returned by the subscribe method
// after all our code is completed we can call the unscribe method
unscribe()

// The redux pattern 
// You create a store, declare the initial state and a reducer, define your action and action creators
// subscribe to the store, dispatch actions to update the store
// and finally unscribe to the changes
















