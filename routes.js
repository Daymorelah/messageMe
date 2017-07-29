
import express from 'express';
import {Group, Message, User} from './server/controller';

const router = express.Router();
const groupController = Group;
const messageControler = Message;
const userController = User;

router.get('/home', (req, res) => {
  res.status(201).send({Message: 'Welcome to the App!'});
}); //end of home page

router.post('/group', groupController.CreateGroup);
router.get('/group/list', groupController.list);
router.post('/message', messageControler.createMessage);
router.get('/message/list', messageControler.list);
router.post('/user', userController.CreatUser);
router.get('/user/list', userController.list);
router.put('/user/:id/addGroup', userController.addGroup);
router.put('/group/:id/addUser', groupController.addUser);

export default router;