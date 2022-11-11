import { EditOutlined } from "@ant-design/icons";
import { Check, Close, Edit } from "@mui/icons-material";
import { Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import EdiText from "react-editext";
import styles from "./EditableTextStyle.module.css";


const EditableText = ({ setEmailVerify, setEmailVerifyBtn, leftComponent, ...props }) => {
  const [editing, setEditing] = useState(false);
  const handleEmailVerify = () => {
    setEmailVerifyBtn(true);
  };

  return (
    <Stack direction="row" className={styles.editButtonContainer}>
      {leftComponent}
      <EdiText
        showButtonsOnHover={false}
        editOnViewClick
        onEditingStart={() => setEditing(true)}
        {...props}
        editButtonContent={<Edit fontSize="15px" sx={{marginLeft:'30px',marginRight:'10px', cursor:'pointer'}} onClick={handleEmailVerify} />}
        saveButtonContent={<Check sx={{ fontSize: "17px", color: "green" }} />}
        cancelButtonContent={
          <Close sx={{ fontSize: "17px", color: "red" }} onClick={() => setEmailVerifyBtn(false)} />
        }
        saveButtonClassName="custom-save-button"
        editButtonClassName="custom-edit-button"
        hideIcons
        editButtonProps={{
          style: {
            border: "none",
            background: "transparent",
            color: "white",
          },
        }}
        viewProps={{
          style: {
            fontSize: "0.9rem",
            fontWeight: "700",
            color: "white",
          },
        }}
        inputProps={{
          style: {
            fontSize: "0.9rem",
            borderRadius: "0.2rem",
            color: "white",
            border: "none",
            backgroundColor: "rgb(34 37 46)",
          },
        }}
      />
    </Stack>
  );
};

export default EditableText;

// import { EditOutlined } from "@ant-design/icons";
// import { Stack } from "@mui/material";
// import React, { useState } from "react";
// import EdiText from "react-editext";
// import styles from "./EditableTextStyle.module.css";

// const EditableText = ({ leftComponent, ...props }) => {
//   const [editing, setEditing] = useState(false);
//   return (
//     <Stack direction="row">
//       {editing && leftComponent}
//       <EdiText
//         onEditingStart={() => setEditing(true)}
//         {...props}
//         showButtonsOnHover
//         editButtonProps={{
//           style: {
//             border: "none",
//             background: "transparent",
//             color: "white",
//           },
//         }}
//         viewProps={{
//           style: {
//             fontSize: "0.9rem",
//             fontWeight: "700",
//             color: "white",
//           },
//         }}
//         inputProps={{
//           style: {
//             fontSize: "0.9rem",
//             borderRadius: "0.2rem",
//             color: "white",
//             borderColor: "#e1e1e1",
//             backgroundColor: "transparent",
//           },
//         }}
//       />
//     </Stack>
//   );
// };

// export default EditableText;
