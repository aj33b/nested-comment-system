import {Grid, Typography} from "@mui/material";

const CommentsTitle = () => {
    return (
        <>
            <Grid container sx={{borderBottom: '1px solid lightGrey', paddingX: 4,paddingY:1}}>
                <Grid item xs={12}>
                    <Typography variant="body1" color={"grey"} align="left" gutterBottom>
                        <span className={"comment-title"}>Comments</span>
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default CommentsTitle;