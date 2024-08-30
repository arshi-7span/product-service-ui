import React, { useState } from "react";
import { TextField, Button, MenuItem, InputAdornment, Grid2, Box, Divider, Typography, Alert } from "@mui/material";
import "./ProductForm.css"; // Import the CSS file
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../app/constants/constant";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { notification } from "antd";

const ProductForm = () => {
    const {post} = useAxios();
    const navigate = useNavigate();
    const [error, setError] = useState();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    setError()

    if(product.name == null || product.name == ""){
        setError("Name can not be null or empty")
        isValid = false;
    }else if(product.price == null || product.price == "" || product.price <= 0){
        setError("Price can not be null, empty or 0")
        isValid = false;
    }else if(product.quantity == null || product.quantity == "" || product.quantity <= 0){
        setError("Quantity can not be null, empty or 0")
         isValid = false;
    }else{
      setError()
      isValid = true;
    }


    if(isValid){
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("description", product.description);
    let isNotificationDisplayed = false;

  
    await post(API_ENDPOINT.PRODUCTS, formData, true)
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
      console.error("Error creating product", error);
    });

  }
  };

  const validate = (data) => {
    let isValid = true;


  }

  return (
    <Box className="product-form-container" sx={{width:'82%',padding:'0px'}}>
    <Typography className="font-title" variant='h6'sx={{marginBottom:"50px",font:"Gilroy",fontWeight:'700',backgroundColor:'#E7E8F7',paddingX:'16px',paddingY:'24px',borderStartEndRadius:'10px',borderStartStartRadius:'10px'}}>Product details</Typography>  
    {/* <Divider  /> */}
    <>
  
    <Box sx={{padding:'20px',paddingTop:'0px'}} >
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
            // validate={register('name', {
            //   required: 'Name is required',
            //   maxLength: {
            //     value: 30,
            //     message: 'You can enter maximum 30 characters only.'
            //   }
            // })}
          />
           {/* {errors.name && (
                  <Typography className="text-[#b91c1c]">
                    {errors.name?.message}
                  </Typography>
           )} */}
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
           <Button type="submit"  variant="contained" sx={{  backgroundColor: '#4936EF', textTransform: "capitalize",marginLeft:'13%'}} >Save</Button>
        </Grid2>
      </Grid2>
    </form>
    </Box>
    </>

    </Box>
  );
};

export default ProductForm;
