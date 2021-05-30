import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core' ;
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import tipples from './images/tipples.png';
import useStyles from './styles';


// need to share currentID with both posts and form, App is parent component of both.
const App = () => {
    const [currentId, setCurrentId] = useState(null); // null at first, pass ID into form below:
    const classes = useStyles();
    const dispatch = useDispatch();

    // when input is cleared (currentId changed, the app will dispatch the getPost action and make sure every change is going to get a new post)
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
            <Container maxwidth="lg">
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography className={classes.heading} variant="h2" align="center">Tipple Tracker</Typography>
                    <img className={classes.image} src={tipples} alt="tipples" height="60" />
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={7}>
                                <Posts setCurrentId={setCurrentId} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Form currentId={currentId} setCurrentId={setCurrentId} />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
    );
}

export default App;