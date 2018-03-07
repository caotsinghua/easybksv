module.exports={
  "/user/:id":{//get
      "success": true,
      "userInfo": {
          "id": "0000000001",
          "username": "admin2"
      },
      "message": "查找成功"
  },
  "/user/login":{//post
        "success": false,
        "message": "检查用户名或密码"
  },
  "/user/register":{//post
    "success": false,
    "errMsg": "用户名已存在"
  },
  "user/editName/:id":{//put
    
        "success": true,
        "message": "修改用户名成功"
    
  },
  "bookmarket/user/:id":{//get
    "success": true,
    "books": [
        {
            "user_id": 1,
            "book_id": "233",
            "add_time": "2018-03-07T05:57:57.000Z"
        }
    ],
    "message": "获取成功"
  },
  "bookmarket/addBook":{//post
    "success": false,
    "message": "添加书籍失败,可能书籍已经在书架了"
  },
  "bookmarket/addBook/:bookid":{
      //delete
    //   body{userid:xxx}
    a:{
        "success": true,
        "message": "删除书籍成功"
    },
    b:{
        "success": false,
        "message": "删除书籍失败"
    }

  }
}