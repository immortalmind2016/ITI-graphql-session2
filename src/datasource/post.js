const { DataSource } = require("apollo-datasource");
const { PostModel } = require("../model/post.model");

class PostDataSource extends DataSource {
  initialize(config) {
    this.context = config.context;
  }
  create(input) {
    return PostModel.create(input);
  }
  async list() {
    const posts = await PostModel.find({});
    return posts;
  }
}
module.exports.PostDataSource = PostDataSource;
