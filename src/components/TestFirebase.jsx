import React from "react";
import { Box, Typography } from "@mui/material";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { FormCart } from "./forms/FormCart";

export const TestFirebase = () => {
  const [data, setData] = React.useState(null);
  const getTest = async () => {
    const response = await ref(database, "shirts/");
    onValue(response, (snapshot) => {
      setData(snapshot.val());
    });
  };
  
  React.useEffect(() => {
    getTest();
  }, []);

  console.log(data);
  return (
    <Box width="100%" p="40px 0" mt="70px">
      <Box width="80%" margin="auto">
        {!data && <p>Loading...</p>}
        <Box>
          <Typography fontSize={24} mb="25px">Add shirt cart in database</Typography>
          <FormCart />
        </Box>
      </Box>
    </Box>
  );
};
