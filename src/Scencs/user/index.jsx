import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Switch,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../Theme";
import { mockDataTeam } from "../../data/userdata";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../Components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
  });
  const [editId, setEditId] = useState(null);
  const [teamData, setTeamData] = useState(
    mockDataTeam.map((user) => ({
      ...user,
      status: Math.random() > 0.5 ? "Active" : "Inactive",
      role: ["Designer", "Developer", "Manager", "QA", "User"][
        Math.floor(Math.random() * 5)
      ],
      checked: false,
    }))
  );

  const handleAddUser = () => {
    const newUser = {
      id: teamData.length + 1,
      ...formData,
      status: "Active",
      role: "User",
    };
    setTeamData([...teamData, newUser]);
    setOpenAdd(false);
    setFormData({ name: "", age: "", phone: "", email: "" });
  };

  const handleEditUser = () => {
    const updatedData = teamData.map((user) =>
      user.id === editId ? { ...user, ...formData } : user
    );
    setTeamData(updatedData);
    setOpenEdit(false);
    setFormData({ name: "", age: "", phone: "", email: "" });
  };

  const handleDeleteUser = (id) => {
    const filteredData = teamData.filter((user) => user.id !== id);
    setTeamData(filteredData);
  };

  const handleToggleStatus = (id) => {
    setTeamData((prevData) =>
      prevData.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "age", headerName: "Age", type: "number" },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center" gap="10px">
          <Typography
            color={
              row.status === "Active"
                ? colors.greenAccent[300]
                : colors.redAccent[300]
            }
          >
            {row.status}
          </Typography>
          <Switch
            checked={row.status === "Active"}
            onChange={() => handleToggleStatus(row.id)}
            color="redAccent"
          />
        </Box>
      ),
    },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" gap="10px">
          <Button
            startIcon={<EditIcon />}
            variant="outlined"
            sx={{ color: colors.blueAccent[300] }}
            onClick={() => {
              setEditId(row.id);
              setFormData({
                name: row.name,
                age: row.age,
                phone: row.phone,
                email: row.email,
              });
              setOpenEdit(true);
            }}
          >
            Edit
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            variant="outlined"
            sx={{ color: colors.redAccent[300] }}
            onClick={() => handleDeleteUser(row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TEAM" subtitle="Managing the Members" />
        <Button
          onClick={() => setOpenAdd(true)}
          startIcon={<AddIcon />}
          variant="contained"
          color="success"
        >
          Add User
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
        }}
      >
        <DataGrid rows={teamData} columns={columns} />
      </Box>
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Age"
            fullWidth
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Phone"
            fullWidth
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            margin="dense"
          />
          <TextField
            label="Email"
            fullWidth
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            margin="dense"
          />
          <TextField
            label="Role"
            fullWidth
            select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            margin="dense"
          >
            {["Designer", "Developer", "Manager", "QA", "User"].map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Age"
            fullWidth
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Phone"
            fullWidth
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            margin="dense"
          />
          <TextField
            label="Email"
            fullWidth
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            margin="dense"
          />
          <TextField
            label="Role"
            fullWidth
            select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            margin="dense"
          >
            {["Designer", "Developer", "Manager", "QA", "User"].map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleEditUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
