const express = require('express');
const app = express();


const PORT = 3200
app.listen(PORT, ()=> 
      console.log(`Server is listening at port ${PORT}`))