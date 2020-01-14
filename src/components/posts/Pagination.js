import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
    width: 320px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
`;
const PageNumber = styled.div``;

const buildLink = ({ username, tag, page }) => {
    const query = qs.stringify({ tag, page });
    return username ? `/@${username}?${query}` : `/?${query}`;
};

const Pagination = ({ page, lastPage, username, tag }) => {
    return (
        <PaginationBlock>
            <Button
                // If it is the first page, disable the previous button
                disabled={page === 1}
                to={
                    page === 1 ? undefined : buildLink({ username, tag, page: page - 1})
                }
            >
                Previous
            </Button>
            <PageNumber>{page}</PageNumber>
            <Button
                // If it is the last page, disable the next button
                disabled={page === lastPage}
                to={
                    page === lastPage ? undefined : buildLink({ username, tag, page: page + 1})
                }
            >
                Next
            </Button>
        </PaginationBlock>
    );
};

export default Pagination;