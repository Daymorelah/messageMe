
import express from 'express';
import {Group, Message, User} from './server/controller';
import protect from './server/middlewear/auth';

const router = express.Router();
const groupController = Group;
const messageControler = Message;
const userController = User;

router.get('/', (req, res) => {
  res.status(201).send({Message: 'Welcome to the API for thatMyApp'});
}); //end of home page

router.post('/group', protect.checkForToken, groupController.CreateGroup);
router.get('/group/list', protect.checkForToken, groupController.list);
router.post('/message', protect.checkForToken, messageControler.createMessage);
router.get('/message/list', protect.checkForToken, messageControler.list);
router.post('/user', userController.CreatUser);
router.get('/user/list', protect.checkForToken, userController.list);
router.put('/user/:id/addGroup', protect.checkForToken, userController.addGroup);
router.put('/group/:id/addUser', protect.checkForToken, groupController.addUser);
router.post('/login', userController.login);
/*Used to test a react-redux bookshop app.
router.get('/user/list',  userController.list);
router.post('/group', groupController.CreateGroup); */

export default router;