require('dotenv').config({ path: 'config/.env' })
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {DataTypes, Model} = require('sequelize')

const sequelize = require('../database/sequelize')

class User extends Model {
  static async findByCredentials(email, password) {
    const user = await User.findOne({where: {email}})

    if (!user) {
      throw new Error('Unable to login')
    }

    const isPassword = await bcrypt.compare(password, user.dataValues.password)

    if (!isPassword) {
      throw new Error('Unable to login')
    }
    return user
  }

  // To avoid some columns being sent as part of response
  toJSON() {
    const user = super.toJSON()
    delete user.password
    return user
  }

  async generateAuthToken() {
    const token = await jwt.sign({_id: this.user_id}, process.env.JWT_SECRET)
    // Add generated token to Token's table
    const newToken = await Token.create({
      token_id: token,
      user_id: this.user_id
    })
    return token
  }
}

User.init({
  user_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  about: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.STRING,
    unique: {
      msg: 'Email already in use'
    },
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'The provided email is not valid'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 8
    },
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 8))
    }
  }
}, {
  sequelize,
  timestamps: true,
})

// Token Model

class Token extends Model {}

Token.init({
  token_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  }
}, {
  sequelize,
  timestamps: true
})

// Token and User associations
Token.belongsTo(User, {
  foreignKey: 'user_id'
})
User.hasMany(Token, {
  foreignKey: 'user_id'
})

module.exports = {
  User,
  Token
}