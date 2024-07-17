# Employee Management App

- **Display a list of "employees"**
  - ~~Should show their full name and number of active tasks~~
  - ~~Search users by first and last name~~
  - ~~Checkbox for incomplete tasks~~

- **Ability to add an employee**
  - ~~First and last name, email~~

- **Open employee details page to assign a custom task**
  - ~~This should save the task to the employee details page~~
  - ~~Task should have a title, start/end date, description~~
  - ~~Show the tasks in a list and incomplete and outdated tasks should be marked in some way~~
  - Existing tasks should be editable
  - Tasks should be able to be marked as complete and rated on a scale of 1-5 once marked as complete
    - ~~On the employee list page, the manager should see an indicator if there is a task that is passed the due date for an employee on the list~~

## All app data should be stored in local storage
- This can be done with the AsyncStorage package
- Fetch data from AsyncStorage when the app loads
- Update data in AsyncStorage whenever items are edited/added to keep data up to date
  - This means once data is edited and the app is closed, the app should still display the updated data once opened again

- Free to use all resources needed to create the project
  - This includes using node packages for components not within the standard library
  - You can also use third-party APIs to fetch mock data if you can find any
  - **DO NOT COPY from an existing project**
  - Existing projects can be used as reference though
