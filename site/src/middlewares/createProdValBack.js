const validator = require('express-validator');
let db = require("../database/models");


const createProdValBack = [
    validator.check('name')
    .notEmpty().withMessage('El nombre del producto no puede estar vacío')
    .isLength({min: 5}).withMessage("El nombre debe tener al menos 5 carácteres"),
    validator.check('short_name')
    .notEmpty().withMessage('El nombre reducido del producto no puede estar vacío')
    .isLength({min: 5, max:30}).withMessage("El nombre reducido del producto debe tener entre 5 y 30 caracteres"),
    validator.check('producer_id')
    .notEmpty().withMessage('Tenés que elegir un productor'),
    validator.check('year')
    .notEmpty().withMessage('Tenés que ingresar un año')
    .isFloat({min: 1900, max: 2022}).withMessage("El año debe estar comprendido entre 1900 y 2022")
    .isInt().withMessage("El año debe ser un número"),
    validator.check('varietal_id')
    .notEmpty().withMessage('Tenés que ingresar un varietal'),
    validator.check('type_id')
    .notEmpty().withMessage('Tenés que ingresar un tipo'),
    validator.check('price')
    .notEmpty().withMessage('Tenés que ingresar un precio')
    .isInt().withMessage("El precio debe ser un número"),
    validator.check('description')
    .notEmpty().withMessage('La descripción del producto no puede estar vacía')
    .isLength({min: 20}).withMessage("El nombre debe tener al menos 20 carácteres"),
    validator.check('location')
    .notEmpty().withMessage('La ubicación del viñedo no puede estar vacía'),
    validator.check('altitude')
    .notEmpty().withMessage('Tenés que ingresar una altura')
    .isInt().withMessage("La altitud debe ser un número"),
    validator.check('winemaker_id')
    .notEmpty().withMessage('Tenés que elegir un enólogo'),
    validator.check('winemaker_id'),
    validator.check('varietal_comp')
    .notEmpty().withMessage('La composición varietal no puede estar vacía'),
    validator.check('soil')
    .notEmpty().withMessage('La composición del suelo no puede estar vacía'),
    validator.check('abv')
    .notEmpty().withMessage('Tenés que ingresar una graduación alcohólica porcentual')
    .isFloat({min: 0 , max: 95}).withMessage("La graduación alcohólica debe estar entre 0 y 95%"),
    validator.check('breeding')
    .notEmpty().withMessage('La crianza no puede estar vacía, aunque sea un vino joven'),
   
]

module.exports = createProdValBack;