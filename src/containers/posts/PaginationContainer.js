import React from 'react';
import Pagination from '../../components/posts/Pagination';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PaginationContainer = ({ location }) => {
    const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
        lastPage: posts.lastPage,
        posts: posts.posts,
        loading: loading['posts/List_POSTS']
    }));

    // Display nothing if there is no post data or loading.
    if (!posts || loading) return null;

    // Set 1 as default if page is not exist
    const { tag, username, page = 1 } = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    return (
        <Pagination
            tag={tag}
            username={username}
            page={parseInt(page, 10)}
            lastPage={lastPage}
        />
    );
};

export default withRouter(PaginationContainer);