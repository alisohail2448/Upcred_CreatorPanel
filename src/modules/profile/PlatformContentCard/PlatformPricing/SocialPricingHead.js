import { TableHead, TableCell, TableRow, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function SocialPricingHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell width={"20%"} align="center">
                    <Typography variant="subtitle2">
                        Social Platform
                    </Typography>
                </TableCell>
                <TableCell align="center" width={"23%"}>
                    <Typography variant="subtitle2">
                        Average of all content type
                    </Typography>
                </TableCell>
                <TableCell align="center" width="auto">
                    <Typography variant="subtitle2">
                        Pricing per content type
                    </Typography>
                </TableCell>
                <TableCell width="8%" align="center">
                    <Button variant="subtitle2" sx={{cursor: "pointer"}} >
                        <AddCircleOutlineIcon fontSize="small" />
                    </Button>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}