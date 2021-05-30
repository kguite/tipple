import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
        // mapping over posts array, changing something in there, returning changed array. 
            //inside map is single post.  if id is equal to payload, then return the action.payload. 
            //because action payload is newly updated post or memory. otherwise, return just the post as it was without any updates.
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
        // filter filters out the post that we want to delete
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
