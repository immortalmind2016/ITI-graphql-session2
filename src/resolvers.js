const posts = [
  {
    id: "1",
    title: "post1",
    comments: [
      {
        text: "comment 1 post 1",
      },
      { text: "comment 2 post 1" },
    ],
  },
  {
    id: "2",
    title: "post2",
    comments: [
      {
        text: "comment 1 post 2",
      },
      { text: "comment 2 post 2" },
    ],
  },
];

const profiles = [
  {
    name: "ahmed",
    id: "1212312",
    pw: "1",
  },
  { name: "mohamed", pw: "2", id: "1221321" },
];

//Resolvers
const resolvers = {
  Post: {
    user: (parent, args, { dataSources: { user } }) => {
      return user.getById(parent.userId);
    },
  },
  Mutation: {
    signUp: (parent, { name }, { dataSources: { user } }) => {
      return user.create({ name });
    },
    createPost: (parent, { input }, { dataSources: { post } }) => {
      return post.create({ title: input.title, userId: input.userId });
    },
  },
  Query: {
    posts: async (_, args, { dataSources: { post } }) => {
      return post.list();
    },
    comments: (parent, { postId }, { postsDataSource }) => {
      // get comments of a specific post id
      const post = posts.filter((post) => post.id == postId)[0];
      return post?.comments;
    },
    movies: (parent, args, context) => {
      const moviesDataSource = context.dataSources.moviesDataSource;
      return moviesDataSource.getMovies();
    },
    welcomeMessage: () => {
      return "Hello GraphQL !";
    },
    myProfile: (parent, args, context) => {
      console.log("🚀 ~ file: resolvers.js ~ line 55 ~ context", context);
      //Database
      const profile = profiles.filter(
        (profile) => profile.pw == context.userPassword
      )[0];

      return profile;
    },
  },
};

module.exports.resolvers = resolvers;
