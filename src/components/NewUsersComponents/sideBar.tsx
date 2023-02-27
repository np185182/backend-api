// import * as React from 'react';
// import Box from '@mui/material/Box';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import { height } from '@mui/system';
// import './newUsers.css'

// type Anchor = 'top' | 'left' | 'bottom' | 'right';

// export default function SwipeableTemporaryDrawer() {
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer =
//     (anchor: Anchor, open: boolean) =>
//     (event: React.KeyboardEvent | React.MouseEvent) => {
//       if (
//         event &&
//         event.type === 'keydown' &&
//         ((event as React.KeyboardEvent).key === 'Tab' ||
//           (event as React.KeyboardEvent).key === 'Shift')
//       ) {
//         return;
//       }

//       setState({ ...state, [anchor]: open });
//     };

//   const list = (anchor: Anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
      
//     </Box>
//   );

//   return (
//     <div>
      
     
//       <SwipeableDrawer onClose={()=>{}} onOpen={()=>{}}></SwipeableDrawer>
      
//     </div>
//   );
// }



// // {(['right'] as const).map((anchor) => (
// //   <React.Fragment key={anchor}>
// //     <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
// //     <SwipeableDrawer className='drawer'
// //       anchor='right'
// //       open={state['right']}
// //       onClose={toggleDrawer(anchor, false)}
// //       onOpen={toggleDrawer(anchor, true)}
      
// //     >
// //       {list(anchor)}
// //     </SwipeableDrawer>
// //   </React.Fragment>
// // ))}


// {/* <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List> */}


import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppsIcon from "@mui/icons-material/Apps";
import { Button } from "@mui/material";
import { useState } from "react";
import NewUsers from "./NewUser";


export default function StyledDrawer() {
  const [IsDrawerOpen,setIsDrawerOpen]=useState(false)
  return (
    <div>  <Button onClick={()=>setIsDrawerOpen(true)}>Button</Button> 

    <Drawer
    anchor="right"
    open={IsDrawerOpen}
    onClose={()=>{setIsDrawerOpen(false)}}

    
      PaperProps={{
        elevation: 10,
        sx: {
          marginTop:10,
          width: 240,
          height: 500,
          color: "rgba(225,249,27,1)",
          backgroundColor: "rgba(30, 139, 195, 0.8)"
          ,borderRadius:5
        }
      }}
    >
      <div>
      <List>
          {["Home", "Page 1", "Page 2", "Page 3"].map((text, index) => (
            <ListItem button key={text} >
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
         
        </List>
        
        
      </div>
      
    </Drawer>
    </div>
  );
}