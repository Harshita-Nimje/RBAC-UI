import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  List,
  ListItem,
  Paper,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const RoleManagement = () => {
  const theme = useTheme();
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });

  const permissionsList = ["Read", "Write", "Delete"];

  const handlePermissionChange = (permission) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleAddRole = () => {
    if (newRole.name) {
      setRoles([...roles, newRole]);
      setNewRole({ name: "", permissions: [] });
    }
  };

  return (
    <Box
      sx={{
        padding: "30px",
        backgroundColor: theme.palette.mode === "dark" ? "#1e1e2f" : "#ffffff",
        color: theme.palette.mode === "dark" ? "#e0e0e0" : "#000",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: theme.palette.mode === "dark" ? "#2c2c3a" : "#fff",
          color: theme.palette.text.primary,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            marginBottom: "20px",
            color:
              theme.palette.mode === "dark"
                ? "#ffcc00"
                : theme.palette.primary.main,
          }}
        >
          Role Management
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Role Name"
              variant="outlined"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#3c3c4c" : "#fff",
                  color: theme.palette.mode === "dark" ? "#e0e0e0" : "#000",
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.mode === "dark" ? "#b0b0b0" : "#000",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Permissions
            </Typography>
            {permissionsList.map((permission) => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    checked={newRole.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? "#ffcc00"
                          : theme.palette.primary.main,
                    }}
                  />
                }
                label={permission}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAddRole}
              fullWidth
              sx={{
                fontWeight: "bold",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "#ff5722"
                    : theme.palette.primary.main,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "#e64a19"
                      : theme.palette.primary.dark,
                },
              }}
            >
              Add Role
            </Button>
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          sx={{ marginTop: "30px", marginBottom: "10px" }}
        >
          Defined Roles
        </Typography>
        <List>
          {roles.map((role, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#424256" : "#f0f0f0",
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
                borderRadius: "5px",
                marginBottom: "10px",
                padding: "10px 20px",
              }}
            >
              <Typography>
                <strong>{role.name}</strong> - Permissions:{" "}
                {role.permissions.join(", ")}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default RoleManagement;
