

const sqlHelper=require('../utils/sqlHelper')
function handleError(res,err){
  res={
    success:false,
    errMsg:err.message
  }
  return res;
}
async function isUserExist(username){
  const sql=`select * from user_table where username ='${username}'`;
  let res;
  let exist=false;
  try{
    res=await sqlHelper(sql);
    if(res.length>0)
      exist=true;
    else
      exist=false;
  }catch(err){
    res=handleError(res,err);
    exist=false;
    console.error(err);
  }
  return exist;
}
module.exports={
  /**
   * 获取用户信息
   * @param {*用户id} id 
   */
  async getUser(id){
    let sql=`select  * from user_table where id='${id}' limit 1`;
    let res;
    try{
      let res1=await sqlHelper(sql);
      if(res1.length==0){
        res={
          success:true,
          userInfo:null,
          message:'没有该用户'
        }
      }else{
        let p={};
        for(let k in res1[0]){
          if(k!='password'){
            p[k]=res1[0][k];
          }
        }
        
        res={
          success:true,
          userInfo:p,
          message:'查找成功'
        }
      }
    }catch(err){
      handleError(res,err);
      console.error(err);
    }
   
    return res;
  },
/**
 * 添加用户
 * @param {*object{username,password}} user 
 */
  async addUser(user){
    let {username,password}=user;
    let res;
    let exist=await isUserExist(username);
    console.log(exist)
    if(!exist){
      let sql=`insert into user_table values(null,'${username}','${password}')`;
      try{
        res=await sqlHelper(sql);
      }catch(err){
        res=handleError(res,err);
        console.error(err);
      }
      if(res.affectedRows==1){
        res={
          success:true,
          message:'注册成功'
        }
      }
      return res;
    }else{
      res=handleError(res,{message:'用户名已存在'})
      return res;
    }
  },
/**
 * 修改用户名
 * @param {*id,username,new_username} user_info 
 */
  async editUserName(user_info){
    let {id,username,new_username}=user_info;
   
    let exist =await isUserExist(username);
    let newname_exist=await isUserExist(new_username);
    if(newname_exist){
      return {
        success:false,
        message:'要更改的用户名已存在'
      }
    }
    let res;

    if(exist){
      // 用户存在
      const sql=`update user_table set username='${new_username}' where id ='${id}'`;
      try{
        res=await sqlHelper(sql);
        if(res.affectedRows==1){
          res={
            success:true,
            message:'修改用户名成功'
          }
          return res;
        }
      }catch(err){
        res=handleError(res,err)
        return res;
      }
    }else{
      res=handleError(res,{message:'用户不存在'})
      return res;
    }
  },
/**
 * login
 * @param {*} param0 
 */
  async login({username,password}){
    let sql=`select * from user_table where username='${username}' and password ='${password}'`;
    let res;
    try{
      res=await sqlHelper(sql);
      
      return res.length;
    }catch(err){
      res=handleError(res,err);
      return res;
    }

  }
}