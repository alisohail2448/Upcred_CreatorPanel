import { Typography, Card, Box } from "@mui/material";
import React from "react";
import PricingCard from './PlatformPricing';

const PlatformContentCard = ({}) => {
  return (
    <>
        <Card className="card">
              <Typography variant="h1" className="primary-title" pb={3}>
                Social Media Pricing :
              </Typography>
              <PricingCard/>
        </Card>
    </>
  );
};

export default PlatformContentCard;
