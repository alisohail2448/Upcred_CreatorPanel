import { DataArrayOutlined } from "@mui/icons-material";
import axios from "axios";
import { getCookie } from "cookies-next";
import useStorage from "src/hooks/useStorage";
import { MAIN_URL } from "./apiConfig";

//CHECK CREATOR HANDLE
export const checkCreatorHandle = async (handle) => {
  const { token } = useStorage();
  if (!handle) {
    throw "no data";
  }
  try {
    let res = await axios.post(
      `${MAIN_URL}/creator/check_handle/`,
      { handle },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    throw error;
  }
};

//GET CREATORS DETAILS
export const getCreator = async () => {
  const { token } = useStorage();

  if (!token) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/creator/get_creator/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET All CREATORS
export const getAllCreator = async (params) => {
  const { token } = useStorage();
  if (!token) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/creator/get_all_creator/`, {
      params: params,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPDATE CREATOR DETAILS
export const updateCreator = async (id, data) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.put(`${MAIN_URL}/creator/${id}/update_creator/`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Add Creator
export const addCreator = async (data) => {
  const { token } = useStorage();
  if (!token) {
    return;
  }
  try {
    const res = await axios.post(`${MAIN_URL}/creator/create_creator/`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data.response_data;
  } catch (error) {
    throw error;
  }
};
//Add Creator
export const addSemCreator = async (data) => {
  const { token } = useStorage();
  if (!token) {
    return;
  }
  try {
    const res = await axios.post(`${MAIN_URL}/sem/create_creator/`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Delete Creator
export const deleteCreator = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.delete(`${MAIN_URL}/creator/${id}/delete_creator/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET CREATOR ALL ADDRESSES
export const getCreatorAllAddresses = async () => {
  const { token, user_id } = useStorage();
  if (!user_id || !token) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/creator/address/${user_id}/get_creator_addresses`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET CREATOR ADDRESS DETAIL
export const getCreatorAddress = async (creatorId, addressId) => {
  const { token } = useStorage();
  if (!creatorId || !addressId || !token) {
    return;
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/creator/address/${creatorId}/${addressId}/get_creator_address/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//ADD CREATOR ADDRESS
export const addCreatorAddress = async (data) => {
  const { token, user_id } = useStorage();
  if (!user_id || !data || !token) {
    return;
  }
  try {
    let res = await axios.post(
      `${MAIN_URL}/creator/address/${user_id}/add_creator_address/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPDATE CREATOR ADDRESS DETAIL
export const updateCreatorAddress = async (addressId, data) => {
  const { token, user_id } = useStorage();
  if (!user_id || !token || !addressId || !data) {
    return;
  }
  try {
    let res = await axios.put(
      `${MAIN_URL}/creator/address/${user_id}/${addressId}/update_creator_address/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//DELETE CREATOR ADDRESS DETAIL
export const deleteCreatorAddress = async (addressId) => {
  const { token, user_id } = useStorage();
  if (!user_id || !token || !addressId) {
    return;
  }

  try {
    let res = await axios.delete(
      `${MAIN_URL}/creator/address/${user_id}/${addressId}/delete_creator_address/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET COMMON ALL CATEGORIES
export const getCommonAllCategories = async (query) => {
  const { token } = useStorage();
  if (!token) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/common/category/get_all_categories/?searched_name_pattern=${query}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET COMMON ALL SKILLS
export const getCommonAllSkills = async (query) => {
  const { token } = useStorage();
  if (!token) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/common/skill/get_all_skills/?searched_name_pattern=${query}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//GET COMMON ALL LANGUAGES
export const getCommonAllLanguages = async (query) => {
  const { token } = useStorage();
  if (!token) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/common/language/get_all_languages/?searched_name_pattern=${query}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};




//GET CREATOR CATEGORIES
export const getCreatorCategory = async () => {
  const { token, user_id } = useStorage();
  if (!user_id || !token) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/creator/category/${user_id}/get_creator_categories/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//ADD CREATOR CATEGORIES
export const addCreatorCategory = async (data) => {
  const { token, user_id } = useStorage();
  if (!data || !token) {
    return;
  }
  try {
    let res = await axios.post(
      `${MAIN_URL}/creator/category/${user_id}/add_creator_category/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//DELETE CREATOR CATEGORIES
export const deleteCreatorCategory = async (categoryId) => {
  const { token, user_id } = useStorage();
  if (!user_id || !categoryId || !token) {
    return;
  }
  try {
    let res = await axios.delete(
      `${MAIN_URL}/creator/category/${user_id}/${categoryId}/delete_creator_category/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const addCreatorSkill = async (data) => {
  const { token, user_id } = useStorage();
  if (!token || !user_id || !data) {
    throw "no data";
  }
  try {
    let res = await axios.post(
      `${MAIN_URL}/creator/skill/${user_id}/add_creator_skill/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//GET CREATOR SKILLS
export const getCreatorSkills = async () => {
  const { token, user_id } = useStorage();
  if (!token || !user_id) {
    throw "no data";
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/creator/skill/get_creator_skills/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data.response_data?.skill;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//DELETE CREATOR SKILLS
export const deleteCreatorSkill = async (skillId) => {
  const { token, user_id } = useStorage();
  if (!token || !user_id || !skillId) {
    throw "no data";
  }
  try {
    let res = await axios.delete(
      `${MAIN_URL}/creator/skill/${user_id}/${skillId}/delete_creator_skill/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

//UPDATE CREATOR SKILLS
export const updateCreatorSkills = async (creatorId) => {
  const { token } = useStorage();
  if (!creatorId || !token) {
    return;
  }
  try {
    let res = await axios.post(`${MAIN_URL}/creator/category/${creatorId}/update_creator_skills/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET CREATOR ALL FUNDS ACCOUNT
export const getCreatorAllFundAccount = async (creatorId) => {
  const { token } = useStorage();
  if (!creatorId || !token) {
    return;
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/creator/fund_account/${creatorId}/get_all_creator_all_fund_account/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET CREATOR FUNDS ACCOUNT
export const getCreatorFundAccount = async (creatorId, fundId) => {
  const { token } = useStorage();
  if (!creatorId || !fundId || !token) {
    return;
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/creator/fund_account/${creatorId}/${fundId}/get_creator_fund_account/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//ADD CREATOR FUND ACCOUNT
export const addCreatorFundAccount = async (creatorId, data) => {
  const { token } = useStorage();
  if (!creatorId || !data || !token) {
    throw "No data";
  }
  try {
    let res = await axios.post(
      `${MAIN_URL}/creator/fund_account/${creatorId}/add_fund_account/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//DELETE CREATOR FUND ACCOUNT

export const deleteCreatorFundAccount = async (fundId) => {
  const { token } = useStorage();
  if (!fundId || !token) {
    throw "no data";
  }
  try {
    let res = await axios.delete(`${MAIN_URL}/creator/fund_account/${fundId}/delete/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Validate UPI
export const validateUPI = async (upi) => {
  const { token } = useStorage();
  if (!token || !upi) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/creator/fund_account/upi_validate?upi=${upi}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Search IFSC
export const getIFSCDetails = async (ifsc) => {
  const { token } = useStorage();
  if (!token || !ifsc) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/creator/fund_account/ifsc_search?ifsc=${ifsc}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET CREATOR ALL SOCIAL PLATFORM
export const getCreatorAllPlatform = async (creatorId) => {
  const { token } = useStorage();
  if (!token || !creatorId) {
    throw "no data";
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/creator/social_platform/${creatorId}/get_all_creator_social_platform/`,
      {
        params: {
          is_active: true,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET CREATOR SOCIAL PLATFORM
export const getCreatorPlatform = async (creatorId, platformId) => {
  const { token } = useStorage();
  if (!token || !creatorId || !platformId) {
    throw "no data";
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/creator/social_platform/${creatorId}/${platformId}/get_creator_social_platform/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// GET SOCIAL PLATFORM CONTENT TYPE
export const getSocialPlatformContentType = async (platform_id) =>{
  const { token } = useStorage();
  if ( !token ) {
    throw "no data";
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/common/social_platform_content_type/get_all_social_platforms_content_type/?page_number=0&platform_id=${platform_id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// GET SOCIAL PLATFORM CONTENT TYPE
export const getCreatorSocialPlatform = async () =>{
  const { token, user_id } = useStorage();
  if ( !token ) {
    throw "no data";
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/creator/social_platform_pricing/${user_id}/get_all_creator_social_platform_pricing/?page_number=0`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//ADD CREATOR SOCIAL PLATFORM
export const addCreatorPlatform = async (creatorId, data) => {
  const { token } = useStorage();
  if (!token || !creatorId || !data) {
    throw "no data";
  }
  try {
    let res = await axios.post(
      `${MAIN_URL}/creator/social_platform/${creatorId}/add_creator_social_platform/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPDATE CREATOR SOCIAL PLATFORM
export const updateCreatorPlatform = async (creatorId, platformId, data) => {
  const { token } = useStorage();
  if (!token || !creatorId || !platformId) {
    throw "no data";
  }
  try {
    let res = await axios.put(
      `${MAIN_URL}/creator/social_platform/${creatorId}/${platformId}/update_creator_social_platform/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPDATE CREATOR SOCIAL PLATFORM
export const deleteCreatorPlatform = async (creatorId, platformId) => {
  const { token } = useStorage();
  if (!token || !creatorId || !platformId) {
    throw "no data";
  }
  try {
    let res = await axios.delete(
      `${MAIN_URL}/creator/social_platform/${creatorId}/${platformId}/delete_creator_social_platform/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//ADD CREATOR LANGUAGE
export const addCreatorLanguage = async (data) => {
  const { token, user_id } = useStorage();
  if (!token || !user_id || !data) {
    throw "no data";
  }
  try {
    let res = await axios.post(
      `${MAIN_URL}/creator/language/${user_id}/add_creator_language/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET CREATOR LANGUAGES
export const getCreatorLanguages = async () => {
  const { token, user_id } = useStorage();
  if (!token || !user_id) {
    throw "no data";
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/creator/language/${user_id}/get_all_creator_languages/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data?.creator_languages;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//DELETE CREATOR LANGUAGES
export const deleteCreatorLanguage = async (languageId) => {
  const { token, user_id } = useStorage();
  if (!token || !user_id || !languageId) {
    throw "no data";
  }
  try {
    let res = await axios.delete(
      `${MAIN_URL}/creator/language/${user_id}/${languageId}/delete_creator_language/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET ALL CREATOR PRICING
export const getCreatorAllPricing = async (creatorId, params) => {
  const { token } = useStorage();
  if (!token || !creatorId) {
    throw "no data";
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/creator/social_platform_pricing/${creatorId}/get_all_creator_social_platform_pricing/`,
      {
        params: params,
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET CREATOR PRICING
export const getCreatorPricing = async (creatorId, pricingId) => {
  const { token } = useStorage();
  if (!token || !creatorId || !pricingId) {
    throw "no data";
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/creator/social_platform_pricing/${creatorId}/${pricingId}/get_creator_social_platform_pricing/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//ADD CREATOR PRICING
export const addCreatorPricing = async (creatorId, data) => {
  const { token } = useStorage();
  if (!token || !creatorId || !data) {
    throw "no data";
  }
  try {
    let res = await axios.post(
      `${MAIN_URL}/creator/social_platform_pricing/${creatorId}/add_creator_social_platform_pricing/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//ADD CREATOR LOCATION
export const addCreatorLocation = async (data) => {
  const { token, user_id } = useStorage();
  if (!token || !user_id || !data) {
    throw "no data";
  }
  try {
    let res = await axios.post(
      `${MAIN_URL}/creator/location/${user_id}/add_creator_location/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPDATE CREATOR PRICING
export const updateCreatorPricing = async (creatorId, pricingId, data) => {
  const { token } = useStorage();
  if (!token || !creatorId || !pricingId || !data) {
    throw "no data";
  }
  try {
    let res = await axios.put(
      `${MAIN_URL}/creator/social_platform_pricing/${creatorId}/${pricingId}/update_creator_social_platform_pricing/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET CREATOR LOCATION
export const getCreatorLocations = async () => {
  const { token, user_id } = useStorage();
  if (!token || !user_id) {
    throw "no data";
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/creator/location/${user_id}/get_all_creator_locations/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//DELETE CREATOR PRICING
export const deleteCreatorPricing = async (creatorId, pricingId) => {
  const { token } = useStorage();
  if (!token || !creatorId || !pricingId) {
    throw "no data";
  }
  try {
    let res = await axios.delete(
      `${MAIN_URL}/creator/social_platform_pricing/${creatorId}/${pricingId}/delete_creator_social_platform_pricing/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//DELETE CREATOR LOCATION
export const deleteCreatorLocation = async (locationId) => {
  const { token, user_id } = useStorage();
  if (!token || !user_id || !locationId) {
    throw "no data";
  }
  try {
    let res = await axios.delete(
      `${MAIN_URL}/creator/location/${user_id}/${locationId}/delete_creator_location/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



//GET ALL BRAND WORKS OF CREATOR
export const getAllBrandWorksOfCreator = async () => {
  const { token } = useStorage();
  const userId = getCookie("user_id");
  if (!token || !userId) {
    return "no token";
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/creator/brand_work/${userId}/get_all_creator_brand_works/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

//ADD CREATOR BRAND WORK
export const addCreatorBrandWork = async (data) => {
  const { token } = useStorage();
  const userId = getCookie("user_id");

  if (!token || !userId) {
    throw "no data";
  }
  try {
    let res = await axios.post(
      `${MAIN_URL}/creator/brand_work/${userId}/add_creator_brand_work/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//EDIT CREATOR BRAND WORK
export const editCreatorBrandWork = async (data, brandWorkId) => {
  const { token } = useStorage();
  const userId = getCookie("user_id");

  if (!token || !userId) {
    throw "no data";
  }
  try {
    let res = await axios.put(
      `${MAIN_URL}/creator/brand_work/${userId}/${brandWorkId}/update_creator_brand_work/`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//DELETE CREATOR BRAND WORK
export const deleteCreatorBrandWork = async (brandWorkId) => {
  const { token } = useStorage();
  const userId = getCookie("user_id");

  if (!token || !brandWorkId || !userId) {
    throw "no data";
  }
  try {
    let res = await axios.delete(
      `${MAIN_URL}/creator/brand_work/${userId}/${brandWorkId}/delete_creator_brand_work/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
