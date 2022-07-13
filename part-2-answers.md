## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

The biggest difference between `Component` and PureComponenet, is that `Component` needs to re-render everytime props passed to it change, unless we implement the method `shouldComponentUpdate()`.

As for `PureComponent`, it uses `shouldComponentUpdate()` by default as it does a shallow comparison between the current state and props with the new state and props then it decides whether the component should re-render or not.

### An example where it breaks the app:

Since `PureComponent`'s `shouldComponentUpdate()` skips prop updates for the whole component subtree when using the shallow comparison this means that all the children components need to be also pure, so using normal component as children for the `PureComponent` will cause the app to break.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

A change in `Context` will always cause a re-render so that all children components are updated accordingly so if for some reason `shouldComponentUpdate()` blocks a re-render caused by a change in `Context` this will cause issues with the update that should've happened.

## 3. Describe 3 ways to pass information from a component to its PARENT.

1. By using callback functions, we pass a function as a prop to the child component and then call the function from the child component and pass the data as arguments, thanks to that we'll be able to access the data in the function in the parent component.

2. By using a state manager like `redux` and connecting both components to the same store or something.

3. By using `setState` callback, and updating the state of the parent component from the child component.

## 4. Give 2 ways to prevent components from re-rendering.

1. We can use `shouldComponentUpdate()` in class components.
2. We can use `React.memo`.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is syntax that helps you group elements together in a component without adding an extra node in the DOM, it helps with the performance of the app as well, and it makes the DOM inspector less cluttered and easy to read.

Honestly I have no idea about a situation of when it might break the app but I think that with complexe nesting it might cause issues, I am not sure.

## 6. Give 3 examples of the HOC pattern.

1. One example is that if we have 2 components that aren't identical but use pretty much the same logic, we can make a function that has the ability to create components, the function will accept as one of its arguments a child component (a wrapped component) and the other arguments we'll use them to pass the unique methods of each component, and then it will return a new component that will be the same as the child component but with the unique methods.

2. Another example is the React.memo component, it's a function that accepts a component and returns a memoized version of that component, this means it uses the higher order component pattern.

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

- Promises handle the exceptions on their own, kind of, and we can check the exceptions that got caught by using `.catch()`.
- In `async...await` we need to use `try and catch` to handle the exceptions.
- As for `callbacks`, I am not sure it's possible to catch the exceptions using, I read one time that it's possible if we override the default behaviour of `window.onerror` but honestly I never tried and I don't think it's a good option.

## 8. How many arguments does setState take and why is it async.

`setState()` has 2 arguments, the first is the `updater` that we use to update the state, and the second one is `callback function`, which will be called when `setState()` has finished updating the state, it is async because this needs to happen in the background or it will block the application while the state is being set.

## 9. List the steps needed to migrate a Class to Function Component.

- Replace the `Class` declaration of the component by declaring a function with the same name.
- Move the props from the constructor to the arguments of the function.
- If we have a state, we need to replace the state declaration with `useState()`.
- If we used any Lifecycle methods we need to adapt them to the functional component by using `useEffect()`.
- Remove the usage of `this` and change the declaration of the variables and the functions.
- Remove `Render()` as we don't need it we'll use `return` directly without it.

## 10. List a few ways styles can be used with components.

- By using normal CSS and importing it in the component.
- By using inline CSS.
- By using CSS frameworks like TailwindCSS or Boostrap
- By using SASS and SCSS and importing it in the component.

## 11. How to render an HTML string coming from the server.

- We can render an HTML string coming from the server by using `dangerouslySetInnerHTML`, but it's risky to do so because it's easy to expose the users to a cross-site scripting (XSS) attack.

  Example:

  ```
  <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  ```

- We can also use a third party library called `html-react-parser` to parse the HTML string and render it as a React component.
