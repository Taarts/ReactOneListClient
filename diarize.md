all the usual
added a const to mirror the list of things that are listed on the app page.

Delete all <li> and now map inside the <ul> with "useState". You can add to the state and it is present on the rendered page without any additional code.

added dynamic "className" ternary statement to update the list on completion of each task. Kept as undefined rather than empty for neatness sake.

Added useEffect c.l function that will runs when the app mounts, this is where the API ill be in the code.

installed Axios.
created an async function inside our function as useEffect cannot be async.
once the list of items was being called from the API, then the "hardcoded" list was removed.
