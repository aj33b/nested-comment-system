import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ICommentState {
    comments: {
        id: number,
        user?: string,
        text?: string,
        items?: ICommentState['comments'][]
    }
}

const initialState: ICommentState = {
    comments: {
        id: 1,
        items: [
            {
                id: 1708805692292,
                text: 'Wish you a very happy new year Brother.',
                user: '1708805665104',
                items: [
                    {
                        id: 1708805864087,
                        text: 'Where is celebration party jorge?',
                        user: '1708805856396',
                        items: []
                    },
                    {
                        id: 1708805947504,
                        text: 'Don’t forgot to invite me',
                        user: '1708805934619',
                        items: [
                            {
                                id: 1708805970784,
                                text: 'Party is not possible without me.',
                                user: '1708805962786',
                                items: []
                            }
                        ]
                    }
                ]
            },
            {
                id: 1708805724927,
                text: 'Wish you a very happy new year. Enjoy !!',
                user: '1708805715007',
                items: [
                    {
                        id: 1708805891047,
                        text: 'We both have same names. Wow!',
                        user: '1708805665104',
                        items: []
                    },
                    {
                        id: 1708805914152,
                        text: 'God bless you guys.',
                        user: '1708805856396',
                        items: []
                    },
                    {
                        id: 1708805992556,
                        text: 'Thats great guys. I have common surname.',
                        user: '1708805962786',
                        items: []
                    }
                ]
            },
            {
                id: 1708805838708,
                text: 'Happy new year.',
                user: '1708805746933',
                items: []
            }
        ]
    }
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<ICommentState['comments']>) => {
            const {id, user, text} = action.payload;

            const traverseAndInsert = (comments: ICommentState['comments']) => {
                if (comments.id === id) {
                    if (!comments.items) {
                        comments.items = [];
                    }
                    comments.items.push({
                        id: new Date().getTime(),
                        text: text,
                        user: user,
                        items: [],
                    });
                } else if (comments.items) {
                    comments.items.forEach(traverseAndInsert);
                }
            };
            traverseAndInsert(state.comments);
        },

        editComment: (state, action: PayloadAction<ICommentState['comments']>) => {
            const {id, text} = action.payload;

            const traverseAndUpdate = (comments: ICommentState['comments']) => {
                if (comments.id === id) {
                    comments.text = text;
                } else if (comments.items) {
                    comments.items.forEach(traverseAndUpdate);
                }
            };
            traverseAndUpdate(state.comments);
        },
        deleteComment: (state, action: PayloadAction<ICommentState['comments']>) => {
            const {id} = action.payload;

            const traverseAndDelete = (comments: ICommentState['comments']) => {
                if (comments.items) {
                    comments.items = comments.items.filter((comment) => comment.id !== id);
                    comments.items.forEach(traverseAndDelete);
                }
            };
            traverseAndDelete(state.comments);
        }
    }
})

export const {
    addComment, editComment, deleteComment
} = commentSlice.actions;

export default commentSlice.reducer;