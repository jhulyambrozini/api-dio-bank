import { Router } from 'express';
import { UserController } from './controllers/UserController';

const router = Router();
const userControler = new UserController();

router.get('/user', userControler.getAllUsers);

router.post('/user', userControler.createUser);

router.delete('/user/:uid', userControler.deleteUser);

export default router;
