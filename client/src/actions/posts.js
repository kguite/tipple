import { FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes';
import * as api from '../api/index.js';

// Action Creators - functions that return actions
export const getPosts = () => async (dispatch) => { // imported in src/App.js
    try {
        const { data } = await api.fetchPosts();
    
        dispatch({ type: FETCH_ALL, payload: data }) // using redux to fetch data from back end
    } catch (error) {
        console.log(error);
    }
    
};
// when above action is dispatched to posts (line 16 in reducers/posts.js), reducers/post.js handles the logic of fetching all posts

export const createPost = (post) => async(dispatch) => {
    try { 
        const { data } = await api.createPost(post); // post API request, sending a post
        
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
}

};


export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post); // returning updated memory or post
    
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error); //error gives you more info than error.message
        }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
// no response needed, just deleting
        dispatch({ type: DELETE, payload: id})
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id); // no post necessary

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};