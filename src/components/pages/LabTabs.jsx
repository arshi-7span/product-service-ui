import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProductTable from "./ProductTable";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      className="product-table-container"
      sx={{ width: "100%", typography: "body1" }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            height: "64px",
            backgroundColor: "#ffff",
            display: 'flex',
            alignItems: 'end',
            paddingLeft:'24px'
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
          >
            <Tab
              sx={{
                transition: "background-color 0.3s ease",
                "&.Mui-selected": {
                  background:
                    "linear-gradient(180deg ,#4936EF4D 0%, #ffff 100%)",
                  color: "#4936EF",
                  border: '1px solid',
                  borderBottom: "0px",
                  borderStartStartRadius:'8px',
                  borderStartEndRadius: '8px',
                  borderColor:'#4936EFCC'
                },
              }}
              label="All"
              value="1"
            />
            <Tab
              sx={{
                transition: "background-color 0.3s ease",
                "&.Mui-selected": {
                  background:
                    "linear-gradient(180deg ,#4936EF4D 0%, #ffff 100%)",
                  color: "#4936EF",
                  border: '1px solid',
                  borderColor:'#4936EFCC',
                  borderBottom: "0px",
                  borderStartEndRadius: '8px',
                  borderStartStartRadius:'8px'
                },
              }}
              label="Home & Decor"
              value="2"
            />
            <Tab
              sx={{
                transition: "background-color 0.3s ease", 
                "&.Mui-selected": {
                  background:
                    "linear-gradient(180deg ,#4936EF4D 0%, #ffff 100%)",
                  color: "#4936EF",
                  border: '1px solid',
                  borderColor:'#4936EFCC',
                  borderBottom: "0px",
                  borderStartEndRadius: '8px',
                  borderStartStartRadius:'8px'
                },
              }}
              label="Travel"
              value="3"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ProductTable />
        </TabPanel>
        <TabPanel value="2">Home & Decor</TabPanel>
        <TabPanel value="3">Travel</TabPanel>
      </TabContext>
    </Box>
  );
}
