import React, { createContext, useContext, useReducer } from 'react';

// Create the context
const CounterContext = createContext();

// Initial state
const initialState = {
  count: 0,
};

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'INCREMENT_BY_AMOUNT':
      return { count: state.count + action.payload };
    default:
      return state;
  }
}

// Provider component
export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// Custom hook to use the counter context
export function useCounter() {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
} 