import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Helmet } from 'react-helmet-async';

const PostViewerBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 {
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;

const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
    // Error
    if (error) {
        if (error.response && error.response.status === 400) {
            return <PostViewerBlock>Post does not exist.</PostViewerBlock>;
        }
        return <PostViewerBlock>Error!</PostViewerBlock>;
    }

    // Loading or post does not exist yet
    if (loading || !post) {
        return null;
    }

    const { title, body, user, publishedDate, tags } = post;
    return (
        <PostViewerBlock>
            <Helmet>
                <title>{title} - REACTERS</title>
            </Helmet>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo
                    username={user.username}
                    publishedDate={publishedDate}
                    hasMarginTop
                />
                <Tags tags={tags} />
            </PostHead>
            {actionButtons}
            <PostContent dangerouslySetInnerHTML={{ __html: body }} />
        </PostViewerBlock>
    );
};

export default PostViewer;