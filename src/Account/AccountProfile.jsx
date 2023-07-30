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
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import FileSaver from "file-saver";
import { useState } from "react";

export function AccountProfile({ data }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  const handleDownload = async () => {
    setIsDownloading(true);
  
    const convertToBlob = async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch the image');
      }
      const blob = await response.blob();
      return blob;
    };
  
    try {
      // Ensure data.IdProof and data.Photo are arrays and contain at least one URL each
      if (!Array.isArray(data.IdProof) || data.IdProof.length === 0 ||
          !Array.isArray(data.Photo) || data.Photo.length === 0) {
        throw new Error('IdProof or Photo URL is missing or invalid');
      }
  
      // Access the URLs from the arrays
      const idProofUrl = data.IdProof[0];
      const photoUrl = data.Photo[0];
  
      const secureIdProofURL = idProofUrl.replace('http://', 'https://');
      const securePhotoURL = photoUrl.replace('http://', 'https://');
  
      const idProofBlob = await convertToBlob(secureIdProofURL);
      const photoBlob = await convertToBlob(securePhotoURL);
  
      FileSaver.saveAs(idProofBlob, `${data.Name}_IdProof.jpg`);
      FileSaver.saveAs(photoBlob, `${data.Name}_Photo.jpg`);
  
      setIsDownloading(false);
    } catch (error) {
      console.error('Error during image download:', error);
      setIsDownloading(false);
  }
  };

  
  return (
    <Card style={{ backgroundColor: colors.primary[400] }}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            <Avatar
              src={data.IdProof}
              sx={{
                height: 120,
                mb: 2,
                width: 100,
                borderRadius: "8%",
              }}
            />
            <Avatar
              src={data.Photo} 
              sx={{ height: 150, mb: 2, width: 200, borderRadius: "8%" }}
            />
          </Stack>
          <Typography gutterBottom variant="h3">
            {data.Name}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body"
            sx={{ textAlign: "center", width: "70%" }}
          >
            {data.Address}
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
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
          {isDownloading ? "Downloading..." : "Download picture"}
        </Button>
      </CardActions>
    </Card>
  );
}
