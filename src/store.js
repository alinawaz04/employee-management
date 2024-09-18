import { configureStore } from "@reduxjs/toolkit";
import employeesSlice from "./context/employeesSlice";

/**
 * Creates and configures the Redux store for the application.
 *
 * This store will manage the application state for employees, using the
 * `employeesSlice` as the reducer for handling state changes related to employee data.
 *
 * `configureStore` is a function from Redux Toolkit that automatically sets up
 * the Redux store with default middleware, DevTools support, and more, simplifying
 * the setup process.
 */
const store = configureStore({
  reducer: {
    employees: employeesSlice,
  },
});

export default store;
