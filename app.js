const express=require("express")
const fs=require("fs")
const path=require("path")
const morgan=require("morgan")
const { version } = require("os")
const app=express()
const accesingLog=fs.createWriteStream(path.join(__dirname,"src","access.log"),{flags:"a"})


morgan.token("http-version",(req)=>{
    return `HTTP/${req.httpVersion}`
})
morgan.token("date",()=>{
    return new Date().toISOString()
})
app.use(morgan("combined",{stream:accesingLog}))
app.use(express.json())
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the homepage!');
});
  
app.get('/get-users', (req, res) => {
    res.status(200).json({ message: 'List of users' });
});
  
app.post('/add-user', (req, res) => {
    res.status(201).json({ message: 'User added successfully' });
});
  
app.put('/user/:id', (req, res) => {
    res.status(201).json({ message: `User with ID ${req.params.id} updated successfully` });
});
  
app.delete('/user/:id', (req, res) => {
    res.status(200).json({ message: `User with ID ${req.params.id} deleted successfully` });
});
  
app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
});