import { styled } from "@mui/material";
import { IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MuiAppBar from "@mui/material/AppBar";
import MuiButton from "../core/MuiButton";
import MUITextField from "../core/MUITextField";
import { useNavigate } from "react-router-dom";


const Header = (props) => {
    const { open, handleDrawerOpen } = props;
    const drawerWidth = 226;
    const navigate = useNavigate();
  
    // const [open, setOpen] = useState(false);
  
    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: "white",
      color: "black",
      boxShadow: "none",
      height: "77px",
      padding: "0",
      justifyContent: "center",
      display: "flex",
      borderBottom: "1px solid #D4D4D8",
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: "calc(100% - 65px)",
      ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));

    const onClick = () => {
      navigate('/add', {
        replace: true
      })
  }  

    return (
      <>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Typography sx={{font:"Gilroy"}} variant='h6' className="w-1/2">
              {props.title}
            </Typography>
            {/* <Typography className="w-full flex justify-end gap-6" component="div">
              <MuiButton onClick={onClick}>Add New Product</MuiButton>
            </Typography> */}
          </Toolbar>
        </AppBar>
      </>
    );
  };
  
  export default Header;