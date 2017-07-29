

export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    messageOwner: DataTypes.STRING,
    messageBody: DataTypes.TEXT
  });
  
  Message.associate = (models) => {
    Message.belongsTo(models.Group, {
      foreignKey: 'groupId',
      as: 'groupMess'
    });
  };
  return Message;
};