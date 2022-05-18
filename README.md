# Todo App

Todo App is a web application the enables the user to create a todo list and assign it to someone.

- phase 1: the base of todo app.
  - a user can add a new task
  - a user can assign that task to name
  - a user can sort the task by name or by completetion
  - a user can delete the task
  - a user is can display only the incompleted tasks

## UML

![UML](./assets/ToDoAppUML.png);

## [PR link](https://github.com/Mhsalameh/resty/pull/3)

## [live URL](https://coruscating-marigold-6319f2.netlify.app/)

## How the global state is consumed by the components

- first we creat a settings context, using `react.createContext()`
- then we create the settings provider function and add all the setting sates in there using the useState() hook
- put all the states and their setters in a state object so we can call each of them by name
- finally we return using the settings context provider and pass the state object to it as value props ie.

```js
<SettingsContext.provider value={state}>
  {props.children}
</SettingsContext.provider>
```

- in the main component we will call the settings provider function and wrap it around all the components that we want to consume the global state

```jsx
<Settings>
  <Header />
  <Todo />
</Settings>
```

- all the components and their childrens will be consumers of the global states the the settings context provides.

## The operation of the hook `useForm()`

- `useForm()` is a costum hook the has handling functions, the hook takes a callback function as an argument, it will make sure the other operations run befor that callback function is called, like to handle events before passing the value, or to add new values before passing them to the function.
