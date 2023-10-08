const { Sequelize, DataTypes } = require("sequelize");
const p = require("path");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: p.join(__dirname, "hashes.db"),
});

const Hash = sequelize.define("Hash", {
    hash: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
    currentFileName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    musicType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    album: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    area: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gameVersion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = {
    Hash,
    sequelize,
};
