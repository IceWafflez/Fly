const express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')

const https = require('https')

const key = "0JF6Q0M8K1M2VCGEVHG167XMFV9E"
const base = 'https://beta3.api.climatiq.io'

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

const port = 3001

app.all('/', (req, res) => {
  res.send('Hello World!')
})

const data = new TextEncoder().encode(
  JSON.stringify({
      "legs": [
          {
              "from": "BER",
              "to": "HAM",
              "passengers": 2,
              "class": "first"
          },
          {
              "from": "HAM",
              "to": "JFK",
              "passengers": 2,
              "class": "economy"
          }
      ]
  })
)

const options = {
  hostname: 'https://beta3.api.climatiq.io/travel/flights',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 0JF6Q0M8K1M2VCGEVHG167XMFV9E'
  }
}
const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()

app.all('/api', function (req, res) {


})

  // })
  //   .then(function (response) {

  //     //console.log(JSON.stringify(body.req))
  //     var a = JSON.stringify({ test: "good" })
  //     res.json(a);
  //   })
  //   .catch((error) => {
  
  //     // Code for handling the error
  //    // console.log(JSON.stringify(body.req))
  //    console.log(error)
  //     var a = JSON.stringify({ test: "uh oh" })
  //     res.json(a);
  //   });


  // console.log('welcome, ' + JSON.stringify(req.body))



  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
