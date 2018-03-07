/**
 * 用户管理（登录，注册..）
 */

 const Router =require('koa-router');
 const UserService=require('../service/userService')
 let UserRouter=new Router();

 UserRouter
 .post('/login',async ctx=>{
  //登录
  let {username,password}=ctx.request.body;
  let res=await UserService.login({username,password});
  if(res==1){
    ctx.body={
      success:true,
      message:'登录成功'
    }
  }else{
    ctx.body={
      success:false,
      message:'检查用户名或密码'
    }
  }
})
.post('/register',async ctx=>{
  // 注册
  let user=ctx.request.body;
  console.log(user);
  let res=await UserService.addUser({username:user.username,password:user.password});
  ctx.body=res;
})
.get('/:id',async ctx=>{
  // 获取id的用户信息(不包括书架)
  let userInfo=await UserService.getUser(ctx.params.id);
  ctx.body=userInfo;
  
})
.put('/editName/:id',async ctx=>{
  // 修改用户名
  let id=ctx.params.id;
  // body{username,new_username}
  let {username,new_username}=ctx.request.body;
  let res=await UserService.editUserName({id,username,new_username});
  ctx.body= res;
})

module.exports=UserRouter;