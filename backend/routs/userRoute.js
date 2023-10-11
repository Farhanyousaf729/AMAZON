import express from 'express'
const router = express.Router()
import {authUser , getUserProfile , RegisterUser ,UpdateUser , getUser ,deleteUser ,getUserById ,updateUser} from "../controllers/usercontroller.js"
import {protect , admin} from "../middleware/authmiddleware.js"
// router.route ('/')
//          .post('/login', authUser)
        //  .get('/profile' , getUserProfile)
// router.post('/login', authUser)
// router.get('/profile', getUserProfile)
// router.route('/').post(authUser)
router.route('/').post(RegisterUser).get(protect ,admin , getUser)
router.route('/login').post(authUser)
router.route('/profile').get((protect) ,getUserProfile).put((protect) , UpdateUser)  
router.route('/:id').delete(protect , admin , deleteUser).get((protect) ,admin , getUserById).put(protect, admin ,updateUser)
export default router 