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
    return(<div className="drawer_in">
      <Drawer 
        sx={{
          width: drawerWidth,
          height: 'calc(100% - 64px)', top: 64,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        
        open={IsDrawerOpen}
        
      >
        <IconButton onClick={() => dispatch(toggleDrawer(false))}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>

        <Divider />
        <List>
          <h2> Enrolled Companies</h2>
          {listofcompanies?.map((text, index) => (
            <ListItem style={{ padding: 0, marginTop: 0 }}>
              <h3 style={{ paddingRight: 19 }}> </h3>
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