import { Drawer, IconButton, Divider, List, ListItem, ListItemText, useTheme } from "@mui/material";
import { toggleDrawer } from "../../shared/utils/redux/reducers/newUserReducer";
import { useAppDispatch, useAppSelector } from "../../shared/utils/redux/selectors/hooks";
import { AppDispatch } from "../../shared/utils/redux/store";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


export default function NewUsersideBar(){
    const drawerWidth = 270;
    const theme = useTheme();
    const dispatch: AppDispatch = useAppDispatch();

  const IsDrawerOpen = useAppSelector((state) => state.NewUser.isDrawerOpen);
  const listofcompanies = useAppSelector(
    (state) => state.NewUser.tempcompanieslist
  );
  const tempbarclickedDate=useAppSelector((state)=>state.NewUser.barclickedDate);
    return(<div className="drawer_in">
      <Drawer 
      anchor="right"
      open={IsDrawerOpen}
      onClose={() => {
        dispatch(toggleDrawer(false))
       
      }}
      
      
      PaperProps={{
        elevation: 10,
        sx: {
          width: 230,
          flexShrink: 100,
          '& .MuiDrawer-paper': {
            width: 100,
          },
          padding: 3,
          marginTop: 8.2,
          
          height: "80%",
          color: "black",
          backgroundColor: "white",
           borderRadius: 3,
        },
      }}  >
        {/* <IconButton onClick={() => dispatch(toggleDrawer(false))}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton> */}

        {/* <Divider /> */}
        <h2 style={{fontFamily:'Palyfair'}}> Enrolled Companies</h2>
        <Divider />
        <h3 style={{fontFamily:'Palyfair'}}>Date: {tempbarclickedDate}</h3>
        <Divider />
        <h3 style={{fontFamily:'Palyfair'}}>Enrollments: {listofcompanies.length}</h3>
        <Divider/>
        <List>
          
          {listofcompanies?.map((text, index) => (
            <ListItem >
           
              <AddBusinessOutlinedIcon style={{ fill: "#0072ea" }} />
              <ListItemText
                primaryTypographyProps={{
                  paddingLeft: 1,
                  fontSize: "19px",
                  fontFamily: "Playfair",
                  
                }}
                primary={text}
              />
            </ListItem>
          ))}
        </List>
      </Drawer></div>)
}