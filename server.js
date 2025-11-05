
const express = require('express');
const app = express();

app.use(express.json());
let users = [];

app.post('/register', (req, res) => {
  const user = req.body;

  if (!user.name || !user.email) {
    return res.status(400).json({ message: 'Name and email are required!' });
  }

  users.push(user);

  res.status(201).json({
    status: 'success',
    message: `User ${user.name} has been registered successfully!`,
    data: user
  });
});


app.get('/users', (req, res) => {
  res.json({
    status: 'success',
    total: users.length,
    data: users
  });
});

app.put('/update/:index', (req, res) => {
  const index = req.params.index;
  const newData = req.body;

  if (!users[index]) {
    return res.status(404).json({ message: 'User not found!' });
  }

  users[index] = newData;
  res.json({
    status: 'success',
    message: `User at index ${index} has been updated.`,
    data: users[index]
  });
});


app.patch('/edit/:index', (req, res) => {
  const index = req.params.index;
  const update = req.body;

  if (!users[index]) {
    return res.status(404).json({ message: 'User not found!' });
  }

  users[index] = { ...users[index], ...update };
  res.json({
    status: 'success',
    message: `User at index ${index} partially updated.`,
    data: users[index]
  });
});


app.delete('/remove/:index', (req, res) => {
  const index = req.params.index;

  if (!users[index]) {
    return res.status(404).json({ message: 'User not found!' });
  }

  const removedUser = users.splice(index, 1);
  res.json({
    status: 'success',
    message: `User removed successfully.`,
    data: removedUser
  });
});


app.listen(3000, () => {
  console.log(' Server is running on http://localhost:3000');
});
