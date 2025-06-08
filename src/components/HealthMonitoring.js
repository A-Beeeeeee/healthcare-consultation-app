import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  LinearProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HealthMonitoring = () => {
  const [vitalSigns, setVitalSigns] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newVitalSign, setNewVitalSign] = useState({
    type: '',
    value: '',
    unit: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [showNotification, setShowNotification] = useState(false);

  const vitalSignTypes = [
    { type: 'Blood Pressure', unit: 'mmHg', normalRange: '120/80' },
    { type: 'Heart Rate', unit: 'bpm', normalRange: '60-100' },
    { type: 'Temperature', unit: '°F', normalRange: '98.6' },
    { type: 'Oxygen Saturation', unit: '%', normalRange: '95-100' },
    { type: 'Weight', unit: 'kg', normalRange: 'Varies' },
    { type: 'Blood Sugar', unit: 'mg/dL', normalRange: '70-140' },
  ];

  useEffect(() => {
    const savedVitalSigns = localStorage.getItem('vitalSigns');
    if (savedVitalSigns) {
      setVitalSigns(JSON.parse(savedVitalSigns));
    }
  }, []);

  const handleAddVitalSign = () => {
    const updatedVitalSigns = [...vitalSigns, { ...newVitalSign, id: Date.now() }];
    setVitalSigns(updatedVitalSigns);
    localStorage.setItem('vitalSigns', JSON.stringify(updatedVitalSigns));
    setOpenDialog(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    setNewVitalSign({
      type: '',
      value: '',
      unit: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  const handleDeleteVitalSign = (id) => {
    const updatedVitalSigns = vitalSigns.filter(sign => sign.id !== id);
    setVitalSigns(updatedVitalSigns);
    localStorage.setItem('vitalSigns', JSON.stringify(updatedVitalSigns));
  };

  const getChartData = (type) => {
    const filteredData = vitalSigns
      .filter(sign => sign.type === type)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      labels: filteredData.map(sign => sign.date),
      datasets: [
        {
          label: type,
          data: filteredData.map(sign => sign.value),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Vital Signs Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '20px auto', padding: '0 20px' }}>
      {showNotification && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Vital sign added successfully!
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Health Monitoring</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Add Vital Sign
            </Button>
          </Box>

          <Grid container spacing={3}>
            {vitalSignTypes.map((type) => {
              const latestSign = vitalSigns
                .filter(sign => sign.type === type.type)
                .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

              return (
                <Grid item xs={12} md={6} lg={4} key={type.type}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {type.type}
                      </Typography>
                      {latestSign ? (
                        <>
                          <Typography variant="h4" component="div" gutterBottom>
                            {latestSign.value} {type.unit}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Last recorded: {latestSign.date}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Normal range: {type.normalRange}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No data recorded
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Vital Signs History
            </Typography>
            <List>
              {vitalSigns
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((sign) => (
                  <ListItem
                    key={sign.id}
                    sx={{
                      mb: 1,
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">
                          {sign.type}: {sign.value} {sign.unit}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" display="block">
                            Date: {sign.date}
                          </Typography>
                          {sign.notes && (
                            <Typography component="span" variant="body2" display="block">
                              Notes: {sign.notes}
                            </Typography>
                          )}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteVitalSign(sign.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Trends
            </Typography>
            <Grid container spacing={3}>
              {vitalSignTypes.map((type) => {
                const data = getChartData(type.type);
                return (
                  <Grid item xs={12} md={6} key={type.type}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {type.type} Trend
                        </Typography>
                        {data.labels.length > 0 ? (
                          <Line data={data} options={chartOptions} />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No data available for chart
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Vital Sign</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Vital Sign Type</InputLabel>
                <Select
                  value={newVitalSign.type}
                  onChange={(e) => {
                    const selectedType = vitalSignTypes.find(
                      (type) => type.type === e.target.value
                    );
                    setNewVitalSign({
                      ...newVitalSign,
                      type: e.target.value,
                      unit: selectedType ? selectedType.unit : '',
                    });
                  }}
                >
                  {vitalSignTypes.map((type) => (
                    <MenuItem key={type.type} value={type.type}>
                      {type.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Value"
                type="number"
                value={newVitalSign.value}
                onChange={(e) => setNewVitalSign({ ...newVitalSign, value: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={newVitalSign.date}
                onChange={(e) => setNewVitalSign({ ...newVitalSign, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={2}
                value={newVitalSign.notes}
                onChange={(e) => setNewVitalSign({ ...newVitalSign, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddVitalSign} variant="contained">
            Add Vital Sign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HealthMonitoring; 