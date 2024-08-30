import { useEffect, useState } from "react"
import { API_ENDPOINT } from "../../app/constants/constant";
import useAxios from "../../app/hooks/useAxios";
import { Box, CssBaseline, Typography } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export const AdminLayout = () =>{
    const [open, setOpen] = useState(true);
    const title = "Products";
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const toggleDrawer = () => {
      setOpen(!open);
    };
  

    return <>
      <Box >
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} title={title} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Outlet/>
      </Box>
    </>
}