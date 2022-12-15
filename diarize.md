ReactOneListClient video

npm install
react-router react-router-dom
npm install --save-dev @types/react-router-dom

import BrowserRouter wrap the <app> in the main.tsx

<React.Fragment> join two elements together
"<></>" is the same as above

Refactor the list portion into it's own file.

Now we can tell our app to only render if URL is /...

## React Router

"Switch" is outdated and replaced with "Routes"
"Routes" is a component that takes a "path" and a "element" as props.
add "element" and the path of our component "TodoList" and the app renders the list.

Components come into their own when we use "<Routes><Route path="" element={< ----- >}>" to render them in the app.

## All the usual

FOUR STEPS TO MAKING REACT APP:

1. START with static HTML & SCSS
2. Make a state based on the API you're going to USE (all or some of the data available)
3. Remove your hardcoded data (<li>s) from the HTML& make sample data in that state
4. Load Data from the API to replace the Hardcoded data in the state

-

added a const to mirror the list of things that are listed on the app page.

Delete all <li> and now map inside the <ul> with "useState". You can add to the state and it is present on the rendered page without any additional code.

added dynamic "className" ternary statement to update the list on completion of each task. Kept as undefined rather than empty for neatness sake.

Added useEffect c.l function that will runs when the app mounts, this is where the API ill be in the code.

installed Axios.
created an async function inside our function as useEffect cannot be async.
once the list of items was being called from the API, then the "hardcoded" list was removed.

Currently have three "nevers" so typescript needs to be taught what the todoItems are. (Typscript needs a type)
inside the useEffect function, we can add <TodoItemType[]> between "useState" & the parenthesis.

<!-- Presumably we are going to post changes to the API next.
Post additional tasks to the client
Update tasks on the client when completed.
 -->

Input field - inside the <form>
create a new state " const [newTodoText, setNewTodoText] = useState('')"
call the new state inside the form after the "placeholder text" with "onChange={(event) => {
setNewTodoText(event.target.value)".
This will update the state with the value of the input field.

Create a new function to handle the submission of the form.
onSubmit - inside the <form>
onSubmit={function (event) {

<!-- please don't do anything unless I tell you to -->

            event.preventDefault()

<!-- these are split which allows the first event simple input to  occur and then it's acted upton in the function below, which is going to have more code in it. -->

            handleCreateNewTodoItem()

Edit handleCreateNewTodoItem function:
async the function to update an object from the user input. Modify the function with and if statement to record the input if it's ok (201)
then get it to append the array using a spreader operator. "...todoItems" and then add the new item to the end of the array.
then set the state with the new array.
then set the state to the new array.
then clear the input field.

<!-- doing this  -->

to prepend the list, say if the input field is at the top, change the order to:
const newTodoItems = [newTodo,...todoItems]
reverses the order on refresh

<!-- the input field text is "sticking" -->

clear input with - setTodoItems('') // clear the input

<!-- mark completed the list -->

pull the <li> out of the main app and create a component redefined it below as it's own function with the new object "todoItem" with "type: properties".
insert click handler inside the <li> inside the new function
make sure that ${props.todoItem.id} so it's clear which item is being clicked on.

<!-- insert logic into this code to make it mark complete? -->

If/else statement to mark complete: false/true offered in two ways:
First:
async function toggleCompleteStatus() {
if (props.todoItem.complete) {
const response = await axios.put(
`https://one-list-api.herokuapp.com/items/${props.todoItem.id}?access_token=cohort42`,
{ item: { complete: false } }
)
if (response.status === 200) {
console.log(response.data)
}
} else {
const response = await axios.put(
`https://one-list-api.herokuapp.com/items/${props.todoItem.id}?access_token=cohort42`,
{ item: { complete: true } }
)
if (response.status === 200) {
console.log(response.data)
}
}
}

possible to simply this statement
Second: as used in the code

<!-- !true = false/ !false = true -->

function TodoItem(props: TodoItemProps) {
async function toggleCompleteStatus() {
const response = await axios.put(
`https://one-list-api.herokuapp.com/items/${props.todoItem.id}?access_token=cohort24`,
{ item: { complete: !props.todoItem.complete } } //
)

    if (response.status === 200) {
      console.log(response.data)
    }

}

<!--  reload the list -->

Refactoring useEffect to reload the list:
Pull the function out of useEffect and call it "loadAllTheItems"
then call the function inside thus: "useEffect(loadAllTheItems, [])"

NOW: this function can be called in the todoItems.
Place the named function in the <ul> todoItem "reloadItems={loadAllTheItems}" function VSCode actually tells you where to put it.
Change the TodoItemProps to include reloadItems: () => void, then call the function inside the TodoItem function "props.reloadItems()".
So we're taking the loadAllTheItems function from the parent, extracted from useEffect and passing it to the todoItem down and then calling it back up to in the App we can cross off items in our list AND UNcross items in our list.

<!-- then call the function inside the handleCreateNewTodoItem function -->

as above... here we go.
replace:
const response = await axios.post(
'https://one-list-api.herokuapp.com/items?access_token=cohort24',
{ item: { text: newTodoText } }
)

<!-- from here -->

const response = await axios.get(
'https://one-list-api.herokuapp.com/items?access_token=cohort24'
)

      if (response.status === 200) {
        setTodoItems('')
        // clear the input
      }

<!-- to here -->

"with loadAllTheItems()"
Replacing duplication with a function call.

<!-- Destructure our props -->

Inside - "function TodoItem(props: TodoItemProps) {"
"const { todoItem, reloadItems } = props"
then remove "props." from function toggleCOmpleteStatus and <li> inside "type TodoItemProps"
Destructuring the destructured props:
"function TodoItem({ todoItem, reloadItems }: TodoItemProps) {"

Further down the rabbit hole:

<!-- Destructuring the TodoItem: -->

function TodoItem({
todoItem: {id, text, complete },
reloadItems,
}: TodoItemProps) {...
})

<!-- Extracting the props to a component -->

move the propstype to below the TodoItem function.
select the whole thing and extract to a new component "TodoItem.tsx" - VSC does this automatically AND imports it back in to the App for you.
