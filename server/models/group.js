

export default (sequelize, DataTypes) =>  {
  const Group = sequelize.define('Group', {
    groupName: DataTypes.STRING,
    description: DataTypes.STRING
  });
  Group.associate = (models) => {
    Group.hasMany(models.Message,{
      foreignKey: 'groupId',
      as: 'groupMessages'
    });
    Group.belongsToMany(models.User, {
      through: 'GroupUsers',
      as: 'usersOfThisGroup',
      foreignKey: 'userid'
    });
  }; //end of association
  return Group;
};