import {
  CheckCircleOutlined,
  DeleteFilled,
  EyeOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import {
  Add,
  AddBox,
  CheckCircleOutline,
  CheckCircleOutlineOutlined,
  DescriptionOutlined,
  EditOutlined,
  Facebook,
  FacebookOutlined,
  Instagram,
  PlaceOutlined,
  YouTube,
} from "@mui/icons-material";
import {
  Card,
  Grid,
  Box,
  Stack,
  Typography,
  Link,
  Button,
  Tooltip,
  Chip,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useAllBrands } from "src/adapters/brandsAdapter";
import EditableText from "src/components/EditableText";
import AddPortfolioDialog from "src/components/profile/AddPortfolioDialog";
import BrandPortfolioDialog from "src/components/profile/BrandPortfolioDialog";
import { COLORS } from "src/configs/colors";
import { API_RESPONSE_MESSAGE } from "src/constants/api";
import { MESSAGES } from "src/constants/messages";
import { getAllBrands } from "src/services/brandRequests";
import { deleteCreatorBrandWork, getAllBrandWorksOfCreator } from "src/services/creatorRequests";

const BrandPortfolioCard = ({ }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    brands: [],
    portfolio: [],
    showAddPortfolio: false,
    showBrandPortfolio: false,
    brandId: '',
  });

  const getBrands = async () => {
    const res = await getAllBrands();
    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        brands: [...res.response_data]
      }));
    } else {
      enqueueSnackbar(MESSAGES.ERROR.FETCH_BRAND_WORK_FAILURE, { variant: "error" });
    }
  }
  const getCreatorsBrandWork = async () => {
    const res = await getAllBrandWorksOfCreator();
    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        portfolio: [...res.response_data]
      }));
    }
    else {
      enqueueSnackbar(MESSAGES.ERROR.FETCH_CREATOR_PORTFOLIO_FAILURE, { variant: 'error' });
    }
  }

  const setShowAddPortfolio = (value) => {
    setState((prevState) => ({
      ...prevState,
      showAddPortfolio: value,
    }));
  }

  const deleteBrandWork = async (id) => {
    const res = await deleteCreatorBrandWork(id);
    if (res.API_RESPONSE_MESSAGE === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.ERROR.FETCH_CREATOR_PORTFOLIO_FAILURE, { variant: 'success' });
    } else {
      enqueueSnackbar(MESSAGES.ERROR.FETCH_CREATOR_PORTFOLIO_FAILURE, { variant: 'error' });
    }
  }

  const setShowBrandPortfolio = (id, value) => {
    setState((prevState) => ({
      ...prevState,
      showAddPortfolio: false,
      showBrandPortfolio: value,
      brandId: id,
    }));
  }

  useEffect(() => {
    getBrands();
    getCreatorsBrandWork();
  }, []);

  useEffect(() => {
    getCreatorsBrandWork();
  }, [state.showAddPortfolio])

  const { brands, portfolio, showAddPortfolio, brandId, showBrandPortfolio } = state;

  const creatorBrandObj = {};
  portfolio.forEach((work) => {
    creatorBrandObj[work.brand.name] = work.brand;
  });

  console.log(creatorBrandObj)
  return (
    <Card className="card" elevation={5}>
      <BrandPortfolioDialog open={showBrandPortfolio} onClose={() => setShowBrandPortfolio(false)} portfolio={portfolio} brandId={brandId} brands={brands} getCreatorsBrandWork={getCreatorsBrandWork} />
      <AddPortfolioDialog open={showAddPortfolio} onClose={() => setShowAddPortfolio(false)} brands={brands} />
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h1" className="primary-title">
          Brand Portfolio :
        </Typography>
        <Button
          onClick={() => setShowAddPortfolio(true)}
          color="success"
          variant="contained"
          size="small"
          sx={{
            background: "-webkit-linear-gradient(30deg,#4647da,#3ad57c)",
            color: "white",
          }}
        >
          <Add fontSize="small" /> ADD PORTFOLIO
        </Button>
      </Box>
      <Grid
        container
        xs={12}
        flexDirection="row"
        gap={2}
      >
        {Object.keys(creatorBrandObj).map((item, index) => (
          creatorBrandObj[item].is_active ? <Grid
            item
            key={`document-${index}`}
            style={{ backgroundColor: "#00000090", padding: "10px 15px", borderRadius: "10px" }}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            xs={12}
            sm={4}
            md={5}
            lg={3}
          >
            <Box sx={{ display: "flex", alignItems: "center", }} >
              <Avatar
                alt={creatorBrandObj[item]?.name}
                sx={{ width: 48, height: 48 }}
                src={
                  creatorBrandObj[item]?.logo
                }
                style={{ objectFit: "contain" }}
              />
              <Stack direction="column" marginLeft={2}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { xs: "14px" },
                  }}
                >
                  {creatorBrandObj[item].name}
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { xs: "14px" },
                  }}
                >
                  {creatorBrandObj[item].website_link}
                </Typography>
              </Stack>
            </Box>
            <Stack direction="row">
              <IconButton
                sx={{ mx: 1 }}
                size="small"
                onClick={() => setShowBrandPortfolio(creatorBrandObj[item].id, true)}
              >
                <EyeOutlined fontSize="small" style={{ color: "#0175f8" }} />
              </IconButton>
            </Stack>
          </Grid>
            : null
        ))}
      </Grid>
    </Card>
  );
};

export default BrandPortfolioCard;
