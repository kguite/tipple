import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

// GET THE CURRENT ID 
 
              
const Form = ({ currentId, setCurrentId } ) => {
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: ''})
    // if we have currentID (not null), then loop over state.posts, call a find method on them. 
    // want to find the post that has the same ID as our current ID
    // if no current ID, return null
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();

    // dependency array. When should the callback function be ran? When what changes? 
    //when the post value changes from nothing to the post
    useEffect(() => {
        if (post) setPostData(post);
      }, [post]);

      // to clear fields when button is pressed
      const clear = () => {
        setCurrentId(0);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (currentId === 0) {
            dispatch(createPost(postData));
            clear();
          } else {
            dispatch(updatePost(currentId, postData));
            clear();
          }
        };
    
    return (
            <PaperProvider className={classes.paper}>
              <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Tipple'}</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags (comma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase64 type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
              </form>
            </PaperProvider>
        
    );
}

export default Form;