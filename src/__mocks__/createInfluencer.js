const createInfluencer = ({
  username,
  name,
  mobile,

  alt_mobile,
  is_mobile_verified,
  dob,
  email,
  is_email_verified,
  gender,
  about,
  is_whatsapp_consent,
  open_for_barter,
  is_profile_verified,
  referral_code,
}) => {
  const influencerModel = {
    username,
    name,
    mobile,
    alt_mobile,
    is_mobile_verified,
    dob,
    email,
    is_email_verified,
    gender,
    about,
    is_whatsapp_consent,
    open_for_barter,
    is_profile_verified,
    referral_code,
  };

  return influencerModel;
};
