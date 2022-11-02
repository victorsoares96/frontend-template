import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, IconButton, Link, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Avatar from '@/components/Avatar';
import Iconify from '@/components/Iconify';
import useResponsive from '@/hooks/useResponsive';
import { PATH_DASHBOARD } from '@/routes/paths';
import createAvatar from '@/utils/createAvatar';
import { fDateTimeSuffix } from '@/utils/formatTime.util';

const RootStyle = styled('div')(({ theme }) => ({
  height: 84,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  justifyContent: 'space-between',
}));

interface MailDetailsToolbarProps {
  mail: {
    from: {
      name: string;
      email: string;
      avatar: string;
    };
    to: {
      name: string;
      email: string;
      avatar: string;
    }[];
    createdAt: Date;
  };
}

export default function MailDetailsToolbar({ mail, ...other }: MailDetailsToolbarProps) {
  const navigate = useNavigate();
  const { systemLabel, customLabel } = useParams();

  const isDesktop = useResponsive('up', 'sm');

  const baseUrl = PATH_DASHBOARD.mail.root;

  const handleBack = () => {
    if (systemLabel) {
      return navigate(`${baseUrl}/${systemLabel}`);
    }
    if (customLabel) {
      return navigate(`${baseUrl}/label/${customLabel}`);
    }
    return navigate(`${baseUrl}/inbox`);
  };

  return (
    <RootStyle {...other}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Back">
          <IconButton onClick={handleBack}>
            <Iconify icon="eva:arrow-ios-back-fill" width={20} height={20} />
          </IconButton>
        </Tooltip>
        <Avatar
          alt={mail.from.name}
          src={mail.from.avatar || ''}
          color={createAvatar(mail.from.name).color}
        >
          {createAvatar(mail.from.name).name}
        </Avatar>

        <Box sx={{ ml: 2 }}>
          <Typography display="inline" variant="subtitle2">
            {mail.from.name}
          </Typography>
          <Link variant="caption" sx={{ color: 'text.secondary' }}>
            &nbsp; {`<${mail.from.email}>`}
          </Link>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
            To:&nbsp;
            {mail.to.map((person) => (
              <Link color="inherit" key={person.email}>
                {person.email}
              </Link>
            ))}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {isDesktop && (
          <React.Fragment>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {fDateTimeSuffix(mail.createdAt)}
            </Typography>
            <Tooltip title="Reply">
              <IconButton>
                <Iconify icon="ic:round-reply" width={20} height={20} />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        )}

        <Tooltip title="More options">
          <IconButton>
            <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
          </IconButton>
        </Tooltip>
      </Box>
    </RootStyle>
  );
}
