/* eslint-disable react-hooks/rules-of-hooks */
import useStorage from "src/hooks/useStorage";
import axios from "axios";
import { MAIN_URL } from "src/services/apiConfig";
import dataURLtoFile from "src/utils/dataURLtoFile";
import { getCookie } from "cookies-next";

//Upload files to AWS
export const uploadToAws = async (file, s3FolderPath) => {
  const { token } = useStorage();
  try {
    let formData = new FormData();
    formData.append("file", dataURLtoFile(file.uri, file.name));
    formData.append("s3_folder_path", s3FolderPath);

    const res = await axios.post(`${MAIN_URL}/aws/upload_to_aws/`, formData, {
      headers: {
        "Content-Type": " multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Delete Category
export const deleteCategory = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.delete(`${MAIN_URL}/common/category/${id}/delete_category/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//Delete Language
export const deleteLanguage = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.delete(`${MAIN_URL}/common/language/${id}/delete_language/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//Delete Country
export const deleteCountry = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.delete(`${MAIN_URL}/common/country/${id}/delete_country/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//Delete State
export const deleteState = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.delete(`${MAIN_URL}/common/state/${id}/delete_state/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//Delete CITY
export const deleteCity = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.delete(`${MAIN_URL}/common/city/${id}/delete_city/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//Delete PLATFORM
export const deletePlatform = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.delete(
      `${MAIN_URL}/common/social_platform/${id}/delete_social_platform/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//Delete PLATFORM-CONTENT-TYPE
export const deleteContentType = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.delete(
      `${MAIN_URL}/common/social_platform_content_type/${id}/delete_social_platform_content_type/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//Delete SKILL
export const deleteSkill = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.delete(`${MAIN_URL}/common/skill/${id}/delete_skill/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//Delete Audience
export const deleteAudience = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.delete(
      `${MAIN_URL}/common/audience_group/${id}/delete_audience_group/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET CATEGORY DETAILS
export const getCategory = async (id) => {
  const { token } = useStorage();
  if (!token || !id) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/common/category/${id}/get_category/`, {
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

//ADD NEW CATEGORY
export const createCategory = async (data) => {
  const { token } = useStorage();
  if (!token || !data) {
    return;
  }
  try {
    let res = await axios.post(`${MAIN_URL}/common/category/create_category/`, data, {
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
//ADD NEW LANGUAGE
export const createLanguage = async (data) => {
  const { token } = useStorage();
  if (!token || !data) {
    return;
  }
  try {
    let res = await axios.post(`${MAIN_URL}/common/language/create_language/`, data, {
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
//ADD NEW COUNTRY
export const createCountry = async (data) => {
  const { token } = useStorage();
  if (!token || !data) {
    return;
  }
  try {
    let res = await axios.post(`${MAIN_URL}/common/country/add_country/`, data, {
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
//ADD NEW STATE
export const createState = async (data) => {
  const { token } = useStorage();
  if (!token || !data) {
    return;
  }
  try {
    let res = await axios.post(`${MAIN_URL}/common/state/add_state/`, data, {
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
//ADD NEW CITY
export const createCity = async (data) => {
  const { token } = useStorage();
  if (!token || !data) {
    return;
  }
  try {
    let res = await axios.post(`${MAIN_URL}/common/city/add_city/`, data, {
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
//ADD NEW PLATFORM
export const createPlatform = async (data) => {
  const { token } = useStorage();
  if (!token || !data) {
    return;
  }
  try {
    let res = await axios.post(`${MAIN_URL}/common/social_platform/add_social_platform/`, data, {
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
//ADD NEW PLATFORM-CONTENT-TYPE
export const createContentType = async (data) => {
  const { token } = useStorage();
  if (!token || !data) {
    return;
  }
  try {
    let res = await axios.post(
      `${MAIN_URL}/common/social_platform_content_type/add_social_platform_content_type/`,
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
//ADD NEW SKILL
export const createSkill = async (data) => {
  const { token } = useStorage();
  if (!token || !data) {
    return;
  }
  try {
    let res = await axios.post(`${MAIN_URL}/common/skill/create_skill/`, data, {
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
//ADD NEW AUDIENCE
export const createAudience = async (data) => {
  const { token } = useStorage();
  if (!token || !data) {
    return;
  }
  try {
    let res = await axios.post(`${MAIN_URL}/common/audience_group/create_audience_group/`, data, {
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

//GET ALL CATEGORY
export const getAllCategory = async (params) => {
  try {
    let res = await axios.get(`${MAIN_URL}/common/category/get_all_categories/`, {
      params: params,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET ALL SOCIAL PLATFORMS
export const getAllPlatforms = async () => {
  try {
    let res = await axios.get(`${MAIN_URL}/common/social_platform/get_all_social_platforms/`, {
      params: {
        is_active: true,
      },
    });

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET  SOCIAL PLATFORMS
export const getPlatform = async (platformId) => {
  const { token } = useStorage();
  if (!token) {
    return;
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/common/social_platform/${platformId}/get_social_platforms/`,
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

//GET ALL LANGUAGES
export const getAllLanguages = async (params) => {
  try {
    let res = await axios.get(`${MAIN_URL}/common/language/get_all_languages/`, {
      params: params,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//GET ALL COUNTRIES
export const getAllCountries = async (params) => {
  try {
    let res = await axios.get(`${MAIN_URL}/common/country/get_all_countries/`, {
      params: params,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//GET ALL STATES
export const getAllStates = async (params) => {
  try {
    let res = await axios.get(`${MAIN_URL}/common/state/get_all_states/`, {
      params: params,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET STATES
export const getStatesByCountryId = async ({ countryId, params }) => {
  try {
    let res = await axios.get(`${MAIN_URL}/common/state/${countryId}/get_state/`, {
      params,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//GET ALL CITY
export const getAllLocations = async (params) => {
  try {
    let res = await axios.get(`${MAIN_URL}/common/city/get_all_cities/`, {
      params: params,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//GET ALL CONTENT TYPE
export const getAllContentTypes = async (params) => {
  try {
    let res = await axios.get(
      `${MAIN_URL}/common/social_platform_content_type/get_all_social_platforms_content_type/`,
      {
        params: params,
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//GET ALL SKILL
export const getAllSkills = async (params) => {
  const { token } = useStorage();
  if (!token) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/common/skill/get_all_skills/`, {
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
//GET ALL AUDIENCE
export const getAllAudiences = async () => {
  const { token } = useStorage();
  if (!token) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/common/audience_group/get_all_audience_groups/`, {
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

//GET ALL CREATOR DOCUMENT
export const getAllCreatorDocument = async () => {
  const { token } = useStorage();
  if (!token) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/creator/document/get_all_creator_documents/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

/**
 * UPLOAD CREATOR DOCUMENT
 * Note: File uploading should be handled on backend side to prevent misuse.
 */
export const uploadCreatorDocument = async (documentFile, documentType) => {
  const { token } = useStorage();
  const userId = getCookie("user_id");
  if (!token || !userId) {
    return;
  }
  try {
    const s3FolderPath = `creator/${userId}/document/`;
    let uploadRes = await uploadToAws(documentFile, s3FolderPath);
    console.log("uploadRes", uploadRes);

    const data = {
      document_link: uploadRes.file_url,
      creator_id: userId,
      document_type: documentType,
    };

    console.log("data", data);
    let res = await axios.post(`${MAIN_URL}/creator/document/add_creator_document/`, data, {
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

//DELETE CREATOR DOCUMENT
export const deleteCreatorDocument = async (documentId) => {
  const userId = getCookie("user_id");
  const { token } = useStorage();
  if (!token || !userId) {
    return;
  }
  try {
    const res = await axios.delete(
      `${MAIN_URL}/creator/document/${userId}/${documentId}/delete_creator_document/`,
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
