const SchemaU = require('mongoose').Schema;

const UserInfoSchema = new SchemaU({
  password: {
    type: String,
    required: true,
  }
}, {timestamps: true});

module.exports = require('mongoose').model('UserInfo', UserInfoSchema);