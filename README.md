# Deel Frontend Test

This is an implementation of the AutoComplete component for the Deel Frontend Test.

## Project information

This project was developed using React, TypeScript, and CSS, you can check the live version of the project [here]().

## Technical requirements

Please prepare an auto-complete component in React TypeScript.

1. You cannot use any 3rd party libraries - only pure React and internal DOM
   functions.
2. You should use typescript and write proper interfaces and types.
3. The function to filter the data should be asynchronous. You can use mock data
   (such as a JSON array), but the function which uses it should be asynchronous
   (similar to a real REST call).
4. It should have basic working CSS. No need for anything fancy (such as dropshadows
   etc), but should look decent.
5. You need to handle all non-standard/edge use-cases - it should have a perfect
   user-experience.
6. Highlight the matching part of the text, in addition to showing it.
7. No external state management libraries (refer to #1 as well), only native React
   method.
8. Use only functional component with hooks.
9. Shortcuts and hacks are perfectly ok - but you have to add comments on what
   are you doing there and why. You should either write production ready code or
   include comments on what needs to be changed for production.
10. Add a README.md file explaining how to run the project.
11. Bonus #1: load data using a real API call to some resource.

## Available Scripts

In the project directory, you need to run:

### `npm i`

This installs all the dependencies needed for the website to work.

Then you can run:

### `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Functionality and future plans

To use the website, you just need to type in the search field, and the autocomplete will show you the matching results.

You can click on the result to select it, and the input field's value will be replaced by that.

You can also use the up and down arrow keys to select the result with the enter key.

The autocomplete will also show you the highlighted part of the text.

The navigation with the keyboard still needs some work, so it's not 100% perfect yet, but it works well enough in my opinion.
