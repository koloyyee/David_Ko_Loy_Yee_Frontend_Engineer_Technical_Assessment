import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';

const NotFound = ({message}:{message:string}) => {
  const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    height: 60,
    minWidth: 250,
    lineHeight: '60px',
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} >
        <Box
          sx={{
            p: 5,
            bgcolor: 'background.default',
            display: 'grid',
            gridTemplateColumns: {md: '1fr 1fr'},
            gap: 2,
          }}
        >

          <Item elevation={4}>
            {message}
          </Item>

        </Box>
      </Grid>

    </Grid>
  );
};


export default NotFound;
