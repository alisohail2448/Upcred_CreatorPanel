import { is } from "date-fns/locale";

export const filteredInactive = (i) => {
  if (i.is_active) {
    return true;
  } else {
    return false;
  }
};
