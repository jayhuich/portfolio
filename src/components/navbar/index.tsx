"use client";
import Link from "next/link";
import * as React from "react";

import BuildIcon from "@mui/icons-material/Build";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export type Nav = {
  name: string;
  href: string;
  icon: JSX.Element;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navs: Nav[] = [
    { name: "Home", href: "/", icon: <HomeIcon /> },
    { name: "Tools", href: "/tools", icon: <BuildIcon /> },
    { name: "Games", href: "/games", icon: <SportsEsportsIcon /> }
  ];
  return (
    <>
      <header className="w-full h-16 sticky top-0 z-10 bg-slate-800">
        <div className="flex md:hidden h-full mx-2">
          <IconButton onClick={() => setIsOpen(!isOpen)} className="my-auto">
            <MenuIcon />
          </IconButton>
        </div>
        <ul className="hidden md:flex h-full mx-4 gap-x-6">
          {navs.map((e, i) => {
            return (
              <li key={i} className="my-auto">
                <Link href={e.href}>
                  <span>{e.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </header>
      <div className={`${isOpen ? "flex" : "hidden"} fixed z-10 h-screen w-screen bg-slate-800`}>
        <List component="nav" className="w-full">
          {navs.map((e, i) => {
            return (
              <ListItem key={i} disablePadding>
                <ListItemButton component="a" href={e.href}>
                  <ListItemIcon>{e.icon}</ListItemIcon>
                  <ListItemText primary={e.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
          <Divider />
        </List>
      </div>
    </>
  );
}
