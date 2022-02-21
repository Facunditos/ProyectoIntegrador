const path = require("path");
const fs = require("fs");
const usersImagePath = path.join(__dirname, "../../public/img/users-img");
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs')
// lo hice como explican en el video de login completo - usan este model 
let db = require("../database/models");


const usersController =
{
    register: (req, res) => {

        const validation = validationResult(req)
        if (req.method == "GET") {         // Si el metodo es GET muestra el formulario de registro de usuario
            return res.render("../views/users/register");
        } else {
            console.log(req.body)
            db.User.findOne({
                where:{
                    email:req.body.email
                }
            })
            .then(registeredUser=>{
                if (registeredUser) { // Si el usuario quiere registrarse, pero ya lo hizo, se le informa que no debe registrarse nuevamente
                    return res.render("users/register", { recordatorio: "Ya se había registrado previamente, inicia sesión con la contraseña ingresada oportunamente", oldData: req.body })
                } else if (!validation.isEmpty()) {//Si el usuario quiere registarse, pero no cumple con los requisitos de registración, los mismos son informados                        
                    const errors = validation.mapped()
                    const oldData = req.body
                    const oldFile=req.file
                    return res.render("users/register", { errors, oldData, oldFile })
                } else {// agregando la db
                    db.User.create({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: bcryptjs.hashSync(req.body.password, 10),
                            category: req.body.category,
                            image: req.file ? req.file.filename : "generic.png ", //si no viene una imagen cargo una genérica
                            // imageUser?
                        })
                    .then(function () {
                        res.redirect("/users/login"); //se redirige el usuario a la vista de login  
                    })
                    .catch(error=>console.log(error));        
                }
            })
            .catch(error=>console.log(error))
        }

    },
    login: (req, res) => {
        res.render("./users/login");
    },


    loginProcess: async (req, res) => {

        const userToLogin = await db.User.findOne({ where: { email: req.body.email } });
        

        // si no encuentra el email devuelve null
        if (userToLogin !== null) {
            // compara clave ingresada con la clave encriptada que esta en el JSON
            let isPasswordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);

            if (isPasswordOk) {
                // si las credenciales son validas redirijo al shop 
                // (modificar si tienen que ir a otro lugar)
                // borra password aunque estara encriptada
                delete userToLogin.password;
                // guardo el usuario loggeado
                req.session.userLoggedIn = userToLogin;
                req.session.emailUserLoggedIn = userToLogin.email;

                console.log("---------controlador---------");
                console.log(req.session);
                if (req.body.keepSessionOpen) {
                    // se mantiene abierta por 7 dias
                    res.cookie('userEmail', req.body.email, { maxAge: (60 * 1000) * 60 * 24 * 7 });
                }

                return res.render("./users/profile", { user: userToLogin });
            }
            return res.render("./users/login", {
                errors: {
                    login: {
                        msg: 'La contraseña ingresada no es correcta'
                    }

                }
                //, devolver lo que ingreso el usuario. oldData = req.body. ver dond e definir oldData
            });
        }
        return res.render("./users/login", {
            errors: {
                login: {
                    msg: 'Por favor, revisá el email ingresado. No lo encontramos registrado!'
                }

            }
            //, devolver lo que ingreso el usuario. oldData = req.body. ver dond e definir oldData
        });
    },

    profile: (req, res) => {
        return res.render('./users/profile', {
            user: req.session.userLoggedIn
        });
    },



    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect("/");
    },

    editar: function (req, res) {
        db.User.findByPk(req.params.id)
            .then(function (userToEdit) {
                res.render("./users/editUser", { user: userToEdit })
            })

    },

    guardar: function (req, res) {

        db.User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            category: req.body.category,
            image: req.file ? req.file.filename : req.body.oldImageUser, //si el usuario no modifico la image se vuelve a grabar la anterior
        },
            {
                where: {
                    id: req.params.id
                }
            }).then(function () {
                /* este .then es necesario para dar tiempo a que termine el update en la db 
                    antes de volver a mostrar el profile con los datos actualizados*/
                db.User.findByPk(req.params.id)
                    .then(function (userUpdated) {
                        res.render("./users/profile", { user: userUpdated })
                    });

            });


    },




}

module.exports = usersController;