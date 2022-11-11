import useStorage from "src/hooks/useStorage";
import axios from "axios";
import { MAIN_URL } from "src/services/apiConfig";
import dataURLtoFile from "src/utils/dataURLtoFile";

//GET ALL CONTENT TYPE
export const getAllContentType = async (params) => {
  const { token } = useStorage();
  if (!token) {
    return;
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/common/social_platform_content_type/get_all_social_platforms_content_type/`,
      {
        params: params,
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(res);
    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET CONTENT TYPE
export const getContentType = async (content_type_id) => {
  const { token } = useStorage();
  if (!token || content_type_id) {
    return;
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/common/social_platform_content_type/${content_type_id}/get_social_platforms_content_type/`,
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


//GET ALL SOCIAL PLATFORMS


export const getAllSocialPlatforms = async () => {
  const { token, user_id } = useStorage();
  if (!token) {
    return;
  }
  try {
    let res = await axios.get(
      `${MAIN_URL}/common/social_platform_content_type/get_all_social_platforms_content_type/?page_number=0`,
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


//ADD CONTENT TYPE
export const addContentType = async (data) => {
  const { token } = useStorage();
  if (!token || content_type_id) {
    return;
  }
  try {
    let res = await axios.post(
      `${MAIN_URL}/common/social_platform_content_type/add_social_platforms_content_type/`,
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

//UPDATE CONTENT TYPE
export const updateContentType = async (content_type_id, data) => {
  const { token } = useStorage();
  if (!token || content_type_id || !data) {
    return;
  }
  try {
    let res = await axios.put(
      `${MAIN_URL}/common/social_platform_content_type/${content_type_id}/update_social_platforms_content_type/`,
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

//DELETE CONTENT TYPE
export const deleteContentType = async (content_type_id) => {
  const { token } = useStorage();
  if (!token || content_type_id) {
    return;
  }
  try {
    let res = await axios.delete(
      `${MAIN_URL}/common/social_platform_content_type/${content_type_id}/delete_social_platforms_content_type/`,
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
