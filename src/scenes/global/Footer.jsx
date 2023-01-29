import { Box, Typography, Link, useTheme } from "@mui/material";
import { shades } from "../../theme";

const AboutList = ['Careers', 'Our Stores', 'Terms & Conditions', 'Privacy Policy'];
const CustomerList = ['Help Center', 'Track Your Order', 'Corporate & Bulk Purchasing', 'Returns & Refunds'];
const ContactsList = ['50 north Whatever Blvd, Washington, DC 10501', 'Email: renofapar@gmail.com', '(222)333-4444']

export const Footer = () => {
  const { palette: {neutral}} = useTheme()
  return (
    <Box backgroundColor={neutral.light} width="100%" p="40px 0" mt="70px">
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            mb="30px"
            fontWeight="bold"
            color={shades.secondary[500]}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            Online Store
          </Typography>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            explicabo libero doloremque soluta. Amet ipsa itaque similique
            labore distinctio? Hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, amet?
          </div>
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography
            variant="h4"
            mb="30px"
            fontWeight="bold"
          >
            About Us
          </Typography>
          {AboutList.map(item => (
            <Link href="#" underline="hover" key={item} pb="25px">
            {item}
          </Link>
          ))}
        </Box>
        
        <Box  display="flex" flexDirection="column">
          <Typography
            variant="h4"
            mb="30px"
            fontWeight="bold"
          >
            Customer Care
          </Typography>
          {CustomerList.map(item => (
            <Link href="#" underline="hover" key={item} pb="25px">
            {item}
          </Link>
          ))}
        </Box>
        <Box  display="flex" flexDirection="column">
          <Typography
            variant="h4"
            mb="30px"
            fontWeight="bold"
          >
            Contact Us
          </Typography>
          {ContactsList.map(item => (
            <Link href="#" underline="hover" key={item} pb="25px">
            {item}
          </Link>
          ))}
        </Box>

        
        
      </Box>
    </Box>
  );
};
