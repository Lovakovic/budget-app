import { 
    configureStore, 
    createSlice,
    nanoid
} from "@reduxjs/toolkit";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { 
    useDispatch,
    Provider,
    useSelector
} from "react-redux";

// EXPENSES REDUCERS:
// expenseAdded
// expenseRemoved
// expenseEdited

// REDUCERS:
// textFilterSet
// sortedByDate
// sortedByAmount
// startDateSet
// endDateSet

const initialFilters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const demoState = {
    expenses: [{
        id: 'kuzsgdiz',
        description: 'January Rent',
        note: 'This was the final payment for that address.',
        amount: 450000,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
}

// START expensesSlice.js

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: [],
    reducers: {
        expenseAdded: {
            reducer(state, action) {
                // Since we're working inside of an expenses slice
                // we don't have to explicitly define that we're 
                // gonna work with expenses array
                state.push(action.payload)
            }, 
            prepare({ 
                    id = nanoid(),
                    description = '', 
                    note = '', 
                    amount = 0, 
                    createdAt = new Date().toISOString()
                }) {

                return {
                    payload: {
                        id,
                        description,
                        note, 
                        amount,
                        createdAt
                    }
                }
            }
        },
        expenseRemoved(state, action) {
            const { id } = action.payload;

            // Have to return the new state since filter doesn't 
            // mutate the original one and immer is dumb
            return state.filter(element => element.id !== id);
        }
    }
});

const { expenseAdded, expenseRemoved } = expensesSlice.actions;

const expensesReducer = expensesSlice.reducer;

// EMD expensesSlice.js

// START filtersSlice.js

const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialFilters,
    reducers: {

    }
});

const filtersReducer = filtersSlice.reducer;

// END filtersSlice.js

// START store.js

const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        filters: filtersReducer
    }
});

store.subscribe(() => console.log(store.getState()));

// END store.js

// BEGIN Form.j

const Form = () => {
    const dispatch = useDispatch();

    const onAddExpenseClicked = () => {
        const id = document.getElementById('expenseId').value;
        const description = document.getElementById('expenseDescription').value;
        const note = document.getElementById('expenseNote').value;
        const amount = document.getElementById('expenseAmount').value;

        dispatch(expenseAdded({ id, description, note, amount }));
    }

    const onRemoveExpenseClicked = () => {
        const id = document.getElementById('removeExpenseId').value;

        dispatch(expenseRemoved({ id }));
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h4>Add expense:</h4>
            <div>
                <label htmlFor="expenseId">Id:</label><br/>
                <input type="text" name="expenseId" id="expenseId" />
            </div>
            <div>
                <label htmlFor="expenseDescription">
                    Description:
                </label><br/>
                <input 
                    type="text" 
                    name="expenseDescription" 
                    id="expenseDescription"
                />
            </div>
            <div>
                <label htmlFor="expenseNote">Note:</label><br/>
                <textarea name="expenseNote" id="expenseNote"/>
            </div>
            <div>
                <label htmlFor="expenseAmount">Amount:</label><br/>
                <input 
                    type="number" 
                    name="expenseAmount" 
                    id="expenseAmount"
                />
            </div>
            <div>
                <button
                    onClick={onAddExpenseClicked}
                    type="button"
                >Add Expense</button>
            </div><br/><br/>
            <h4>Remove Expense:</h4>
            <div>
                <label htmlFor="removeExpenseId">Id:</label><br/>
                <input  
                    type="text" 
                    name="removeExpenseId" 
                    id="removeExpenseId"
                />
            </div>
            <button 
                onClick={onRemoveExpenseClicked}
                type="button"
            >Remove Expense</button>
        </form>
    );
}

// END Form.js

// START App.js

const App = () => {

    return (
        <div>
            <Form />
        </div>
    )
}

// END App.js

// START index.js

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// END index.js