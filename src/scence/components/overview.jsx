import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import React from "react";

const Overview = ({ heading ,amount,subAmount,subHeading}) => {
    // const parsedSubAmount = parseFloat(subAmount);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid xs={12} sm={6} lg={3} container maxWidth="xl">
      <Card style={{ backgroundColor: colors.primary[400] }} minWidth="lg">
         <CardContent maxWidth="sm">
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={-2}
          >
            <Stack spacing={2}>
              <Typography color="text.secondary" variant="overline">
                {heading}
              </Typography>
              {/* <Stack spacing={1}  mt="50px" > */}
              <Typography variant="h1"> ${amount}</Typography>
              {/* </Stack> */}
            </Stack>
            <Stack alignItems="flex-end">
              <Avatar
                sx={{
                  backgroundColor: "error.main",
                  height: 56,
                  width: 56,
                }}
              >
                <SvgIcon>
                  <CurrencyDollarIcon />
                </SvgIcon>
              </Avatar>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Card
        style={{
          backgroundColor: colors.primary[400],
          width: 200,
          height: 100,
        }}
        maxWidth="xl"
       
      >
        <CardContent>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={-2}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
              {subHeading}
              </Typography>
              {/* <Stack spacing={1}  mt="50px" > */}
              <Typography variant="h1"> ${subAmount}</Typography>
              {/* </Stack> */}
            </Stack>
            <Stack alignItems="flex-end">
              {/* <Avatar
                        sx={{
                          backgroundColor: "error.main",
                          height: 56,
                          width: 56,
                        }}
                      >
                        <SvgIcon>
                          <CurrencyDollarIcon />
                        </SvgIcon>
                      </Avatar> */}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Overview;
