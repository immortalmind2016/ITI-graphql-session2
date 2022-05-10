const { DataSource } = require("apollo-datasource");
const { UserModel } = require("../model/user.model");
const Dataloader = require("dataloader");

class UserDataSource extends DataSource {
  initialize(config) {
    this.context = config.context;
    this.loaders = {
      //ids = [userid1,userId2,userId3]
      user: new Dataloader(
        (ids) =>
          new Promise(async (resolve, reject) => {
            //example [1,2,3]
            const users = await UserModel.find({ _id: { $in: ids } });

            // [{_id:1,name:"mohamed"},{_id:2,name:"momed"}]
            // [{1:{name:"mohamed"}},{2:{name:"ahmed"}}]
            const mappedUsers = users.map((user) => {
              return { [user._id]: user };
            });

            resolve(mappedUsers);
          })
      ),
    };
  }
  create(input) {
    const { name } = input;
    return UserModel.create({ name });
  }
  async getById(id) {
    const user = await this.loaders.user.load(id);
    return user[id];
  }
}

module.exports.UserDataSource = UserDataSource;
