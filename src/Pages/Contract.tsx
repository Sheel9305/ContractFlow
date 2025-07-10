import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  addContract,
  updateContract,
  deleteContract,
  clearContract,
  ContractType
} from '../store/contractSlice';
import {
  get_contracts,
  create_contracts,
  update_contracts,
  delete_contracts
} from '../api/contracts_api';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button
} from '@mui/material';

const Contract: React.FC = () => {
  const contracts = useSelector((state: RootState) => state.contracts);
  const dispatch = useDispatch();

  const [form, setForm] = useState<ContractType>({
    id: undefined,
    name: '',
    startDate: '',
    endDate: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await get_contracts();
        dispatch(clearContract());
        res.data.forEach((contract: any) => dispatch(addContract(contract)));
      } catch (err) {
        console.error('Failed to load contracts: ', err);
      }
    };

    fetchContracts();
  }, [dispatch]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.startDate || !form.endDate) return;

    try {
      if (isEditing && form.id !== undefined) {
        const res = await update_contracts(form.id, form);
        dispatch(updateContract(res.data));
      } else {
        const res = await create_contracts(form);
        dispatch(addContract(res.data[0] || form));
      }

      resetForm();
    } catch (err) {
      console.error('Error saving contract: ', err);
    }
  };

  const handleEdit = (contract: ContractType) => {
    setForm(contract);
    setIsEditing(true);
  };

  const resetForm = () => {
    setForm({ id: undefined, name: '', startDate: '', endDate: '' });
    setIsEditing(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Contracts
      </Typography>

      <Card sx={{ marginBottom: 3, padding: 2 }}>
        <TextField
          label="Contract Name"
          fullWidth
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          sx={{ mb: 2 }}
          disabled={isEditing}
          InputProps={{
            inputProps: { 'data-cy': 'contract-name-input' }
          }}
        />
        <TextField
          // label="Start Date"
          type="date"
          fullWidth
          value={form.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            inputProps: { 'data-cy': 'contract-start-input' }
          }}
        />
        <TextField
          // label="End Date"
          type="date"
          fullWidth
          value={form.endDate}
          onChange={(e) => handleChange('endDate', e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            inputProps: { 'data-cy': 'contract-end-input' }
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          data-cy="submit-btn"
        >
          {isEditing ? 'Update Contract' : 'Add Contract'}
        </Button>
        {isEditing && (
          <Button sx={{ ml: 2 }} onClick={resetForm} data-cy="cancel-btn">
            Cancel
          </Button>
        )}
      </Card>

      {contracts.map((contract) => (
        <Card key={contract.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{contract.name}</Typography>
            <Typography color="textSecondary">
              Start: {contract.startDate}
            </Typography>
            <Typography color="textSecondary">
              End: {contract.endDate}
            </Typography>
            <Button
              sx={{ mr: 1 }}
              onClick={() => handleEdit(contract)}
              data-cy={`update-btn-${contract.id}`}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                if (contract.id !== undefined) {
                  try {
                    await delete_contracts(contract.id);
                    dispatch(deleteContract(contract.id));
                  } catch (err) {
                    console.error('Error in deleting contract:', err);
                  }
                }
              }}
              data-cy={`delete-btn-${contract.id}`}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Contract;
