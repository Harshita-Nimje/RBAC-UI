import React from "react";
import { Grid, Paper, Box } from "@mui/material";
import StatBox from "../../Components/StatBox"; 
import PieChart from "../../Components/PieChart"; 
import BarChart from "../../Components/BarChart"; 

const Dashboard = () => {
  return (
    <Box sx={{ padding: "1rem", height: "100vh", overflow: "hidden" }}>
      <Grid container spacing={1} sx={{ height: "100%", overflow: "hidden" }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              height: "120px",
              padding: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StatBox
              title="Users"
              subtitle="23% increase"
              icon="👥"
              progress={0.75}
              increase="+5%"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              height: "120px",
              padding: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StatBox
              title="Revenue"
              subtitle="12% growth"
              icon="💰"
              progress={0.5}
              increase="+8%"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              height: "120px",
              padding: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StatBox
              title="Performance"
              subtitle="85% efficiency"
              icon="🚀"
              progress={0.85}
              increase="+10%"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              height: "120px",
              padding: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StatBox
              title="Tasks"
              subtitle="Completed 60%"
              icon="📊"
              progress={0.6}
              increase="+15%"
            />
          </Paper>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: "1px" }}>
          <Grid item xs={12} sm={6} md={6}>
            <Paper sx={{ padding: "1rem", height: "93%" }}>
              <PieChart />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper sx={{ padding: "1rem", height: "93%" }}>
              <BarChart />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
