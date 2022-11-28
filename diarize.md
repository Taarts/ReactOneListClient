## All the usual

FOUR STEPS TO MAKING REACT APP:

1. START with static HTML & SCSS
2. Make a state based on the API you're going to USE (all or some of the data available)
3. Remove your hardcoded data (<li>s) from the HTML& make sample data in that state
4. Load Data from the API to replace the Hardcoded data in the state

---

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
