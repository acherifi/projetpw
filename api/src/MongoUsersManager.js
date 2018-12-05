const uniqueID = () => require('uniqid')('cw-');
module.exports = class MongoUsersManager {
  constructor(database) {
    this.database = database;
    this.collection = this.database.collection('users');
  }
  addUser(mail, pwd) {
    if (!this.userExists(mail, pwd)) {
      this.collection.insertMany([{id: uniqueID(), email: mail, password: pwd, idwatch: ''}]);
    }
  }
  userExists(email, password) {
    // TODO
    return false;
  }
};
