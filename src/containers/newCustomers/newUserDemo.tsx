import { styled } from "@mui/material/styles";
import "./newUserDemo.css";
import NavBar from "../../components/NavBar";
import { useAppSelector } from "../../shared/utils/redux/selectors/hooks";
import BarsClick from "../../components/mycomponents/NewUserChart";
import NewUserDate_selectionBox from "../../components/mycomponents/newUser_dateSelectionBox";
import NewUsersideBar from "../../components/mycomponents/newCompany_sideBar";
import NewUserTable from "../../components/mycomponents/newUsertable";
import NewUserChart from "../../components/mycomponents/NewUserChart";



export default function NewUserDemo() {
  const IsDrawerOpen = useAppSelector((state) => state.NewUser.isDrawerOpen);

  return (
    <>
      <div className="NewUserCompletePage">
        <div className="NewUsersdateSelection_block">
          <NewUserDate_selectionBox />
          <NewUserTable />
        </div>
        {IsDrawerOpen ? (
          <div
            className="newUser_chartcomponent_withsidebar"
            
          >
            <NewUserChart />
          </div>
        ) : (
          <div
            className="newUser_chartcomponent_withoutsidebar"
           
          >
            <NewUserChart />
          </div>
        )}
      </div>
      <NewUsersideBar />
    </>
  );
}


