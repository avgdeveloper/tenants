const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


mongoose.connect('mongodb://localhost/tenants')
  .then(() => console.log('Connect to mongodb'))
  .catch(err => console.log('Can not connectd to mongodb', err));

const schema = mongoose.Schema({
  /*name: String,
  phone: String,
  address: String,
  debts: Number*/
});

const Tenant = mongoose.model('Tenats', schema);


//Get all tenants 
app.get('/api/tenants', (req, res) => {
  Tenant.find({}).then(tenants => res.send(tenants));
});

// Save new tenant 
app.post('/api/tenant', (req, res) => {
  console.log(req.body);
  const tenant = new Tenant(req.body);
  tenant.save()
    .then(result => res.send(result))
    .catch(err => res.status(400).send('Bad request'));
});

//update tenants by id
app.put('/api/tenant/:id', (req, res) => {
  Tenant.findByIdAndUpdate(req.params.id, req.body).save()
    .then(result => res.send(result))
    .catch(err => res.status(400).send('Bad request'));

});

//Delete tenant by id
app.delete('/api/tenants/:id', (req, res) => {
  Tenant.findByIdAndDelete(req.params.id)
    .then(result => res.send('Tenant deleted'))
    .catch(err => res.status(404).send('No tenant with this name'))
})

//Filter tenants
app.get('/api/tenants/filter/:sort', (req, res) => {
  if (req.params.sort == 'debts') {
    Tenant.find({ debts: { $gt: 0 } }).then(tenants => res.send(tenants));
  } else if (req.params.sort == 'noDebts') {
    Tenant.find({}).exists('debts', false).then(tenants => res.send(tenants));
  } else if (req.params.sort == 'all') {
    Tenant.find({}).then(tenants => res.send(tenants));
  }
});


app.listen(3000, () => console.log('Server started on port 3000'));
