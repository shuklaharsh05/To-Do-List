const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

let tasks = [];
let durations = [];
let priorities = [];

app.get('/', (req, res) => {
  let today = new Date();

  let options = {weekday: "long", day: "numeric", month: "long"};

  let day = today.toLocaleDateString("en-us", options);
  res.render('list', { listTitle: day, tasks, durations, priorities });
});

app.post('/addTask', (req, res) => {
  const duration = req.body.duration;
  const task = req.body.task;
  const priority = req.body.priority;

// Date conversion
  const userDate = new Date(duration);
  const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(userDate);

// Conditions
  if ((task.trim() !== '') && (duration.trim() !== '') ){
    tasks.push(task);
    durations.push(formattedDate);
    priorities.push(priority);
  }
  res.redirect('/');
});

app.post('/deleteTask', (req, res) => {
  const taskIndex = req.body.taskIndex;
  tasks.splice(taskIndex, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});