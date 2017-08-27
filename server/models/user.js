
import bcrypt from 'bcrypt-nodejs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    bestFriend: DataTypes.INTEGER
  },{
    hooks:  {
      beforeCreate: (user) =>{
        const hashedPassword =  bcrypt.hashSync(user.password, bcrypt.genSaltSync(9), null);
        user.password = hashedPassword;
      },
      beforeUpdate: (user) =>{
        if (user.password){
          const hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(9), null);
          user.password = hashedPassword;
          user.updateAt = Date.now();
        }
      }
    }
  });

  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      through: 'GroupUsers',
      as: 'groupsForThisUser',
      foreignKey: 'groupid',
      onDelete: 'CASCADE' 
    });
    User.belongsTo(User, {foreignKey: 'bestFriend', as: 'userBestFriend', onDelete: 'CASCADE'});
  }; //end of association
  
//used when a user want to login so as to chek if the password entered is coreect.
  User.prototype.verifyPassword = (formPassword) => {
    return bcrypt.compareSync(formPassword, this.password);
  }; //end of instance method verifyPassword
  return User;
};