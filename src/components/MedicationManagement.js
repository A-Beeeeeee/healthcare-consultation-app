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
  Chip,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';

const MedicationManagement = () => {
  const [medications, setMedications] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    reminders: [{ time: '', days: [] }],
    notes: '',
  });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Load medications from localStorage
    const savedMedications = localStorage.getItem('medications');
    if (savedMedications) {
      setMedications(JSON.parse(savedMedications));
    }
  }, []);

  const handleAddMedication = () => {
    const updatedMedications = [...medications, { ...newMedication, id: Date.now() }];
    setMedications(updatedMedications);
    localStorage.setItem('medications', JSON.stringify(updatedMedications));
    setOpenDialog(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      reminders: [{ time: '', days: [] }],
      notes: '',
    });
  };

  const handleDeleteMedication = (id) => {
    const updatedMedications = medications.filter(med => med.id !== id);
    setMedications(updatedMedications);
    localStorage.setItem('medications', JSON.stringify(updatedMedications));
  };

  const handleAddReminder = () => {
    setNewMedication(prev => ({
      ...prev,
      reminders: [...prev.reminders, { time: '', days: [] }],
    }));
  };

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  return (
    <Box sx={{ maxWidth: 800, margin: '20px auto', padding: '0 20px' }}>
      {showNotification && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Medication added successfully!
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Medication Management</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Add Medication
            </Button>
          </Box>

          <List>
            {medications.map((medication) => (
              <ListItem
                key={medication.id}
                sx={{
                  mb: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" color="primary">
                      {medication.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" display="block">
                        Dosage: {medication.dosage}
                      </Typography>
                      <Typography component="span" variant="body2" display="block">
                        Frequency: {medication.frequency}
                      </Typography>
                      <Typography component="span" variant="body2" display="block">
                        Duration: {medication.startDate} - {medication.endDate}
                      </Typography>
                      <Typography component="span" variant="body2" display="block">
                        Reminders:
                      </Typography>
                      {medication.reminders.map((reminder, index) => (
                        <Box key={index} sx={{ ml: 2 }}>
                          <Typography component="span" variant="body2">
                            {reminder.time} on {reminder.days.join(', ')}
                          </Typography>
                        </Box>
                      ))}
                      {medication.notes && (
                        <Typography component="span" variant="body2" display="block" sx={{ mt: 1 }}>
                          Notes: {medication.notes}
                        </Typography>
                      )}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteMedication(medication.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Medication</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Medication Name"
                value={newMedication.name}
                onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Dosage"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Frequency"
                value={newMedication.frequency}
                onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                value={newMedication.startDate}
                onChange={(e) => setNewMedication({ ...newMedication, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                value={newMedication.endDate}
                onChange={(e) => setNewMedication({ ...newMedication, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes"
                value={newMedication.notes}
                onChange={(e) => setNewMedication({ ...newMedication, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddMedication} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MedicationManagement; 