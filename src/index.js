const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use('/users/:id?', printMessage);

const USERS = [
  {
    id: 0,
    name: 'ana',
    age: 22,
    gender: 'f'
  }
];

//MIDDLEWARE 
function printMessage (req, res, next) {

  const { id } = req.params;

  if (id !== '0') {
    return res.status(401).json({ type: 'error', message: 'invalid user ID.' })
  }

  next();

};


// ROUTES 
  app.get('/', (req, res) => {

    return res.json({ message: 'server is on!'})

  })


  app.get('/users', (req, res) => {

    return res.json(USERS);

  });


  app.post('/users', (req, res) => {

    const { name, age, gender } = req.body;

    const newUser = {
      id: uuid(),
      name,
      age,
      gender
    };

    USERS.push(newUser);

    return res.status(201).json(newUser);

  });


  app.put('/users/:id?', (req, res) => {

    const { id } = req.params;
    const { name, age, gender } = req.body;

    const filteredUserIndex = USERS.findIndex(item => String(item.id) === String(id));

    if (filteredUserIndex === -1) {
      return res.status(404).json({ type: 'error', message: 'user not found.'});
    };

    if (name?.length <= 2 || Number(age) / Number(age) !== 1 || gender !== 'm' && gender !== 'f') {
      return res.status(400).json({ type: 'error', mesage: 'invalid parameters.'})
    };

    // FORMAT VALUES
    const formattedName = String(name);
    const formattedAge = Math.floor(Number(age));
    const formattedGender = String(gender);

    const newUserData = {
      id: USERS[filteredUserIndex]?.id,
      name: formattedName,
      age: formattedAge,
      gender: formattedGender
    };

    USERS[filteredUserIndex] = newUserData;
   

    return res.status(200).json({ type: 'success', message: 'user has been updated.'})

  });


  app.delete('/users', (req, res) => {

    return res.status(200).json({ type: 'success', message: 'user has been deleted.'})

  });



// LISTENER
app.listen('3333', (error) => {
  
  if (error) {
    console.log('deu ruim!')
  } else {
    console.log('server is on! 🔥')
  }
})
