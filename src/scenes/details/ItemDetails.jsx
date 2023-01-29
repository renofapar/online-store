import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button, Tabs, Tab } from "@mui/material";
import { Remove, Add, FavoriteBorderOutlined } from "@mui/icons-material";
import { shades } from "../../theme";
import { addToCart } from "../../store/cartReducer";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";
import { fontFamily } from "@mui/system";
import axios from "axios";

export const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = React.useState("description");
  const [count, setCount] = React.useState(1);
  const [item, setItem] = React.useState(null);
  const [items, setItems] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getItem = async () => {
    const response = await axios(
      `http://localhost:1337/api/items/${itemId}?populate=image`
    );
    setItem(response.data.data);
  };

  const getItems = async () => {
    const response = await axios(
      "http://localhost:1337/api/items?populate=image"
    );
    const data = await response.data.data;
    setItems(data);
  };

  React.useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); //eslint-disable-line react-hooks/exhaustive-deps
  console.log(item);
  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGEs */}
        <Box flex="1 1 40%" mb="40px">
          <img
            atl={item?.name}
            width="100%"
            height="100%"
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>${item?.attributes?.price}</Typography>
            <Typography sx={{ bt: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 4px"
            >
              <IconButton onClick={() => setCount(Math.max(count -1, 1))}>
                <Remove />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <Add />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              Add to Cart
            </Button>
          </Box>

          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlined />
              <Typography sx={{ml: '5px'}}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.attributes?.category}</Typography>
          </Box>
        </Box>
      </Box>

        {/* INFORMATION */}
        <Box m="20px 0">
              <Tabs value={value} onChange={handleChange}>
                <Tab label="DESCRIPTION" value="description" />
                <Tab label="REVIEWS" value="reviews" />
              </Tabs>
        </Box>
        <Box display='flex' flexWrap="wrap" gap="15px">
          {value === 'description' && (
            <div>{item?.attributes?.longDescription}</div>
          )}
          {value === 'reviews' && <div>reviews</div>}
        </Box>

        {/* RELATED ITEMS */}
        <Box m="50px 0" width="100%">
            <Typography variant="h3" fontWeight="bold">
              Related Products
            </Typography>
            <Box mt="20px" display="flex" flexWrap="wrap" columnGap="1.33%" justifyContent="space-between">
              {items?.slice(0,4).map((item, i) => 
                <Item key={`${item.name}-${i}`} item={item} />
              )}
            </Box>
        </Box>
    </Box>
  );
};
