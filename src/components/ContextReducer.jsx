import React, {createContext, useContext, useReducer, useState, setState} from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext(); 
 
const reducer = (state, action) => {
    switch(action.type) {
        case "ADD":
            return [...state, {id: action.id, name: action.name, price: action.price, qty:action.qty, size: action.size, img: action.img}]
            
        case "REMOVE": 
            let newArr = [...state];
            newArr.splice(action.index, 1);  
            return newArr;
      
            case "UPDATE":
                const index = state.findIndex(food => food.id === action.id && food.size === action.size);
                if (index !== -1) {
                  const updatedItem = {
                    ...state[index],
                    qty: parseInt(state[index].qty) + parseInt(action.qty),
                    price: state[index].price + action.price
                  };
                  return [
                    ...state.slice(0, index),
                    updatedItem,
                    ...state.slice(index + 1)
                  ];
                }
                return state;
          
        case "INCREMENT": 
            let arrp = [...state]; 
            arrp[action.index] = {
                ...arrp[action.index],
                qty: parseInt(action.qty) + 1,
                price: action.price + action.price / parseInt(action.qty)
            };
            return arrp; 
        case "DECREMENT":
            let arrm = [...state]; 
            if (action.qty > 1) {
                arrm[action.index] = {
                    ...arrm[action.index],
                    qty: parseInt(action.qty) - 1,
                    price: action.price - action.price / parseInt(action.qty)
                };
            } else if (action.qty === 1) {
                arrm.splice(action.index, 1);
            }
            return arrm; 
        case "DROP":
            let emparr = [];
            return emparr;  
        default: 
            console.log("Error in Reducer");
            return state;  
    }
}
export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, []) 
    return (
        <CartDispatchContext.Provider value ={dispatch}>
            <CartStateContext.Provider value ={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}
export const useCart = () => {
    const context = useContext(CartStateContext);
    if (context === undefined) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };
  
  export const useDispatchCart = () => {
    const context = useContext(CartDispatchContext);
    if (context === undefined) {
      throw new Error("useDispatchCart must be used within a CartProvider");
    }
    return context;
  }; 