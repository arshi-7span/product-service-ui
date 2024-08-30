import React, { useEffect, useState } from "react";
import { TextField, Button, InputAdornment, Grid2, Box, Divider, Typography, Alert } from "@mui/material";
import "./ProductForm.css"; // Import the CSS file
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../app/constants/constant";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";

const ProductEditForm = () => {
    const {put} = useAxios();
    const navigate = useNavigate();
    const {id} = useParams();
    const { get } = useAxios();
    
    const [error, setError] = useState();
    const [product, setProduct] = useState({
      id:"",
      name: "",
      price:"",
      quantity: "",
      description:"",
    });

    let isNotificationDisplayed = false;


    useEffect(() =>{
      get(`${API_ENDPOINT.PRODUCTS}/${id}`, null, true)
      .then((response) => {
        console.log(response.data)
        if(response.data){
          setProduct({
            id:response.data.id,
            name: response.data.name,
            price: response.data.price,
            quantity: response.data.quantity,
            description: response.data.description,
          })
      }
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
      });
    },[])

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("description", product.description);
  
    await put(`${API_ENDPOINT.PRODUCTS}/${id}`, formData, true)
    .then((response) => {
       if(response.resultCode === 1001){
        if (!isNotificationDisplayed) {
          isNotificationDisplayed = true;
          notification.success({
            message: "Success",
            description: "Product saved successfully",
            onClose: () => {
              isNotificationDisplayed = false;
            },
          });
        }
          navigate('/', {
            replace: true
          })
      }
      
       if(response.resultCode === 1003){
           setError(response.resultMessage)       
       }
    
    })
    .catch((error) => {
      console.error("Error updating question", error);
    });


  };

  return (
    <Box className="product-form-container" sx={{width:'82%',padding:'0px'}}>
    <Typography className="font-title" variant='h6'sx={{marginBottom:"50px",font:"Gilroy",fontWeight:'700',backgroundColor:'#E7E8F7',paddingX:'16px',paddingY:'24px',borderStartEndRadius:'10px',borderStartStartRadius:'10px'}}>Product details</Typography>  
    <>
    <Box sx={{padding:'20px',paddingTop:'0px'}}>
    <Box> {error? <Alert severity="error" sx={{marginBottom:'18px',marginTop:'0px'}}>{error}</Alert>:null}</Box>

    <form onSubmit={handleSubmit} >
      <Grid2 container spacing={2}>
        <Grid2 size={6} item xs={12} md={6}>
          <TextField
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Grid2>
        <Grid2 size={6} item xs={12} md={6}>
          <TextField
            label="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid2>
        <Grid2 size={6} item xs={12} md={6}>
          <TextField
            label="Quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Grid2>
        <Grid2 size={6} item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
    
        </Grid2>
        <Grid2 item xs={12}>
           <Button type="submit" variant="contained" sx={{  backgroundColor: '#4936EF', textTransform: "capitalize",marginLeft:'13%'}} >Save</Button>
        </Grid2>
      </Grid2>
    </form>
    </Box>
    </>
    </Box>
  );
};

export default ProductEditForm;
