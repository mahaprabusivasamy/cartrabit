const app = require('./app');

// define a port 
const PORT = process.env.PORT || 5000;


// start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
