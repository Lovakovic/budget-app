import React from 'react';
import ReactDOM from 'react-dom';
import Store from './redux-store';
import { Provider, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';

const count = useSelector((state) => state.counter.count)
const dispatch = useDispatch();

const App = (
    <div>
        <h1>Counter is: {count}</h1>
        <button 
            onClick={() => dispatch(increment())}
        >
            Increment
        </button>
        <button 
            onClick={() => dispatch(decrement())}
        >
            Decrement
        </button>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <Provider store={Store}>
        <App />        
    </Provider>
);