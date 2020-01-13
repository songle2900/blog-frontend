import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';

const PostViewerContainer = ({ match }) => {
    // Post Read API request when first mounted
    const { postId } = match.params;
    const dispatch = useDispatch();
    const { post, error, loading } = useSelector(({ post, loading }) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST']
    }));

    useEffect(() => {
        dispatch(readPost(postId));
        // Remove post data from redux when unmounted
        return () => {
            dispatch(unloadPost());
        };
    }, [dispatch, postId]);

    return <PostViewer post={post} loading={loading} error={error} />;
};

export default withRouter(PostViewerContainer);