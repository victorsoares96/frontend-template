import React from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

import { _faqs } from '../../_mock';
import Iconify from '../../components/Iconify';

export default function FaqsList() {
  return (
    <React.Fragment>
      {_faqs.map((accordion) => (
        <Accordion key={accordion.id}>
          <AccordionSummary
            expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" width={20} height={20} />}
          >
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </React.Fragment>
  );
}
