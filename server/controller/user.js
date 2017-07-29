
import model from '../models';

const User = model.User;
const Group = model.Group;
const GroupUsers = model.GroupUsers;

export default {
  CreatUser(req, res){
    User.create({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      bestFriend: req.body.bestFriend
    })
    .then(data => {
      let result = {
        Username: data.userName,
        Email: data.email,
        'Best Friend': data.bestFriend
      };
      res.status(201).send(result);})
    .catch(error => res.status(401).send(error));
  }, //end of property CreateUser
  list(req, res){
    User.findAll({
      // include: [{
      //   model: Group,
      //   as: 'groupsForThisUser',
      //   foreignKey: 'id'
      // },
      // {
      //   model: User,
      //   as: 'userBestFriend',}]
    })
    .then(data =>  {
      let results = [] ;
      let body = [];
      data.forEach( (dat) => {
        let result = {
          Username: dat.userName,
          Email: dat.email,
          //'Best Friend': dat.userBestFriend.userName //userBestFriend is an object not an array so cant use .map or forEach
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
    .catch(error => res.status(401).send(error));
  }, //end of property list
  addGroup(req, res){
    User.findById(req.params.id)
    .then((foundUser) => {
      if(!foundUser){
        res.send({message: 'User not found'});
      }else{
        GroupUsers.create({
          userid: req.params.id,
          groupid: req.body.groupid
        });
        res.status(201).send(({message: 'User has been added to the Group succesfully'}));
      } //end of GroupUsers and else statement
    }) // promise
    .catch(error => res.status(401).send(error));
  }, //end of property addGroup
}; //end of export default