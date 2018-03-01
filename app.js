const Koa=require('koa');
const app=new Koa();
const bodyParser=require('koa-bodyparser');
const IndexRouter=require('./router/index');
app.use(bodyParser());
app.use(IndexRouter.routes()).use(IndexRouter.allowedMethods());


app.listen(3333,(err)=>{
  if(!err){
    console.log('[server] run on port:3333');
  }
})