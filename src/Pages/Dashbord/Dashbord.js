import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import Appoentments from "./Appoentments/Appoentments";
import UseAuth from "../context/AuthContext";
import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // make style

  const coustomStyle = makeStyles({
    route: {
      color: "white",
      fontWeight: "bold",
      textDecoration: "none",
      fontSize: "1.2rem",
      textAlign: "left",
    },
    homeRoute: {
      color: "white",
      fontWeight: "bold",
      textDecoration: "none",
      textAlign: "center",
      fontSize: "1.2rem",
      margin: "auto",
      padding: "20px",
    },
  });

  const { route, homeRoute } = coustomStyle();

  const { isAdmin } = UseAuth();

  const drawer = (
    <Box>
      <Button>
        {" "}
        <Link className={homeRoute} to={"/"}>
          DoctorPortal{" "}
        </Link>
      </Button>

      <Toolbar />
      <List>
        <ListItem button>
          <ListItemIcon></ListItemIcon>
          <ListItemText>
            {" "}
            <Link className={route} to={"/dashbord"}>
              {" "}
              Appoentment{" "}
            </Link>
          </ListItemText>
        </ListItem>

        <ListItem button>
          <ListItemIcon></ListItemIcon>
          <ListItemText>
            {" "}
            <Link className={route} to={"Allpatient"}>
              {" "}
              Prescription
            </Link>{" "}
          </ListItemText>
        </ListItem>
        {isAdmin && (
          <Box>
            <ListItem button>
              <ListItemIcon></ListItemIcon>
              <ListItemText>
                {" "}
                <Link className={route} to={"AddDoctors"}>
                  {" "}
                  Add Doctors{" "}
                </Link>{" "}
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon></ListItemIcon>
              <ListItemText>
                {" "}
                <Link className={route} to={"makeAdmin"}>
                  {" "}
                  Make admin
                </Link>{" "}
              </ListItemText>
            </ListItem>
          </Box>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "#15D1C1",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            DashBoord
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#15D1C1",
              color: "white",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#15D1C1",
              color: "white",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;