import {addComment, deleteComment, editComment, ICommentState} from "../state/comment/commentSlice.ts";
import Action from "./Action.tsx";

import {
    Avatar,
    Button,
    Card,
    Grid,
    InputAdornment,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import CommentsTitle from "./CommentsTitle.tsx";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import {AppDispatch, RootState} from "../state/store.ts";


const Comment = ({comments, isRoot = true}: {
    comments: ICommentState['comments'],
    isRoot?: boolean
}) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);

    const users = useSelector((state: RootState) => state.auth.users);


    const commentUser = users[comments.user||-1];

    const dispatch = useDispatch<AppDispatch>();

    const [input, setInput] = useState('');
    const [editedInput, setEditedInput] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [expanded, setExpanded] = useState(false)

    const onAddComment = () => {
        setExpanded(true);
        dispatch(addComment({
            id: comments.id,
            text: input,
            user: user?.id
        }));
        setInput('');
        setShowReplyInput(false);
    }

    function onSaveComment(): void {
        dispatch(editComment({
            id: comments.id,
            text: editedInput,
        }));
        setEditedInput('');
        setEditMode(false);
    }

    function onDeleteComment(): void {
        dispatch(deleteComment({
            id: comments.id
        }));
    }

    return (
        <div style={{width: "100%"}}>
            {comments.id === 1 ? (
                <>
                    {isRoot && <CommentsTitle/>}
                    {isAuthenticated &&
                        <Grid container alignItems={"center"} sx={{paddingX: 4, paddingY: 2}}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    placeholder="Write your comment here..."
                                    variant={"outlined"}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Post Comment"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Action type={"Post"} handleClick={onAddComment} endIcon={<SendIcon/>}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    }
                    {
                        comments?.items?.length === 0 && (
                            <Grid container sx={{paddingX: 4, paddingY: 0}}>
                                <Typography variant="body1" color={"grey"}><span className={"post-description"}>No comments yet. Be the first to
                                    comment!</span></Typography>
                            </Grid>
                        )
                    }
                </>
            ) : (
                <Card variant={"outlined"} sx={{border: "none", paddingX: 4, paddingY: 1}}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt={comments.text}
                                    src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            <div
                                style={{
                                    backgroundColor: "#edf5f8",
                                    borderRadius: "5px 20px 20px 20px",
                                    borderColor: "#edf5f8",
                                    width: "100%",
                                    padding: "16px",
                                }}
                            >
                                <Typography variant={"subtitle1"}><span
                                    className={"comment-author-title"}>{commentUser.username}</span></Typography>
                                {editMode ? (
                                    <TextField
                                        size={"small"}
                                        fullWidth
                                        id="outlined-basic"
                                        variant="outlined"
                                        value={editedInput}
                                        onChange={(e) => setEditedInput(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                ) : (
                                    <Typography sx={{wordWrap: "break-word"}} variant={"body1"}><span
                                        className={"comment-description"}>{comments.text}</span></Typography>
                                )}
                            </div>
                        </ListItemText>
                    </ListItem>

                    {isAuthenticated &&
                        <Grid container sx={{paddingLeft: 9}}>
                            {
                                editMode ? (
                                    <>
                                        <Action type={"Save"} handleClick={onSaveComment}/>
                                        <Action type={"Cancel"} handleClick={() => {
                                            setEditedInput('');
                                            setEditMode(false);
                                        }} color={"error"}/>
                                    </>
                                ) : (
                                    <>
                                        <Action type={"Reply"} handleClick={() => {
                                            setShowReplyInput(true)
                                        }}/>
                                        {comments.user === user?.id && (
                                            <>
                                                <Action type={"Edit"} handleClick={() => {
                                                    setEditedInput(comments.text || '');
                                                    setEditMode(true);
                                                    setShowReplyInput(false);
                                                }}/>
                                                <Action type={"Delete"} handleClick={onDeleteComment}
                                                        color={"error"}/>
                                            </>
                                        )}
                                    </>
                                )
                            }
                        </Grid>
                    }
                </Card>
            )}
            <Grid style={isRoot ? {paddingLeft: 0} : {paddingLeft: 50}}>
                {showReplyInput &&
                    <Grid item xs={12} sx={{padding: 8, paddingY: 2}}
                    >
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            placeholder="Post your reply here..."
                            variant="outlined"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Reply"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Action type={"Reply"} handleClick={onAddComment}/>
                                        <Action type={"Cancel"} handleClick={() => {
                                            setShowReplyInput(false)
                                        }} color={"error"}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                }
                {
                    !isRoot && comments.items && comments.items.length >= 3 && !expanded ? (
                        <Button sx={{textTransform: "initial", display: "flex", marginLeft: 4}}
                                color={"inherit"}
                                onClick={() => setExpanded(true)} startIcon={<SubdirectoryArrowRightIcon/>}>
                            <span className={"more-replies"}>{comments.items.length} Replies</span>
                        </Button>
                    ) : (
                        comments.items && comments.items.map((comment) => {
                            return (
                                <Comment key={comment.id} comments={comment} isRoot={false}/>
                            )
                        })
                    )
                }
            </Grid>
        </div>
    )
}

export default Comment;