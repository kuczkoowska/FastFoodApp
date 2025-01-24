"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import ProductsPage from "../products/page";
import OrdersPage from "../orders/page";
import SalesPage from "../reports/sales/page";
import { useRouter } from "next/navigation";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "products",
    title: "Products",
    icon: <DescriptionIcon />,
  },
];

function useDemoRouter(basePath) {
  const [path, setPath] = useState(`${basePath}/products`);
  const segment = path.split("/").pop();

  return {
    pathname: path,
    segment,
    push: (newPath) => setPath(newPath),
    navigate: (newPath) => setPath(newPath),
  };
}

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default function DashboardLayoutBasic() {
  const router = useDemoRouter("");

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout>
        {router.segment === "products" ? (
          <ProductsPage />
        ) : router.segment === "orders" ? (
          <OrdersPage />
        ) : router.segment === "sales" ? (
          <SalesPage />
        ) : (
          <DemoPageContent pathname={router.pathname} />
        )}
      </DashboardLayout>
    </AppProvider>
  );
}
