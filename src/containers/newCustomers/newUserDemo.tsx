import { styled } from "@mui/material/styles";
import "./newUserDemo.css";
import NavBar from "../../components/NavBar";
import {
  useAppSelector,
} from "../../shared/utils/redux/selectors/hooks";
import BarsClick from "../../components/mycomponents/barchart";
import NewUserDate_selectionBox from "../../components/mycomponents/newUser_dateSelectionBox";
import NewUsersideBar from "../../components/mycomponents/newCompany_sideBar";

const drawerWidth = 270;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  

  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),

    marginRight: 0,
  }),
}));

export default function NewUserDemo() {

   const IsDrawerOpen = useAppSelector((state) => state.NewUser.isDrawerOpen);


  return (
  <div style={{display:"flex"}} >
    
    
      <Main open={IsDrawerOpen}>
      <header>
    <NavBar />
  </header>
     
        
        <body style={{ paddingTop: "30px", margin: 0 }}>
          <div className="newUser_date_selection_box">
            <NewUserDate_selectionBox />
          </div>

          <div className="newUser_chartcomponent">
            <BarsClick />
          </div>
          
        </body>
        
      </Main>
      <NewUsersideBar/>
      </div>
  );
}
