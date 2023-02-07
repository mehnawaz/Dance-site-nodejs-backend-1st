const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const bodyparser =require("body-parser")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const port = 8000;

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  describe: String
});

const contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF---
app.use('/static', express.static('static')) //for serve static file
app.use(express.urlencoded())

//PUG SPECIFIC STUFF---
app.set('view engine', 'pug') //Set template engine as pug
app.set('views', path.join(__dirname, 'views')) //Set views directory

//ENDPOINTS-----
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/service', (req, res)=>{
    const params = {}
    res.status(200).render('service.pug', params);
})
//post req-----
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("This item was not saved to the database")
    })
    // res.status(200).render('contact.pug');
})

//START SERVER-----
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
