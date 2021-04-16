const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase(); 
  })
 
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create([{title: "potato Puree", level:"Easy Peasy", ingredients:"Potatoes", cuisine:"German"}])
  })
  .then((NewRecipe)=>{
      console.log(NewRecipe.title)
    return Recipe.insertMany(data)
  })
  .then((moreRecipes)=>{
    moreRecipes.forEach((el)=>{
      console.log(el.title) 
    })
   return Recipe.updateOne({title:"Rigatoni alla Genovese"}, {duration: "100"})
  })
  .then(()=>{
    console.log("Rigatoni alla Genovese has been updated")
   return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(()=>{
    console.log("Carrot Cake has been deleted") 
    mongoose.connection.close() 
    console.log('disconnected')
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
 

