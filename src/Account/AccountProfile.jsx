

import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    useTheme
  } from '@mui/material';
  import { tokens } from "../theme";

  
  const user = {
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Anika Visser',
    timezone: 'GTM-7'
  };
  
  export function AccountProfile({data}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    console.log("sgcgzshvcghsdhgsdgh");
    
   
  return (
    <Card  style={{ backgroundColor: colors.primary[500] }} >  
      <CardContent>
        <Box
          sx={{
    
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={data.IdProof}
            sx={{
              height: 100,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h3"
          >
            {data.Name}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {data.Address} 
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {data.MobileNo}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  )
        };
  
