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
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WarningIcon from '@mui/icons-material/Warning';

const Emergency = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });
  const [showNotification, setShowNotification] = useState(false);

  const emergencyServices = [
    {
      name: 'Emergency Services',
      number: '911',
      description: 'For life-threatening emergencies',
    },
    {
      name: 'Poison Control',
      number: '1-800-222-1222',
      description: 'For poison-related emergencies',
    },
    {
      name: 'Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 support for mental health emergencies',
    },
  ];

  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      setEmergencyContacts(JSON.parse(savedContacts));
    }
  }, []);

  const handleAddContact = () => {
    const updatedContacts = [...emergencyContacts, { ...newContact, id: Date.now() }];
    setEmergencyContacts(updatedContacts);
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
    setOpenDialog(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    setNewContact({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
    });
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = emergencyContacts.filter(contact => contact.id !== id);
    setEmergencyContacts(updatedContacts);
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
  };

  const handleEmergencyCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '20px auto', padding: '0 20px' }}>
      {showNotification && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Emergency contact added successfully!
        </Alert>
      )}

      <Card sx={{ mb: 4, backgroundColor: '#fff3f3' }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <WarningIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" color="error">
              Emergency Services
            </Typography>
          </Box>
          <Typography variant="body1" color="error" paragraph>
            In case of emergency, call 911 immediately. This page provides quick access to emergency services and your emergency contacts.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Emergency Services</Typography>
              </Box>
              <List>
                {emergencyServices.map((service) => (
                  <ListItem
                    key={service.name}
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
                          {service.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" display="block">
                            {service.description}
                          </Typography>
                          <Typography component="span" variant="body2" display="block">
                            Phone: {service.number}
                          </Typography>
                        </>
                      }
                    />
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<PhoneIcon />}
                      onClick={() => handleEmergencyCall(service.number)}
                    >
                      Call
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Emergency Contacts</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenDialog(true)}
                >
                  Add Contact
                </Button>
              </Box>
              <List>
                {emergencyContacts.map((contact) => (
                  <ListItem
                    key={contact.id}
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
                          {contact.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" display="block">
                            Relationship: {contact.relationship}
                          </Typography>
                          <Typography component="span" variant="body2" display="block">
                            Phone: {contact.phone}
                          </Typography>
                          {contact.email && (
                            <Typography component="span" variant="body2" display="block">
                              Email: {contact.email}
                            </Typography>
                          )}
                          {contact.address && (
                            <Typography component="span" variant="body2" display="block">
                              Address: {contact.address}
                            </Typography>
                          )}
                          {contact.notes && (
                            <Typography component="span" variant="body2" display="block">
                              Notes: {contact.notes}
                            </Typography>
                          )}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box>
                        <IconButton
                          edge="end"
                          aria-label="call"
                          onClick={() => handleEmergencyCall(contact.phone)}
                          sx={{ mr: 1 }}
                        >
                          <PhoneIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Emergency Contact</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Relationship"
                value={newContact.relationship}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={newContact.address}
                onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={2}
                value={newContact.notes}
                onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddContact} variant="contained">
            Add Contact
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Emergency; 