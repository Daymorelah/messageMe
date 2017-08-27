
import jwt from 'jsonwebtoken';
import model from '../models';

const User = model.User;
const Group = model.Group;
//const GroupUsers = model.GroupUsers;
const secrete = process.env.SECRETE;

export default {
  CreatUser(req, res){
    User.create({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      bestFriend: req.body.bestFriend
    })
    .then(data => {
//generate token via jsonwebtoken
      const token = jwt.sign({
        userId: data.id,
        Username: data.userName,
        Email: data.email,
      }, secrete, {
        expiresIn: '10h'
      });
      let result = {
        Username: data.userName,
        Email: data.email,
        Password: data.password,
        'Best Friend': data.bestFriend
      };
      res.status(201).send({token, result});
    }).catch(error => res.status(401).send(error.message));
  }, //end of property CreateUser
  list(req, res){
    User.findAll({
      include: [{
      //   model: Group,
      //   as: 'groupsForThisUser',
      //   foreignKey: 'id'
      // },
      // {
        model: User,
        as: 'userBestFriend',}]
    })
    .then(data =>  {
      let results = [] ;
      let body = [];
      data.forEach( (dat) => {
        let result = {
          Username: dat.userName,
          Email: dat.email,
          Password: dat.password,
          'Best Friend': dat.userBestFriend//.userNAme //userBestFriend is an object not an array so cant use .map or forEach
        };
        // dat.groupsForThisUser.forEach((grp)=>{  //in group controller we used .map function of an array object
        //   body.push(grp.groupName);
        // });
        // result['Groups this user belongs to'] = body;
        body = [];
        results.push(result);
      }); //end of forEach loop
      res.status(201).send(results);
    })
    .catch(error => res.status(401).send(error.message));
  }, //end of property list
  addGroup(req, res){
    User.findById(req.params.id)
    .then((foundUser) => {
      if(!foundUser){
        return res.send({message: 'User not found'});
      }else{
        GroupUsers.create({
          userid: req.params.id,
          groupid: req.body.groupid
        });
        return res.status(201).send(({message: 'User has been added to the Group succesfully'}));
      } //end of GroupUsers and else statement
    }) // promise
    .catch(error => res.status(401).send(error));
  }, //end of property addGroup
  login(req, res){
    if (req.body.userName && req.body.password){
//Check if the user exists.
      User.findOne({
        where: {userName: req.body.userName}
      }).then( (foundUser) => {
        if (foundUser && foundUser.verifyPassword(req.body.password, foundUser.password)){
          const token = jwt.sign({
            userId: foundUser.id,
            Username: foundUser.userName,
            Email: foundUser.email,
          }, secrete, {
            expiresIn: '10h'
          }); //end of generating token
          res.status(200).send({token, foundUser, message: 'Login sucessful'});
        }else{
          return res.status(401).send({message: 'Incorrect Username or password'});
        }
      }).catch( err => res.status(400).send(err.message));
    }else{
      return res.status(400).send({message: 'Please fill all required'});
    }
  },
}; //end of export default