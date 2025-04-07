import{ Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation';
import { limiter } from '../config/limiter';


const router = Router()
router.use(limiter)
router.post('/create-account' , 
    
    body('name')
    .notEmpty().withMessage('El nombre no puede estar vacio'),

    body('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    
    body('email')
    .isEmail().withMessage('El correo no es valido'),

    handleInputErrors,
    
    AuthController.createAccount 
)

router.post('/Confirm-Acount',
    
    body('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('El token es requerido'),
        handleInputErrors,
    AuthController.confirmAccount

)

router.post('/login', 
    body('email')
    .isEmail().withMessage('El correo no es valido'),
    body('password')
    .notEmpty().withMessage('La contraseña es requerida'),
    handleInputErrors,
    AuthController.login)


    router.post('/reset-password', 
    body('email')
    .isEmail().withMessage('El correo no es valido'),
    handleInputErrors,    
    AuthController.resetPassword)     
    
    router.post('/validate-token', 
        body('token')
        .notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage('El token es requerido'),
            handleInputErrors,
        AuthController.validateToken)     


    router.post('/update-password/:token', 
        param('token')
        .notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage('El token es requerido'),
        body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
        
        handleInputErrors,
        AuthController.resetpasswordwithtoken)
       
export  default router
