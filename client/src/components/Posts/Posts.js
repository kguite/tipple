import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'; // fetching data from global redux store


import Post from './Post/Post';
import useStyles from './styles';

const Posts = ( { setCurrentId } ) => {
    const posts = useSelector((state) => state.posts); // initializing hook. posts is from line 5 in reducers/index.js
    const classes = useStyles;//typeError was here

    console.log(posts);
    
    // if no posts, show circular progress. if posts, show grid
    return (
       !posts.length ? <CircularProgress /> : (
           <Grid className={classes.container} container alignItems="stretch" spacing={3}>
               {posts.map((post) => (
                   <Grid key={post._id} item xs={12} sm={6}>
                       <Post post={post} setCurrentId={setCurrentId} /> 
                   </Grid>
               ))}
           </Grid>
    )
    );
  };
  
  export default Posts;
  