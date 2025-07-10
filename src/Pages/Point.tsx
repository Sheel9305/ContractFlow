import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, TextField, Button, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addPoint, updatePoint, deletePoint, clearPoints } from "../store/pointSlice";
import { get_points, add_point, update_point, delete_point } from "../api/points_api";
import { PointType } from "../store/pointSlice";

const Points: React.FC = () => {
  const dispatch = useDispatch();
  const contracts = useSelector((state: RootState) => state.contracts);
  const points = useSelector((state: RootState) => state.points);

  const [selectedContractId, setSelectedContractId] = useState<number | "">("");
  const [form, setForm] = useState<{ id?: number; name: string; value: number }>({ name: "", value: 0 });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await get_points();
        dispatch(clearPoints());
        res.data.forEach((p: PointType) => dispatch(addPoint(p)));
      } catch (err) {
        console.error("Error loading points:", err);
      }
    };
    fetchPoints();
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!form.name || selectedContractId === "") return;
    const payload: PointType = {
      ...form,
      contractId: Number(selectedContractId),
    };
    try {
      if (isEditing && form.id !== undefined) {
        const res = await update_point(form.id, payload);
        dispatch(updatePoint(res.data));
      } else {
        const res = await add_point(payload);
        dispatch(addPoint(res.data));
      }
      resetForm();
    } catch (err) {
      console.error("Error saving point:", err);
    }
  };

  const handleEdit = (point: PointType) => {
    setForm({ id: point.id, name: point.name, value: point.value });
    setSelectedContractId(point.contractId);
    setIsEditing(true);
  };

  const resetForm = () => {
    setForm({ name: "", value: 0 });
    setSelectedContractId("");
    setIsEditing(false);
  };

  const filteredPoints = points.filter((p) => p.contractId === Number(selectedContractId));

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Points Management</Typography>

      <Card sx={{ padding: 2, marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6">Select a Contract</Typography>
          <Select
            data-cy="contract-selector"
            value={selectedContractId === "" ? "" : selectedContractId.toString()}
            onChange={(e) => setSelectedContractId(e.target.value === "" ? "" : Number(e.target.value))}
            fullWidth
            displayEmpty
            disabled={isEditing}
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value=""><em>Select a Contract</em></MenuItem>
            {contracts.map((contract) => (
              <MenuItem key={contract.id} value={contract.id}>{contract.name}</MenuItem>
            ))}
          </Select>

          <TextField
            label="Point Name"
            data-cy="point-name-input"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            disabled={selectedContractId === ""}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Point Value"
            data-cy="point-value-input"
            fullWidth
            type="number"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: parseInt(e.target.value) || 0 })}
            sx={{ marginBottom: 2 }}
          />

          <Button variant="contained" fullWidth onClick={handleSubmit} data-cy="point-submit-btn">
            {isEditing ? "Update Point" : "Add Point"}
          </Button>
          {isEditing && (
            <Button fullWidth sx={{ mt: 1 }} onClick={resetForm} data-cy="point-cancel-btn">
              Cancel
            </Button>
          )}
        </CardContent>
      </Card>

      {selectedContractId !== "" && (
        <>
          <Typography variant="h5" gutterBottom>
            Points for {contracts.find(c => c.id === Number(selectedContractId))?.name || "Unknown"}
          </Typography>
          {filteredPoints.map((point) => (
            <Card key={point.id} sx={{ mb: 1 }}>
              <CardContent>
                <Typography variant="h6">{point.name}: {point.value}</Typography>
                <Button sx={{ mr: 1 }} onClick={() => handleEdit(point)}>Update</Button>
                <Button
                  variant="contained"
                  color="error"
                  data-cy={`delete-btn-${point.id}`}
                  onClick={async () => {
                    try {
                      const res = await delete_point(point.id!);
                      dispatch(deletePoint(res.data.id));
                    } catch (err) {
                      console.error("Error deleting point:", err);
                    }
                  }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
};

export default Points;
