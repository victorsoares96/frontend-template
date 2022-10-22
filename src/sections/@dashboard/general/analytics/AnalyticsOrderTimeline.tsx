import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

import { _analyticOrderTimeline } from '@/_mock';
import { fDateTime } from '@/utils/formatTime.util';

interface OrderItemProps {
  isLast: boolean;
  item: {
    time: Date;
    title: string;
    type: string;
  };
}

function OrderItem({ item, isLast }: OrderItemProps) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === 'order1' && 'primary') ||
            (type === 'order2' && 'success') ||
            (type === 'order3' && 'info') ||
            (type === 'order4' && 'warning') ||
            'error'
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function AnalyticsOrderTimeline() {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none',
        },
      }}
    >
      <CardHeader title="Order Timeline" />
      <CardContent>
        <Timeline>
          {_analyticOrderTimeline.map((item, index) => (
            <OrderItem
              key={item.id}
              item={item}
              isLast={index === _analyticOrderTimeline.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
