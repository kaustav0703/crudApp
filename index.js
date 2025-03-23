import 'dotenv/config';
import express from 'express';
const app=express();
const port=process.env.PORT || 3000;
const hostname='127.0.0.1';

app.use(express.json());

let teaData=[];
let id=1;

// CRUD(Create, Read, Update, Delete) 
// Add Tea
app.post('/teas', (req, res, next)=>{
    const {name, price} = req.body;

    const tea = {
        id:id++, name, price
    };

    teaData.push(tea);
    res.status(201).send(teaData);
})

//Get All Tea
app.get('/teas', (req, res, next)=>{
    res.status(201).send(teaData);
})

//Get a tea by id
app.get('/teas/:id', (req, res, next)=>{
    const teaId=req.params.id;
    console.log("THIS IS THE TEA ID", teaId);
    const tea=teaData.find(tea=>tea.id==parseInt(teaId));
    console.log("THE TEA IS ", tea);
    res.status(201).send(tea);
})

//Update by id
app.put('/teas/:id', (req, res, next)=>{
    const teaId=parseInt(req.params.id);
    const tea=teaData.find(tea=>tea.id===teaId);
    if(!tea){
        return res.status(404).send('Tea Not Found');
    }
    const {name, price}=req.body;
    tea.name=name;
    tea.price=price;
    res.status(201).send(tea);
})

//Delete by id
app.delete('/teas/:id', (req, res, next)=>{
    const teaId=parseInt(req.params.id);
    const teaIndex=teaData.findIndex(tea=>tea.id===teaId);
    if(teaIndex===-1){
        return res.status(404).send('Tea Cannot Be Deleted');
    }
    teaData.splice(teaIndex, 1);
    res.status(204).send('deleted');
})

app.listen(port, hostname, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`Server started at ${hostname}:${port}`);
    }
})
