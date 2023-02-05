import React from "react";
import { Box, Typography } from "@mui/material";
import { ref, onValue, query, limitToLast, get, startAfter } from "firebase/database";
import { database } from "../firebase";
import { FormCart } from "./forms/FormCart";
import { FormImage } from "./forms/FormImage";
import { useSelector } from "react-redux";

export const TestFirebase = () => {
  const [data, setData] = React.useState([]);

  const getShirts = async () => {
    const response = await ref(database, "shirts/");
    onValue(response, (snapshot) => {
      const records = [];
      snapshot.forEach((childSnapshot) => {
        let keyData = childSnapshot.key;
        let dataValue = childSnapshot.val();
        records.push({ id: keyData, ...dataValue });
        setData(records);
      });
    });
  };


  React.useEffect(() => {
    getShirts()
  }, []);

  
  return (
    <Box width="100%" p="40px 0" mt="70px">
      <Box width="80%" margin="auto">
        {data && <p>Loading...</p>}
        <Box>
          <Typography fontSize={24} mb="25px">
            Add shirt cart in database
          </Typography>
          <Box display='flex' justifyContent="space-between" width="700px">
          <FormCart />
          <>
            {data.map((cart, index) => (
              <Box key={cart.id}>
                {index}
                <Typography>{cart.name}</Typography>
                <Typography>{cart.price}</Typography>
              </Box>
            ))}
          </>
          </Box>
          
        </Box>
      </Box>
    </Box>
  );
};
