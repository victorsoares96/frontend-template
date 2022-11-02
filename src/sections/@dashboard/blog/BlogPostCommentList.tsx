import { Box, List } from '@mui/material';

import BlogPostCommentItem from './BlogPostCommentItem';

interface BlogPostCommentListProps {
  post: {
    comments: {
      id: string;
      name: string;
      avatarUrl: string;
      postedAt: string;
      message: string;
      replyComment: {
        id: string;
        userId: string;
        message: string;
        tagUser: string;
        postedAt: string;
      }[];
      users: any[];
    }[];
  };
}

export default function BlogPostCommentList({ post }: BlogPostCommentListProps) {
  const { comments } = post;

  return (
    <List disablePadding>
      {comments.map((comment) => {
        const { id, replyComment, users } = comment;
        const hasReply = replyComment.length > 0;

        return (
          <Box key={id} sx={{}}>
            <BlogPostCommentItem
              name={comment.name}
              avatarUrl={comment.avatarUrl}
              postedAt={comment.postedAt}
              message={comment.message}
            />

            {hasReply &&
              replyComment.map((reply) => {
                const user = users.find((user) => user.id === reply.userId);
                return (
                  <BlogPostCommentItem
                    key={reply.id}
                    message={reply.message}
                    tagUser={reply.tagUser}
                    postedAt={reply.postedAt}
                    name={user.name}
                    avatarUrl={user.avatarUrl}
                    hasReply
                  />
                );
              })}
          </Box>
        );
      })}
    </List>
  );
}
