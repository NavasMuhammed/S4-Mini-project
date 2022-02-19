var express = require('express');
var router = express.Router();
var dbsql=require('../config/sqlconnection')
const bcrypt = require('bcrypt');
const { Router } = require('express');
const { log } = require('handlebars');
var msgs; 
let admin;let staff;let manager;
const Razorpay = require('razorpay'); 
  
// This razorpayInstance will be used to
// access any resource from razorpay
const razorpayInstance = new Razorpay({
  
    // Replace with your key_id
    key_id: 'rzp_test_BlGOJy0Q6vHA3Q',
  
    // Replace with your key_secret
    key_secret: 'bqjMLB5Ayqe0TviFMlKOuMUO'
});

//Inside app.js
router.post('/createOrder', (req, res)=>{

	// STEP 1:
	const {amount,currency,receipt, notes} = req.body;	
		
	// STEP 2:	
	razorpayInstance.orders.create({amount, currency, receipt, notes},
		(err, order)=>{
		
		//STEP 3 & 4:
		if(!err)
			res.json(order)
		else
			res.send(err);
		}
	)
});


router.get('/admin',function (req,res,next) {
  req.session.destroy();
  manager=0;
 
  res.render('admin/signin',{staff})
})
router.get('/manager',function (req,res,next){
  manager=1;admin=0;

  dbsql.query('SELECT * FROM users ORDER BY roomno ASC',function(err,row,field){
  res.render('manager/details',{customer : row})
})
})
router.get('/staffshow',function (req,res,next){

  dbsql.query('SELECT * FROM staffdetails ORDER BY empid',function(err,row,field){
  res.render('manager/staffdetails',{customer : row})
})
})


router.get('/addstaff',function(req,res){
   
  res.render('staffbooking/addstaff');
});

router.post('/addstaff',function(req,res){
   
  var data={
    empid: req.body.empid,
    Name: req.body.name,
    email: req.body.email,
    Role: req.body.role,
    Department: req.body.department,
    Salary: req.body.salary
  }
  console.log(data)
  dbsql.query('INSERT INTO staffdetails SET ?',data,function(err,row,field){
    
    res.redirect('/staffshow')

  }
  )}); 


router.get('/staffsignup', function (req,res) {
  res.render('manager/staffsignup')
})

router.post('/staffsignup', async function (req,res,next) {
  pwd= await bcrypt.hash(req.body.password,10)
   var data={
      username: req.body.username,
      password: pwd,
      email: req.body.email
   }
  dbsql.query('SELECT * FROM staffdetails WHERE email = ?',req.body.email,function (err,row,field) {
     if(row.length){
       dbsql.query('INSERT INTO staff SET ?',data,function (err,row,field) {
         res.redirect('/staffshow')
       })
     }else{
     res.send('Incorrect Details')
     }
  })
  
})

router.post('/adminlogin',function (req,res,next){
  var username=req.body.username;
  var Passwords=req.body.password;
  staff=1;
  if (username && Passwords) {
    admin=0;
		dbsql.query('SELECT * FROM staff WHERE Username = ?',username,async function(error, result, fields) {
      if(await bcrypt.compare(Passwords,result[0].password)){
        req.session.loggedAdminIn=true;
        req.session.user=result[0];
        admin=1;staff=0;manager=0;
        dbsql.query('SELECT * FROM users ORDER BY roomno ASC',function(err,row,field){
        res.render('admin/admin-signin',{customer : row,admin,layout : false}) 
      })}
      else{
        res.redirect('/admin')
      }
  })
  }
else{
      res.redirect('/admin');
}
})
router.get('/updatestaff/:empid', function (req, res) {
  dbsql.query('SELECT * FROM staffdetails WHERE empid = ?', req.params.empid, function (err, row,field) {
      if (err)
          throw err;
      
      res.render('staffbooking/updatestaff',{customer: row[0], id : req.params.id});
  });
});

