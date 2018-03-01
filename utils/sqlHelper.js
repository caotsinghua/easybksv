const mysql=require('mysql')
const mysqlConfig=require('../config').mysqlConfig;

console.log('createPool')
const pool=mysql.createPool(mysqlConfig)

const sqlHelper=function(sql,values){
  return new Promise((resolve,reject)=>{
    console.log('get sql pool');
    pool.getConnection((err,connection)=>{

      if(err){
        reject(err);
      }else{
        connection.query(sql,values,(err,rows)=>{
          if(err)
            reject(err);
          else
            resolve(rows)
        })
        connection.release();
      }
      
    })
  })
}

module.exports=sqlHelper;