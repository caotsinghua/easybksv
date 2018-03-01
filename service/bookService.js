const sqlHelper=require('../utils/sqlHelper')
function handleError(err){
  let res={
    success:false,
    errMsg:err.message
  }
  return res;
}
Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
}     
module.exports={
  async getBookMarket(userid){
    let sql=`select * from user_book_table where user_id='${userid}'`;
    let res;
    try{
      res=await sqlHelper(sql);
      return res;
    }catch(err){
      res=handleError(err);
      return res;
    }
  },
  async addBook(userid,bookid){
    let addTime=new Date().format('yyyy-MM-dd hh:mm:s')
    
    
    let sql=`insert into user_book_table values('${userid}','${bookid}','${addTime}')`;
    let sql2=`select * from user_book_table where user_id='${userid}' and book_id='${bookid}'`;
    let res;
    try{
      let res1=await sqlHelper(sql2);
      if(res1.length==0){
        res=await sqlHelper(sql);
        return res;
      }else{
        return {success:false,message:'书架中已存在该书籍'}
      }
      
    }catch(err){
      res=handleError(err);
      return res;
    }
  },
  async deleteBook(userid,bookid){
    let sql=`delete from user_book_table where user_id='${userid}' and book_id='${bookid}'`;
    let res;
    try{
      res=await sqlHelper(sql);
      return res;
    }catch(err){
      res=handleError(err);
      return res;
    }
  }
}