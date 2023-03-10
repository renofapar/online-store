
import React from 'react'
import { Box, Tabs, Tab, Typography, useMediaQuery } from '@mui/material'
import Item from '../../components/Item'
import {useDispatch, useSelector} from 'react-redux'
import { setItem } from '../../store/cartReducer'
import axios from 'axios'
import { ref, onValue, query, limitToLast, get } from "firebase/database";
import { database } from '../../firebase'


export const ShoppingList = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('all')
  const items = useSelector(state => state.cart.items)
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

 const getItemsDatabase = async() => {
  const response = await ref(database, "shirts/");
  onValue(response, (snapshot) => {
    let records = [];
    snapshot.forEach((childSnapshot) => {
      let keyData = childSnapshot.key;
      let dataValue = childSnapshot.val();
      records = [...records, {id: keyData, ...dataValue}]
    });
    if(records.length) {
      console.log('rerender')
      dispatch(setItem(records))
    }
   
  });
 }
 console.log(items)
  React.useEffect(() => {
    // getItems()
    getItemsDatabase()
  }, [])
  
  
  const topRatedItems = items.filter(item => item.category === "topRated")
  const newArrivalsItems = items.filter(item => item.category === "newArrivals")
  const bestSellersItems = items.filter(item => item.category === "bestSellers")
  return (
    <Box width="80%" margin="80px auto">
      <Typography variant='h3' textAlign="center">
        Out Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor='primary'
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{sx: {display: isNonMobile ? 'block' : 'none'}}}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: 'wrap'
          }
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" && items.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
        {value === "newArrivals" && newArrivalsItems.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
        {value === "bestSellers" && bestSellersItems.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
        {value === "topRated" && topRatedItems.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
      </Box>
    </Box>
  )
}