import { Fragment, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';

import PropTypes from 'prop-types';

import { fDate } from '../../../utils/formatTime.util';

BlogPostCommentItem.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  message: PropTypes.string,
  tagUser: PropTypes.string,
  postedAt: PropTypes.string,
  hasReply: PropTypes.bool,
};

export default function BlogPostCommentItem({
  name,
  avatarUrl,
  message,
  tagUser,
  postedAt,
  hasReply,
}) {
  const [openReply, setOpenReply] = useState(false);

  const handleOpenReply = () => {
    setOpenReply(true);
  };

  return (
    <Fragment>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3,
          ...(hasReply && {
            ml: 'auto',
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }),
        }}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>

        <ListItemText
          primary={name}
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <Fragment>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.disabled',
                }}
              >
                {fDate(postedAt)}
              </Typography>
              <Typography component="span" variant="body2">
                <strong>{tagUser}</strong> {message}
              </Typography>
            </Fragment>
          }
        />

        {!hasReply && (
          <Button size="small" onClick={handleOpenReply} sx={{ position: 'absolute', right: 0 }}>
            Reply
          </Button>
        )}
      </ListItem>

      {!hasReply && openReply && (
        <Box
          sx={{
            mb: 3,
            ml: 'auto',
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Write comment"
            sx={{
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
        </Box>
      )}

      <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`,
        }}
      />
    </Fragment>
  );
}
