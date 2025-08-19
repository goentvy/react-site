
import styled from 'styled-components';
import CommentListItem from './CommentListItem';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    :not(:last-child) {
        margin-bottom: 16px;
    }
    
    > div {
        background-color: #000;
    }
`;

function CommentList (props) {
    const { comments } = props;

    return (
        <Wrapper>
            {comments.map((comment) => {
                return (
                    <CommentListItem
                        key={comment.id}
                        comment={comment}
                    />
                )
            })}

        </Wrapper>
    );
};

export default CommentList;
