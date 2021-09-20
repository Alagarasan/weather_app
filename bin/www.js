import app from '../app.js';

const port = process.argv[2] || 3000;

app.listen(port, (err) => {
 	err ? console.log('Error on starting server', err) : console.log(`Server listening on port ${port}`) 
});

process.on('uncaughtException', (ex)=>{
  console.log(ex);
});
