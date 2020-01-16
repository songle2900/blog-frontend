import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writePost, updatePost } from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { title, body, tags, post, postError, originalPostId } = useSelector(({ write }) => ({
        title: write.title,
        body: write.body,
        tags: write.tags,
        post: write.post,
        postError: write.postError,
        originalPostId: write.originalPostId
    }));

    // Add post
    const onPublish = () => {
        // If originalPostId is exist
        if (originalPostId) {
            // use updatePost action creator
            dispatch(updatePost({ title, body, tags, id: originalPostId }));
            return;
        }
        // otherwise
        dispatch(
            writePost({
                title,
                body,
                tags
            })
        );
    };

    // Cancel post
    const onCancel = () => {
        history.goBack();
    };

    // What to do upon success or failure
    useEffect(() => {
        if (post) {
            const { _id, user } = post;
            history.push(`/@${user.username}/${_id}`);
        }
        if (postError) {
            console.log(postError);
        }
    }, [history, post, postError]);
    return (
        <WriteActionButtons 
            onPublish={onPublish} 
            onCancel={onCancel}
            isEdit={!!originalPostId}
        />
    );
};

export default withRouter(WriteActionButtonsContainer);