import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import {Remove, Add} from "@mui/icons-material";
import { shades } from "../theme";
import { addToCart } from "../store/cartReducer";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(1);
  const [isHover, setIsHover] = React.useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  // const { category, price, name, image } = item.attributes;
  const { category, price, name, url } = item;
  
  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        <img
          alt={item.name}
          width="300px"
          height="400px"
          src={url}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHover ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count -1, 1))}>
                <Remove />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <Add />
              </IconButton>
            </Box>

            {/* BUTTON */}
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, "$1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>
          {name}
        </Typography>
        <Typography fontWeight="bold">
            ${price}
        </Typography>
      </Box>
    </Box>
  );
};

export default Item;
