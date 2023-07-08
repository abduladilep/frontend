

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
  import JSZip from 'jszip';
import FileSaver from 'file-saver';


  
  
  export function AccountProfile({data}){
    console.log("sagsgh");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

   
    const handleDownload = async () => {
      const convertToBase64 = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };
    
      const idProofBase64 = await convertToBase64(data.IdProof);
      const photoBase64 = await convertToBase64(data.Photo);

      const idProofFileName = `${data.Name}_IdProof.jpg`;
      const photoFileName = `${data.Name}_Photo.jpg`;
    
      const zip = new JSZip();
      zip.file(idProofFileName, idProofBase64.substr(idProofBase64.indexOf(',') + 1), { base64: true });
      zip.file(photoFileName, photoBase64.substr(photoBase64.indexOf(',') + 1), { base64: true });
    
      zip.generateAsync({ type: 'blob' }).then((blob) => {
        FileSaver.saveAs(blob, 'photos.zip');
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
          onClick={handleDownload}
          
        >
          Download picture
        </Button>
      </CardActions>
    </Card>
  )
        };
  
