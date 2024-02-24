import {Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";

const Post = () => {
    return (
        <>
            <Grid item xs={12} sx={{borderBottom: '1px solid lightGrey', padding:4, paddingY:1}}>
                <ListItem disableGutters>
                    <ListItemAvatar>
                        <Avatar alt="User Photo" src="https://mui.com/static/images/avatar/1.jpg"
                        />
                    </ListItemAvatar>
                    <ListItemText primary={<span className={"post-author-title"}>Adam Smith</span>}
                                  secondary={<span className={"post-author-subtitle"}>2d</span>}/>
                </ListItem>
            </Grid>
            <Grid item xs={12} sx={{borderBottom: '1px solid lightGrey' , padding:4, paddingY:1}}>
                <Typography variant="h6" align="left" gutterBottom>
                    <span className={"post-title"}>Celebrating New Year</span>
                </Typography>
                <Typography variant="body1" align="left">
                    <span className={"post-description"}>One more year loaded with sweet recollections and cheerful times has passed. All my
                    friends made
                    my year exceptionally uncommon, and I wish this continues forever. With you around, each
                    minute
                    is a unique event for me. I wish you to Happy new year to all of you.
                    </span>
                </Typography>
            </Grid>
        </>
    )
}

export default Post;