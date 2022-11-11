import useStorage from "src/hooks/useStorage";
import axios from "axios";
import { MAIN_URL } from "src/services/apiConfig";

// Get All Brands
export const getAllBrands = async (params) => {
  const { token } = useStorage();
  if (!token) {
    throw "no token";
  }
  try {
    let res = await axios.get(`${MAIN_URL}/brand/get_all_brands/`, {
      params,
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

// Get Brand
export const getBrand = async ({ brandId, meta }) => {
  const { token } = useStorage();
  if (!token) {
    throw "no token";
  }
  if (!brandId) {
    throw "no brandid";
  }
  try {
    let res = await axios.get(`${MAIN_URL}/brand/${brandId}/get_brand/`, {
      params: meta,
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

// Add Brand
export const addBrand = async (data) => {
  const { token } = useStorage();
  if (!token) {
    throw "no token";
  }
  try {
    let res = await axios.post(`${MAIN_URL}/brand/create_brand/`, data, {
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

// update Brand
export const updateBrand = async ({ brandId, data }) => {
  const { token } = useStorage();
  if (!token) {
    throw "no token";
  }
  try {
    let res = await axios.put(`${MAIN_URL}/brand/${brandId}/update_brand`, data, {
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

// Delete Brand
export const deleteBrand = async ({ brandId }) => {
  const { token } = useStorage();
  if (!token) {
    throw "no token";
  }
  try {
    let res = await axios.get(`${MAIN_URL}/brand/${brandId}/delete_brand`, data, {
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
