/* eslint-disable react/jsx-key */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material';
import { COLORS } from 'src/configs/colors';

export const SettingsNotifications = (props) => (
  <form {...props}>
    <Card
    sx={{
      width: "100%",
      paddingX: 3,
      paddingY: 3,
      background: COLORS.cardBackground,
      position: "relative",
    }}
    elevation={5}
    >
      <CardHeader
       sx={{
        '& .MuiCardHeader-title':{
          color:'white'
        },
        '& .MuiCardHeader-content':{
          display:'flex',
          flexDirection:'column',
          gap:'6px'
        },
      }}
        subheader="Manage the notifications"
        title="Notifications"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={6}
          wrap="wrap"
        >
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            <Typography
              color="white"
              gutterBottom
              variant="h6"
            >
              Notifications
            </Typography>
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              sx={{
                "& .MuiFormControlLabel-label":{
                  color:'white'
                }
              }}
              label="Email"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              sx={{
                "& .MuiFormControlLabel-label":{
                  color:'white'
                }
              }}
              label="Push Notifications"
            />
            <FormControlLabel
              control={<Checkbox />}
              sx={{
                "& .MuiFormControlLabel-label":{
                  color:'white'
                }
              }}
              label="Text Messages"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              sx={{
                "& .MuiFormControlLabel-label":{
                  color:'white'
                }
              }}
              label="Phone calls"
            />
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            <Typography
              gutterBottom
              variant="h6"
              color="white"
            >
              Messages
            </Typography>
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              sx={{
                "& .MuiFormControlLabel-label":{
                  color:'white'
                }
              }}
              label="Email"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Push Notifications"
              sx={{
                "& .MuiFormControlLabel-label":{
                  color:'white'
                }
              }}
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              sx={{
                "& .MuiFormControlLabel-label":{
                  color:'white'
                }
              }}
              label="Phone calls"
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </Card>
  </form>
);
