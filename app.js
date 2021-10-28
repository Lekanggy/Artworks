const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path')
const axios = require('axios')

//set view engine
app.set("view engine", "ejs")

//load assets with static file
app.use('/css',express.static(path.resolve(__dirname, 'assets/css')) )
app.use('/img',express.static(path.resolve(__dirname, 'assets/img')) )
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))

//Make a get request
app.get('/', (req, res) => {
    const num = 1002;
    axios(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${1002}`, {
        params: {
            _limit: 10
        }
    }
    ).then(jsonData => {
      console.log(jsonData.data.objectName)
        const value = jsonData.data
      res.render('index', {value});
    }).catch((err)=>{
        return res.status(404).json("Request Failed");
    })
})


app.listen(process.env.PORT || 5001, () => {
    console.log("Server Listening at port 5001")
})