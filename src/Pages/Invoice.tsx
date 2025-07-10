import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Box, Typography, Card, CardContent, List } from "@mui/material";

const Invoice: React.FC = () => {
  const contracts = useSelector((state: RootState) => state.contracts);
  const points = useSelector((state: RootState) => state.points);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Invoices Summary
      </Typography>

      <List>
        {contracts.map((contract) => {
          const total = points
            .filter((p) => p.contractId === contract.id)
            .reduce((sum, p) => sum + p.value, 0);

          return (
            <Card key={contract.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{contract.name}</Typography>
                <Typography color="textSecondary">
                  Total Value: <strong>{total}</strong>
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </List>
    </Box>
  );
};

export default Invoice;
