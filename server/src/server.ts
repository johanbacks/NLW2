import express from 'express';

const app =  express();
app.get('/users',(request,response) => {
  return response.send("teste")
})

app.listen(3030);