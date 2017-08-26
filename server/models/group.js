

export default (sequelize, DataTypes) =>  {
  const Group = sequelize.define('Group', {
    groupName: DataTypes.STRING,
    description: DataTypes.STRING
  });
  Group.associate = (models) => {
    Group.hasMany(models.Message,{
      foreignKey: 'groupId',
      as: 'groupMessages',
      onDelete: 'CASCADE'
    });
    Group.belongsToMany(models.User, {
      through: 'GroupUsers',
      as: 'usersOfThisGroup',
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  }; //end of association
  return Group;
};