router.post('/updatestaff/:empid', function (req, res) {
  var data = {
    empid: req.body.empid,
    Name: req.body.name,
    email: req.body.email,
    Role: req.body.role,
    Department: req.body.department,
    Salary: req.body.salary
  };
  var ids=req.body.empid;
 
  dbsql.query('UPDATE staffdetails SET ? WHERE empid = ?',[data,ids], function (err, row, fields) {
    
    if (err){
          throw err;
         }
          res.redirect('/staffshow')

  })})

  router.get('/deletestaff/:empid', function (req, res) {
    dbsql.query('DELETE FROM staffdetails WHERE empid = ?', req.params.empid, function (err, row) {
        if (err)
            throw err;

             res.redirect('/staffshow')
     })})
           
            
    
 

/* GET home page. */
router.get('/', function(req, res, next) {
 manager=0;
let adminss= req.session.loggedAdminIn;
let userstatus= req.session.loggedIn; 
let users= req.session.user;
res.render('home/index',{users,adminss,userstatus})
})

router.get('/signin', function(req, res, next) {
 msgs=0;
    res.render('user/signin',{layout : false});
  
 });

 router.get('/userhome', function(req, res, next) {
   let user=req.session.user;
   let users= req.session.user;
   let Emails= users.Email
   dbsql.query('SELECT * FROM users WHERE email= ?',Emails,function(error,results,fields){
     console.log(results[0]);
     res.render('user/user-signin',{user,customer : results[0],layout : false})
  ;})
 });


 router.get('/signup',function(req,res,next){
   res.render('user/signup',{layout : false})
 })
 

 router.post('/loginaction', function(req, res) {
   let loginstatus=false;
  var Emails=req.body.Email;
  var Passwords=req.body.Password;
  console.log(req.body)
  if (Emails && Passwords) {
    admin=0;
		dbsql.query('SELECT * FROM logindetails WHERE Email = ?',Emails,async function(error, result, fields) {
      console.log(result[0].password);
      if(await bcrypt.compare(Passwords,result[0].password)){
        req.session.loggedIn=true;
        req.session.user=result[0];
        var user=req.session.user;
        dbsql.query('SELECT * FROM users WHERE email= ?',Emails,function(error,results,fields){
          console.log(results[0]);
          res.render('user/user-signin',{user,customer : results[0],layout : false});

        })
       
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
})
router.get('/signout',function (req,res) {
   req.session.destroy();
   admin=0;
   res.redirect('/')
})
router.get('/passwordreset',function (req,res,next) {
  var user= req.session.user;
  console.log(user)
   res.render('admin/adminpasswordreset',{user})
})

router.post('/passwordreset',async function (req,res,next) {
  var ps1 = req.body.passwordconfirm;
  var ps=req.body.password;
  var password=await bcrypt.hash(ps,10);
  var username =req.body.username;
  admin=1;
  data={
    password : password
  }
  if(ps1==ps){
    dbsql.query('UPDATE staff SET ? WHERE username = ?',[data,username], function (err, row, fields){
   dbsql.query('SELECT * FROM users ORDER BY roomno ASC',function(err,row,field){
        res.render('admin/admin-signin',{customer : row,admin,layout : false}) 
      })
  })
  } 
  else{
    res.send('Passwords not matching')
  }
})

router.post('/signupaction',async function (req,res){
  var ps=req.body.password;
  var password=await bcrypt.hash(ps,10)
  var email= req.body.Email;
  
  if(email && ps){
  dbsql.query('SELECT * FROM logindetails WHERE Email = ?',email,function(err,rows,field){
    console.log(rows.length);
    if(rows.length){
       msgs=1;
      res.render('user/signin',{msgs,layout :false});
     }
    else {
     var data={
      Username: req.body.username,
      Email: req.body.Email,
      Password: password
      }
      msgs=0;
     dbsql.query('INSERT INTO logindetails SET ?',data,function(err,row,field){
       res.render('user/signin',{layout : false})
     })
    
  }
})
  }

 else{
   res.redirect('/signup')
   
 }
  

})




 // if(dbsql.query('SELECT * FROM logindetails WHERE Email = Emails AND password = Passwords')==0){
   // console.log(req.body)
  //}
// else{
// dbsql.query('SELECT * FROM users',function(err,row,field){
//
  //  res.render("admin-signin",{customer : row})
 // })
 // }
 //});


 router.post('/booking', function(req, res, next) {
   admin=0;
   
   var checkin= req.body.check_in_date; 
   var checkout= req.body.check_out_date;
   var person= req.body.person;
  res.render('booking/booking',{checkin,checkout,person});
 });
 router.get('/deleteuser/:id', function (req, res) {
  dbsql.query('DELETE FROM users WHERE id = ?', req.params.id, function (err, row) {
      if (err)
          throw err; 
        if(admin){
          dbsql.query('SELECT * FROM users ORDER BY roomno ASC',function(err,row,field){

            res.render("admin/admin-signin",{customer : row,admin,layout : false})
          })}
          else if(manager){
      
            res.redirect('/manager')
            }
          
  });
});
router.get('/updateuser/:id', function (req, res) {
  dbsql.query('SELECT * FROM users WHERE ID = ?', req.params.id, function (err, row) {
      if (err)
          throw err;
      
      res.render('booking/booking_update', {customer: row[0], id : req.params.id});
  });
});
router.post('/updateuser/:id', function (req, res) {
  var data = {
     roomno: req.body.roomno,
     name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    street: req.body.street,
    country: req.body.country,
    bedding: req.body.bed,
    person: req.body.person,
    room: req.body.room,
    arrive: req.body.arrive,
    depart: req.body.depart,
    comments: req.body.comments,
    streetnumber: req.body.streetnumber,
    postcode: req.body.postcode,
    city :req.body.city
  };
  var ids=req.body.id;
 
  
  dbsql.query('UPDATE users SET ? WHERE id = ?',[data,ids], function (err, row, fields) {
    
    if (err)
          throw err;
          var email=req.body.email;

          dbsql.query('SELECT * FROM users ORDER BY roomno ASC',function(err,row,field){
            if(req.session.loggedIn){
              dbsql.query('SELECT * FROM users WHERE email= ?',email,function(error,results,fields){
              var user=req.session.user;
              res.render('user/user-signin',{user,customer:results[0],layout : false})
            })}
            else if(admin){

            res.render("admin/admin-signin",{customer : row,admin,layout :false})
            }
            else if(manager){

              res.redirect('/manager')
              }
            else{
              res.redirect('/')
            }
          })   
          
  })
});
router.get('/messages',function (req,res) {
  dbsql.query('SELECT * FROM complaints',function(err,row,field){
    res.render('admin/messages',{msg : row})

  })
})

router.post('/message',function (req,res) {
  var data={
    Name: req.body.FullName,
    Phone: req.body.Phone,
    Email: req.body.Email,
    Message: req.body.Message

  }
  console.log(data);
  dbsql.query('INSERT INTO complaints SET ?',data,function(err,row,field){
    
    res.redirect('/')
  })

})

 router.post('/bookingaction',function(req,res){
   
   var data={
     name: req.body.name,
     email: req.body.email,
     phone: req.body.phone,
     street: req.body.street,
     country: req.body.country,
     bedding: req.body.bed,
     person: req.body.person,
     room: req.body.room,
     arrive: req.body.arrive,
     depart: req.body.depart,
     comments: req.body.comments,
     streetnumber: req.body.streetnumber,
     postcode: req.body.postcode,
     city :req.body.city
     
    
   }
   Emails=req.body.email;

   dbsql.query('INSERT INTO users SET ?',data,function(err,row,field){
     if(req.session.loggedIn){
      dbsql.query('SELECT * FROM users WHERE email= ?',Emails,function(error,results,fields){
        console.log(results[0]);
        res.render('user/user-signin',{user,customer : results[0],layout : false});

      })

     }
     else if(admin){
     dbsql.query('SELECT * FROM users',function(err,row,field){

     res.render('admin/admin-signin',{customer : row,admin,layout : false})
     })}
     else if(manager){
      
      res.redirect('/manager')
      }
     else{
       res.render('user/signup',{layout : false})
     }
    
   }
     
   )});     
 
 router.get('/booking',function(req,res){
   
   res.render('booking/booking');
 });

module.exports = router;
