const Router=require('koa-router');
const UserRouter =require('./user');
const BookRouter=require('./book');
const Index=new Router()

Index.use('/user',UserRouter.routes(),UserRouter.allowedMethods());
Index.use('/bookmarket',BookRouter.routes(),BookRouter.allowedMethods());
module.exports=Index;
