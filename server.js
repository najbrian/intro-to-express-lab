const express = require('express')

const app = express()

// 1. Be Polite, Greet the User
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.

// Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.

// Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.”

app.get('/greetings/:name', (req, res) => {
  const name = req.params.name
  res.send(`<h1> Hello, ${name}`)
})

// app.listen(3000,()=>{

// })

// 2. Rolling the Dice
// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.

// Examples: Matches routes like /roll/6 or /roll/20.

// Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.

// Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with “You rolled a 14.”

app.get('/roll/:number', (req, res) => {
  const number = req.params.number

  if (isNaN(number)) {
    res.send(`You must specify a number`)
  } else {
    res.send(`You rolled a ${Math.floor(Math.random() * number)}`)
  }
})

// app.listen(3000,()=>{

// })

// 3. I Want THAT One!
// Task: Create a route for URLs like /collectibles/<index-parameter>.

// Examples: Matches routes such as /collectibles/2 or /collectibles/0.
app.get('/collectibles/:idx', (req, res) => {
  const idx = req.params.idx
  if (!collectibles[idx]) {
    res.send('This item is not yet in stock.Check back soon!')
  } else {
    res.send(`So, you want the <strong>${collectibles[idx].name}</strong>? For <strong>$${collectibles[idx].price}</strong>, it can be yours!`)
  }

})

// app.listen(3000, () => {
// })

// Data Array:

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

// Validation: If the index does not correspond to an item in the array, respond with “This item is not yet in stock. Check back soon!”

// Response: Should describe the item at the given index, like “So, you want the shiny ball? For 5.95, it can be yours!” Include both the name and price properties.

// 4. Filter Shoes by Query Parameters
// Use the following array of shoes in this challenge:


const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// Task: Create a route /shoes that filters the list of shoes based on query parameters.
app.get('/shoes', (req, res) => {
  const minPrice = req.query.minPrice
  const maxPrice = req.query.maxPrice
  const type = req.query.type
  let filterShoes = shoes;

  if (!isNaN(minPrice)) { filterShoes=shoes.filter(shoe => shoe.price >= minPrice) }
  if (!isNaN(maxPrice)) { filterShoes=shoes.filter(shoe => shoe.price <= maxPrice) }
  if (type) {filterShoes=shoes.filter(shoe => shoe.type === type)}

  res.json(filterShoes)
})

app.listen(3000, () => {
})
// Query Parameters:

// min-price: Excludes shoes below this price.
// max-price: Excludes shoes above this price.
// type: Shows only shoes of the specified type.
// No parameters: Responds with the full list of shoes.