import React from 'react';
import ReactDOM from 'react-dom/client';

// begin counterSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.count += 1;
        }, 
        decrement: state => {
            state.count -= 1;
        },
        reset: state => {
            state.count = 0;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        }
    }
});

const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

const counterReducer = counterSlice.reducer;

// end counterSlice.js

// begin store.js

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
});

// end store.js

// begin Counter.js

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const Counter = () => {

    const count = useSelector(state => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementAmount] = useState(0);
    const addValue = Number(incrementAmount) || 0;

    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    }

    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>
            <input 
                type='text'
                value={incrementAmount}
                onChange={e => setIncrementAmount(e.target.value)}
            />
            <div>
                <button onClick={() => dispatch(incrementByAmount(addValue))}>Add amount</button>
                <button onClick={resetAll}>Reset</button>
            </div>
        </section>
    );
}

// end Counter.js

// begin App.js

const App = () => (
    <main>
        <Counter />
    </main>
)

// end App.js

// begin index.js

import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


// end index.js