import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

export default function PhotoCard(props) {
  return (
    <Box sx={{ minWidth: 100 }}>
      <Card variant="outlined">
      <React.Fragment>
        <CardContent>
        <CardMedia
            component="img"
            alt="animals"
            height="200"
            image= {`/images/${props.theFile}`}
          />
          <Typography sx={{ p: 1 }} color="text.secondary" align="left">
           {`${props.theType} Photo`}
          </Typography>
          <Typography sx={{ p: 1 }} color="text.secondary" align="left" variant="subtitle2">
           {`Uploaded: ${props.creationDate}`}
          </Typography>
        </CardContent>
      </React.Fragment>
      </Card>
    </Box>
  );
}