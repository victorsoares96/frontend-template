import { useNavigate } from 'react-router-dom';

import { List, SxProps, Theme } from '@mui/material';

import { SkeletonConversationItem } from '@/components/skeleton';
import { PATH_DASHBOARD } from '@/routes/paths';

import ChatConversationItem from './ChatConversationItem';

interface ChatConversationListProps {
  conversations: any;
  isOpenSidebar: boolean;
  activeConversationId: string;
  sx?: SxProps<Theme>;
}

export default function ChatConversationList({
  conversations,
  isOpenSidebar,
  activeConversationId,
  sx,
  ...other
}: ChatConversationListProps) {
  const navigate = useNavigate();

  const handleSelectConversation = (conversationId: string) => {
    let conversationKey = '';
    const conversation = conversations.byId[conversationId];
    if (conversation.type === 'GROUP') {
      conversationKey = conversation.id;
    } else {
      const otherParticipant = conversation.participants.find(
        (participant) => participant.id !== '8864c717-587d-472a-929a-8e5f298024da-0',
      );
      if (otherParticipant?.username) {
        conversationKey = otherParticipant?.username;
      }
    }
    navigate(PATH_DASHBOARD.chat.view(conversationKey));
  };

  const loading = !conversations.allIds.length;

  return (
    <List disablePadding sx={sx} {...other}>
      {(loading ? [...Array(12)] : conversations.allIds).map((conversationId, index) =>
        conversationId ? (
          <ChatConversationItem
            key={conversationId}
            isOpenSidebar={isOpenSidebar}
            conversation={conversations.byId[conversationId]}
            isSelected={activeConversationId === conversationId}
            onSelectConversation={() => handleSelectConversation(conversationId)}
          />
        ) : (
          <SkeletonConversationItem key={index} />
        ),
      )}
    </List>
  );
}

ChatConversationList.defaultProps = {
  sx: {},
};
