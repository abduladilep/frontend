

import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Stack,
    Typography,
    useTheme
  } from '@mui/material';
  import { tokens } from "../theme";

  
  // const user = {
  //   avatar: '/assets/avatars/avatar-anika-visser.png',
  //   city: 'Los Angeles',
  //   country: 'USA',
  //   jobTitle: 'Senior Developer',
  //   name: 'Anika Visser',
  //   timezone: 'GTM-7'
  // };
  
  export function AccountProfile({data}){
    console.log("sagsgh");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    
  const handleDownloadPhoto = () => {
    const photoUrls = [data.IdProof, data.Photo];

    photoUrls.forEach((photoUrl) => {
      const link = document.createElement('a');
      link.href = photoUrl;
      link.download = 'photo.jpg';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    });
  };
    
   
    
    
   
  return (
    <Card 
    style={{ backgroundColor: colors.primary[400]}}
      >  
      <CardContent>
        <Box
          sx={{
    
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        
          <Avatar
            src={data.IdProof}
            sx={{
              height: 120,
              mb: 2,
              width: 100,
              borderRadius: '8%',
              
              // border: '2px solid #000000' // Add the desired border styles here
            }}
          />
           <Avatar
        src={data.Photo} // Add the source of the second photo here
        sx={{ height: 150, mb: 2, width: 200,   borderRadius: '8%' }}
      
      />
      </Stack>
          <Typography
            gutterBottom
            variant="h3"
          >
            {data.Name}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body"
            sx={{ textAlign: 'center', width: "70%" ,  }}
          >
            {data.Address} 
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ mt: 1 }}
          >
           Ph: {data.MobileNo}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
          color="secondary"
          onClick={handleDownloadPhoto}
         
        >
          Download picture
        </Button>
      </CardActions>
    </Card>
  )
        };
  
