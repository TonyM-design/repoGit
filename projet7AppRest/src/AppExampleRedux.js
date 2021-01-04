import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux'


const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
};


const store = createStore(reducer);

function AnotherComponentTest() { // dans MAP
  const dispatch = useDispatch();
  return(
    <>
      <p>AnotherComponentTest</p>
      <button onClick={()=> dispatch({type: 'INCREMENT'})}> INC </button>
    </>
  )
} 

function ComponentTest() { // aside
  const counter = useSelector(state => state)

  return(
    <>
      <p>My counter : {counter}</p>
      <AnotherComponentTest />
      </>
  );
}



// fait
export default function App() {
return (
  <Provider store={store}>
      <p> texte basique</p>
      <ComponentTest/>
  </Provider>
)
}