import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
    BrowserRouter, 
    Routes, 
    Route
 } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const ExpenseDashnoardPage = () => (
    <div>
        This is from dashboard component.
    </div>
);

const AddExpensePage = () => (
    <div>
        This is my addExpenseComponent component.
    </div>
);

const EditExpensePage = () => (
    <div>
        This is dummy edit expense component.
    </div>  
);

const HelpPage = () => (
    <div>
        This is a dummy helpPage component.
    </div>
);

const routes = (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ExpenseDashnoardPage />}/>
            <Route path="/create" element={<AddExpensePage />}/>
            <Route path="/edit" element={<EditExpensePage />}/>
            <Route path="/help" element={<HelpPage />}/>
        </Routes>
    </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(routes);