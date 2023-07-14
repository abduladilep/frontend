

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

import FileSaver from 'file-saver';
import { useState } from 'react';



  
  
  export function AccountProfile({data}){
    const [isDownloading, setIsDownloading] = useState(false);
   
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

   
  const handleDownload = async () => {
    setIsDownloading(true);
    const convertToBlob = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return blob;
    };

    const idProofBlob = await convertToBlob(data.IdProof);
    const photoBlob = await convertToBlob(data.Photo);

    FileSaver.saveAs(idProofBlob, `${data.Name}_IdProof.jpg`);
    FileSaver.saveAs(photoBlob, `${data.Name}_Photo.jpg`);
    setIsDownloading(false);
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
          }}
         
          >
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
          onClick={handleDownload}
          
        >
           {isDownloading ? 'Downloading...' : 'Download picture'}
        </Button>
      </CardActions>
    </Card>
  )
   };
  
