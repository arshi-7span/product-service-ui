import React, { useEffect, useState } from 'react';
import { Button,Box, IconButton, styled, Typography, Grid2, Grid } from '@mui/material';
import useAxios from '../../app/hooks/useAxios';
import { API_ENDPOINT } from '../../app/constants/constant';
import DataGrid from '../core/DataGrid';
import { Delete, Edit } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import "./ProductTable.css"; // Import the CSS file
import MuiButton from '../core/MuiButton';
import { useNavigate } from 'react-router-dom';
import LabTabs from './LabTabs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notification } from 'antd';



const ProductTable = () => {

    const { get } = useAxios();
    const { del } = useAxios();
    const navigate = useNavigate();

    const [data , setData] = useState([])
    const [isDeleted , setIsDeleted] = useState(false)
    let isNotificationDisplayed = false;



    const columns = [
      { field: 'id', headerName: '#', width: 260 },
      { field: 'name', headerName: 'Name', width: 267 },
      { field: 'description', headerName: 'Description', width: 260 },
      { field: 'price', headerName: 'Price', width: 150 },
      { field: 'quantity', headerName: 'Quantity', width: 150 },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<Edit />}
              label="Edit"
              className="textPrimary"
              onClick={(event) => handleEditClick(event,id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<Delete />}
              label="Delete"
              onClick={(event) => handleDeleteClick(event,id)}
              color="inherit"
            />,
          ];
        },
      },
    ];


    const handleEditClick = (event,id) =>{
        navigate(`/edit/${id}`, {
          replace: true
        })
    }

    
    const handleDeleteClick = (event,id) =>{
      setIsDeleted(false)
      del(`${API_ENDPOINT.PRODUCTS}/${id}`, null, true)
        .then((response) => {
          setIsDeleted(true)
          if (!isNotificationDisplayed) {
            isNotificationDisplayed = true;
            notification.success({
              message: "Success",
              description: "Product deleted successfully",
              onClose: () => {
                isNotificationDisplayed = false;
              },
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching folders:", error);
        });
    }

    const fetchAllProducts = () => {
        get(`${API_ENDPOINT.PRODUCTS}`, null, true)
          .then((response) => {
            console.log(response.data)
            setData(response.data)
          })
          .catch((error) => {
            console.error("Error fetching folders:", error);
          });
      };

      useEffect(() => {
        fetchAllProducts();
      }, [isDeleted]);

    
   const onClick = () => {
        navigate('/add', {
          replace: true
        })
    }  

  return (<>
    <Box sx={{width:'80%'}}>
     <Grid2 Grid2 container spacing={2}> 
     <Grid2 item xs={6}>
          <Typography sx={{font:"Gilroy",fontWeight:'700'}} variant='h5'>Product List   </Typography>
      </Grid2>
       <Grid2 item xs={6} sx={{marginLeft:'74%'}}>
           <Button  variant="contained" onClick={onClick}  sx={{  backgroundColor: '#4936EF', textTransform: "capitalize"}} >Add new product</Button>
      </Grid2>
      
   </Grid2> 
  
    <DataGrid
      sx={{
        borderRadius: '10px',
        border:'1px solid',
        borderColor:'#E4E4E7',
        marginTop:"20px",
        background:'#FFFFFF',
        '& .MuiDataGrid-columnHeaders': {
          borderTop: 'none',
          borderBottom:'none'
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          whiteSpace: 'normal'
        }
        
      }}
      rows={data}
      columns={columns}
      disableRowSelectionOnClick={true}
      checkboxSelection={false}
    />
  </Box>
  </>
  );
};

export default ProductTable;
