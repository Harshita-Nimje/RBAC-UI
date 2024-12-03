import React, { useState, useEffect } from "react";
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

const MockAPI = {
  roles: [{ id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] }],

  getRoles() {
    return new Promise((resolve) =>
      setTimeout(() => resolve([...this.roles]), 500)
    );
  },

  addRole(role) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRole = { id: Date.now(), ...role };
        this.roles.push(newRole);
        resolve(newRole);
      }, 500);
    });
  },

  updateRole(id, updatedRole) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.roles.findIndex((r) => r.id === id);
        if (index !== -1) {
          this.roles[index] = { ...this.roles[index], ...updatedRole };
          resolve(this.roles[index]);
        }
      }, 500);
    });
  },

  deleteRole(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.roles = this.roles.filter((role) => role.id !== id);
        resolve();
      }, 500);
    });
  },
};

const MockRole = () => {
  const theme = useTheme();
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const permissionsList = ["Read", "Write", "Delete"];

  useEffect(() => {
    MockAPI.getRoles().then(setRoles);
  }, []);

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
      MockAPI.addRole(newRole).then((role) => {
        setRoles([...roles, role]);
        setNewRole({ name: "", permissions: [] });
      });
    }
  };

  const handleDeleteRole = (id) => {
    MockAPI.deleteRole(id).then(() => {
      setRoles(roles.filter((role) => role.id !== id));
    });
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
          {roles.map((role) => (
            <ListItem
              key={role.id}
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
              <Button
                onClick={() => handleDeleteRole(role.id)}
                sx={{ marginLeft: "10px" }}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default MockRole;
