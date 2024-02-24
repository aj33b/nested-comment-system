import '../App.css'
import {Box, Card, CardContent, Grid} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import Post from "../components/Post.tsx";
import Comment from "../components/Comment";

function Home() {
    const comments = useSelector((state: RootState) => state.comment.comments)

    return (
        <Box sx={{width: '60%', margin: 'auto'}}>
            <Card variant={"elevation"}>
                <CardContent sx={{padding: 0}}>
                    <Grid container>
                        <Post/>
                        <Comment comments={comments}/>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Home
