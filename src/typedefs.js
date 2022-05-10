const {gql}=require("apollo-server")

//Schema
//Definitions 
const typeDefs=gql`

type Post{
    id:ID
    title:String
}

type Comment{
    text:String
}
type Movie{
    title:String
    producer:String
}
type Profile{
    id:ID
    name:String
}

type Query{
    posts:[Post]
    comments(postId:String!):[Comment]
    movies:[Movie]
    welcomeMessage:String
    myProfile:Profile
}
`

module.exports.typeDefs=typeDefs