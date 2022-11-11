import {
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Box,
    Typography,
    Button
} from "@mui/material";
import { useEffect } from 'react';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
import EditIcon from '@mui/icons-material/Edit';
import { getCreator, getCreatorSocialPlatform } from 'src/services/creatorRequests';
import { useState } from "react";
import SocialPricingHead from "./SocialPricingHead";

export default function PricingCard() {
    const [platform, setPlatform] = useState([]);

    const fetchCreator = async () => {

        let data = await getCreatorSocialPlatform();
        console.log("Api data", data);
        setPlatform((prev) =>
            [...prev, ...data]
        )
    }

    useEffect(() => {
        fetchCreator();
        setPlatform([]);
        console.log("use Effect called");
    }, []);

    return (
        <TableContainer component={Paper} sx={{ width: "90%", mx: "auto" }}>
            <Table sx={{ backgroundColor: "black" }} >
                <SocialPricingHead />
                <TableBody>
                    {
                        platform.map((items, index) => {
                            return (
                                <TableRow key={index} >
                                    <TableCell >
                                        <Box display="flex" flexDirection="column" textAlign="center">
                                              {items.creator_platform.platform.name}
                                            <Typography variant="body2" color="primary">
                                                @{items.creator_platform.social_handle}                                              
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2" color="#88b1d2" pt={1}>
                                            3.8%
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" gap={1.3} flexWrap="wrap" justifyContent="center">
                                            {
                                                <Button endIcon={items.price} variant="outlined" color="info" size="small">
                                                    {items.content_type.name} 
                                                </Button>

                                            }
                                        </Box>
                                    </TableCell>
                                    <TableCell aria-label="edit button" align="center">
                                        <Button >
                                        <EditIcon fontSize="small" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}