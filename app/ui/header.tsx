"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const links = [
  { name: "Buy", href: "/homes/for-sale" },
  { name: "Rent", href: "/homes/for-rent" },
  { name: "Sell", href: "/sell" },
  { name: "Loan", href: "/loan" },
  { name: "Agents", href: "/agents" },
  { name: "Manage Rentals", href: "/manage-rentals" },
  { name: "Advertise", href: "/advertise" },
  { name: "Help", href: "/help" },
  { name: "Sign In", href: "/sign-in" },
];

export default function Header() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const handleDrawerToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop Links */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {links.slice(0, 5).map((link) => (
            <Button
              key={link.name}
              href={link.href}
              component={Link}
              color={pathname === link.href ? "primary" : "inherit"}
              sx={{ margin: 1 }}
            >
              {link.name}
            </Button>
          ))}
        </Box>

        {/* Logo */}
        <Box sx={{ flexGrow: 1, textAlign: { xs: "center", md: "left" } }}>
          <Link href="/">
            <Image
              src="/jiro-housing.svg"
              width={1000}
              height={300}
              alt="Logo"
              style={{ height: "48px", width: "auto", cursor: "pointer" }}
            />
          </Link>
        </Box>

        {/* Right Side Links */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
          {links.slice(5).map((link) => (
            <Button
              key={link.name}
              href={link.href}
              component={Link}
              color={pathname === link.href ? "primary" : "inherit"}
              sx={{ margin: 1 }}
            >
              {link.name}
            </Button>
          ))}
        </Box>
      </Toolbar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={showMenu}
        onClose={handleDrawerToggle}
        sx={{ display: { md: "none" } }}
      >
        <List>
          {links.map((link) => (
            <ListItem button key={link.name} component={Link} href={link.href}>
              <ListItemText primary={link.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
