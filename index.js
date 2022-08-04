const CAKE_ORDERED = 'CAKE_ORDERED'

orderCAke = () =>{
    return {
        type: CAKE_ORDERED,
        quantity : 1
    }
}


const initialState = {
    numberOfCakes: 10,
    anotherProperty: 0
}

// (prevState, action) => newState

const reducer = (state = initialState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }
        default:
            return state    
    }
}