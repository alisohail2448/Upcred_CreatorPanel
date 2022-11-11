import { differenceInYears, parse } from "date-fns";

export const calculateAge = (dob) => {
  const date = parse(dob, "yyyy-MM-dd", new Date());
  // console.log(new Date());
  // console.log(date);
  const age = differenceInYears(new Date(), date);
  console.log(age);
  return age;
};
