

export default (sequelize, DataTypes) => {
  var GroupUsers = sequelize.define('GroupUsers', {
    userid: DataTypes.INTEGER,
    groupid: DataTypes.INTEGER
  });
  return GroupUsers;
};