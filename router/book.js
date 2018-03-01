/**
 * 书架管理（非书籍）
 */
const Router=require('koa-router');
const BookService =require('../service/bookService')
const BookRouter=new Router();

BookRouter
.get('/user/:id',async ctx=>{
  // 获取指定用户的书架中的内容
  let userid=ctx.params.id;
  let res=await BookService.getBookMarket(userid);
  ctx.body={
    success:true,
    results:res
  }
})
.post('/addBook',async ctx=>{
  // 获取用户id和书籍id，添加到书架中
  let {userid,bookid}=ctx.request.body;
  let res=await BookService.addBook(userid,bookid);
  if(res.affectedRows==1){
    ctx.body={
      success:true,
      message:'添加书籍成功'
    }
  }else{
    ctx.body={
      success:false,
      message:'添加书籍失败'
    }
  }
})
.delete('/deleteBook/:id',async ctx=>{
  // 删除书架中的书籍
  let bookid=ctx.params.id;
  let {userid}=ctx.request.body;
  let res=await BookService.deleteBook(userid,bookid);
  if(res.affectedRows>0){
    ctx.body={
      success:true,
      message:'删除书籍成功'
    }
  }else{
    ctx.body={
      success:false,
      message:'删除书籍失败'
    }
  }
})

module.exports=BookRouter;