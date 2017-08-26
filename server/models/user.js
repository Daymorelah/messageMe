
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    bestFriend: DataTypes.INTEGER
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
  return User;
};