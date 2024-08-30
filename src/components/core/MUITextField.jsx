import {
    IconButton,
    InputAdornment,
    TextField,
    Typography,
  } from "@mui/material";
  import OutlinedInput from "@mui/material/OutlinedInput";
  import SearchIcon from "@mui/icons-material/Search";
  import clsx from "clsx";
  const MUITextField = (props) => {
    const {
      id = "custom-input",
      label,
      placeholder,
      size = "small",
      searchIcon = false,
      onChange = (val) => {
        console.log(val);
      },
      inputClassName,
      className,
      value,
      type = "text",
      maxValue,
      minValue = 0,
    } = props;
    return (
      <>
        <Typography
          component="div"
          sx={{ display: "flex", flexDirection: "column" }}
          className={className}
        >
          {label && <Typography component="label">{label}</Typography>}
          <OutlinedInput
            id={id}
            variant="outlined"
            size={size}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              if (type == "number") {
                if (maxValue && +e.target.value > maxValue) {
                  e.target.value = maxValue;
                }
                if (minValue && +e.target.value < minValue) {
                  e.target.value = 1;
                }
              }
              onChange(e.target.value);
            }}
            inputProps={{ min: minValue }}
            defaultValue={value}
            className={clsx("h-full", inputClassName)}
            endAdornment={
              searchIcon ? (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ) : (
                <></>
              )
            }
          />
        </Typography>
      </>
    );
  };
  
  export default MUITextField;
  