const redux = require('redux')
const produce = require('ímmer').produce


const initialState = {
    name:"Precell",
    address: {
        street:'4213 main strt',
        city:'Harare',
        state:'MA'
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

updateStreet = (street) => {
    return {
        type:STREET_UPDATED,
        payload: street
    }
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street = action.payload
            }) 
        default: {
            return state
        }    
    }
}

const store = redux.createStore(reducer)
console.log('initial state', store.getState());
const unscribe = store.subscribe(()=>{
    console.log('updated state', store.getState());
})

store.dispatch(updateStreet('2850 chitombo road'))

unscribe()