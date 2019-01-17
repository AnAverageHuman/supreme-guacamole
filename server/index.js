// node -r esm index.js

import express from 'express'
import Sequelize from 'sequelize'
import path from 'path'

const db = new Sequelize('postgres://localhost/college')
const app = express()

const Campus = db.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: Sequelize.TEXT,
})

const Student = db.define('students', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  gpa: {
    type: Sequelize.FLOAT,
    value: {
      max: 4.0,
      min: 0.0,
    }
  }
})

Campus.hasMany(Student);
Student.belongsTo(Campus);

Campus.sync().then(() => {
  Campus.create({
    name: "My Campus",
    address: "444 St",
    description: "Hi",
  })
})

Student.sync().then(() => {
  Student.create({
    firstName: "John",
    lastName: "Smith",
    email: "j@sm.com",
    gpa: 3.4444444444,
  })
})

function myfunction (hit, res) {
  hit.findAll().then((e) => res.send(e));
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/students', (req, res) => myfunction(Student, res))
app.get('/api/campuses', (req, res) => myfunction(Campus, res))
app.get('/api/user', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))
app.listen(3000, console.log)
