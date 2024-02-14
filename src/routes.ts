import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { LoginController } from './controllers/LoginController';
import { verifyAuth } from './middleware/verifyAuth';

const router = Router();

const userControler = new UserController();
const loginController = new LoginController();

router.post('/user', userControler.createUser);
router.get('/user/:uid', verifyAuth, userControler.getUser);
router.delete('/user/:uid', userControler.deleteUser);

router.post('/login', loginController.login);

export default router;
