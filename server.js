const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path')

//dotenv configuration
dotenv.config();

//test object
const app = express();

//middleware
app.use(cors());
app.use(express.json());


//static files access
app.use(express.static(path.join(__dirname, './frontend/build' )))
//routes
app.use('/api/v1/portfolio', require('./routes/portfolioRoute'));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
