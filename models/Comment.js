const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'user',
                key: 'id'
            } 
            
        },
        comment_text: {
            type: DataTypes.STRING,
            validate:{
                len:[1]
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model:'post',
                key: 'id'
            }
            
        },
    },
    {
       
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;