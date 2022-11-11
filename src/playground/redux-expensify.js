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

const initialFilters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

// START expensesSlice.js

const demoExpenses = [
    { 
        id: nanoid(), 
        description: 'July Rent', 
        note: 'Paid in full.', 
        amount: 4750,
        createdAt: 1000
    },
    { 
        id: nanoid(), 
        description: 'Scandal Perfume', 
        note: 'Perfume i ordered from France.', 
        amount: 850,
        createdAt: -1000
    },
    {
        id: nanoid(),
        description: 'Whey Isolate',
        note: 'Whey protein ordered from MyProtein (5kg).',
        amount: 800,
        createdAt: 45482623
    }
];

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: demoExpenses,
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
                    createdAt = 0
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
        },
        expenseEdited(state, action) {
            const { id, updates } = action.payload;

            return state.map(expense => {
                if(expense.id === id) {
                    return {
                        ...expense,
                        ...updates
                    }
                } else {
                    return expense;
                }
            });
        }
    }
});

const selectAllExpenses = state => state.expenses;

const { expenseAdded, expenseRemoved, expenseEdited } = expensesSlice.actions;

const expensesReducer = expensesSlice.reducer;

// EMD expensesSlice.js

// START filtersSlice.js

// FILTER REDUCERS: 

const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialFilters,
    reducers: {
        textFilterSet(state, action) {
            return {
                ...state,
                text: action.payload
            }
        }, 
        sortedByAmount(state) {
            return {
                ...state,
                sortBy: 'amount'
            }
        },
        sortedByDate(state) {
            return {
                ...state,
                sortBy: 'date'
            }
        },
        startDateSet(state, action) {
            return {
                ...state,
                startDate: action.payload
            }
        },
        endDateSet(state, action) {
            return {
                ...state,
                endDate: action.payload
            }
        }
    }
});

const { 
    textFilterSet, 
    sortedByAmount, 
    sortedByDate, 
    startDateSet, 
    endDateSet 
} = filtersSlice.actions;

const filtersReducer = filtersSlice.reducer;

// END filtersSlice.js

// START store.js

const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        filters: filtersReducer
    }
});

// END store.js

// BEGIN Form.j

const Form = () => {
    const dispatch = useDispatch();

    const onAddExpenseClicked = () => {
        const description = document.getElementById('expenseDescription').value;
        const note = document.getElementById('expenseNote').value;
        const amount = document.getElementById('expenseAmount').value;

        dispatch(expenseAdded({ description, note, amount }));
    }

    const onRemoveExpenseClicked = () => {
        const id = document.getElementById('expenseToRemove').value;

        dispatch(expenseRemoved({ id }));
    }

    const selectExpense = useSelector(selectAllExpenses).map(expense => (
        <option key={expense.id} value={expense.id}>
            {expense.description}
        </option>)
    )

    const onEditExpenseClicked = () => {
        const id = document.getElementById('expenseToEdit').value;
        const description = document.getElementById('editExpenseDescription').value;
        const note = document.getElementById('editExpenseNote').value;
        const amount = document.getElementById('editExpenseAmount').value;

       dispatch(expenseEdited({ 
            id,
            updates: {
                ...(description.length !== 0 && {description}),
                ...(note.length !== 0 && (note)),
                ...(amount !== undefined &&(amount))
            }
        }));
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h4>Add expense:</h4>
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



            <div id="removeExpenseDiv" style={{ backgroundColor: '#dbb9b6' }}>
                <div>
                    <h4>Remove Expense:</h4>
                    <div>
                        <label htmlFor="expenseToRemove">Choose expense to remove:  </label>
                        <select name="expenseToRemove" id="expenseToRemove">
                            <option value=''></option>
                            {selectExpense}
                        </select>
                    </div>
                </div>
                <button 
                onClick={onRemoveExpenseClicked}
                type="button"
                >Remove Expense</button>
            </div>



            <div id="editExpenseDiv" style={{ backgroundColor: '#67a7f5'}}>
                <h4>Edit expense:</h4>
                <div>
                    <label htmlFor="expenseToEdit">Choose expense to edit:  </label>
                    <select name="expenseToEdit" id="expenseToEdit">
                        <option value=''></option>
                        {selectExpense}
                    </select>
                </div><br/>
                <div id="editExpenseInputDiv">
                    <div>
                        <label htmlFor="editExpenseDescription">
                            Description:
                        </label><br/>
                        <input 
                            type="text" 
                            name="editExpenseDescription" 
                            id="editExpenseDescription"
                        />
                    </div>
                    <div>
                        <label htmlFor="editExpenseNote">Note:</label><br/>
                        <textarea name="editExpenseNote" id="editExpenseNote"/>
                    </div>
                    <div>
                        <label htmlFor="editExpenseAmount">Amount:</label><br/>
                        <input 
                            type="number" 
                            name="editExpenseAmount" 
                            id="editExpenseAmount"
                        />
                    </div>
                </div>
                <button
                    onClick={onEditExpenseClicked}
                    type="button"
                >Edit Expense</button>
            </div>
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

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; 
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate; 
        const textMatch = text.length === 0 || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;

    }).sort((first, second) => {
        if(sortBy === 'date') {
            return first.createdAt < second.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return first.amount < second.amount ? 1 : -1;
        }
    })
}

/* store.subscribe(() => {
    const state = store.getState();
    
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

store.dispatch(expenseAdded({
    description: 'Dummy expense',
    note: 'Just wasting money as usual.',
    amount: 999,
    createdAt: 200
}));


store.dispatch(startDateSet(120));
store.dispatch(endDateSet(500));
store.dispatch(textFilterSet('dummy'))

store.dispatch(sortedByAmount()); */