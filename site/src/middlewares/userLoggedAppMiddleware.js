const db=require("../database/models/index")

function userLoggedAppMiddleware(req, res, next) {
   res.locals.userIsLogged = false;
   
   let emailInCookie = req.cookies.userEmail;
   
   let emailInSession=req.session.emailUserLoggedIn
   if (emailInCookie || emailInSession) {
      db.User.findOne({
      where:{
         email:emailInCookie||emailInSession
      }
      })
      .then(user=>{
         
         
         if (user) {
         res.locals.userIsLogged = true;
         // lo pasa a locals para poder mostrarlo en el header
         res.locals.userLoggedIn = user;
         }
         next();
      })
      .catch(error=>console.log(error));
   } else {
    next();  
   }
 
}

module.exports = userLoggedAppMiddleware