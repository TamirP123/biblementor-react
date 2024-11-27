import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  Box,
  CircularProgress,
} from '@mui/material';
import { 
  Add as AddIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { GET_PRAYER_REQUESTS } from '../utils/queries';
import { 
  CREATE_PRAYER_REQUEST,
  UPDATE_PRAYER_STATUS,
  DELETE_PRAYER_REQUEST,
} from '../utils/mutations';
import '../styles/PrayerRequestsPage.css';

const categories = ['Personal', 'Family', 'Health', 'Spiritual', 'Other'];

const PrayerRequestsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'Personal',
  });

  const { loading, data, refetch } = useQuery(GET_PRAYER_REQUESTS);
  const [createPrayerRequest] = useMutation(CREATE_PRAYER_REQUEST);
  const [updatePrayerStatus] = useMutation(UPDATE_PRAYER_STATUS);
  const [deletePrayerRequest] = useMutation(DELETE_PRAYER_REQUEST);

  const handleCreateRequest = async () => {
    try {
      if (!newRequest.title || !newRequest.description) {
        alert('Please fill in all required fields');
        return;
      }

      await createPrayerRequest({
        variables: { 
          input: {
            title: newRequest.title,
            description: newRequest.description,
            category: newRequest.category
          }
        },
        refetchQueries: [{ query: GET_PRAYER_REQUESTS }]
      });
      
      setOpenDialog(false);
      setNewRequest({ 
        title: '', 
        description: '', 
        category: 'Personal' 
      });
    } catch (err) {
      console.error('Error creating prayer request:', err);
      alert('Error creating prayer request. Please try again.');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updatePrayerStatus({
        variables: { prayerRequestId: id, status },
      });
      refetch();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePrayerRequest({
        variables: { prayerRequestId: id },
      });
      refetch();
    } catch (err) {
      console.error('Error deleting prayer request:', err);
    }
  };

  if (loading) return <CircularProgress />;

  const prayerRequests = data?.getPrayerRequests || [];

  return (
    <Container className="page-container prayer-requests-container">
      <Box className="prayer-header">
        <Typography variant="h4" component="h1">
          Prayer Requests
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          className="add-prayer-button"
        >
          New Prayer Request
        </Button>
      </Box>

      <Grid container spacing={3}>
        {prayerRequests.map((prayer) => (
          <Grid item xs={12} md={6} lg={4} key={prayer._id}>
            <Card className={`prayer-card ${prayer.status.toLowerCase()}`}>
              <CardContent>
                <Box className="prayer-status-wrapper">
                  <Typography variant="h6" className="prayer-title">
                    {prayer.title}
                  </Typography>
                  <Typography 
                    className={`prayer-status ${prayer.status.toLowerCase()}`}
                  >
                    {prayer.status === 'Answered' ? 'Answered' : 'Unanswered'}
                  </Typography>
                </Box>
                <Chip
                  label={prayer.category}
                  className={`category-chip ${prayer.category.toLowerCase()}`}
                />
                <Typography variant="body1" className="prayer-description">
                  {prayer.description}
                </Typography>
                <Box className="prayer-actions">
                  <Box>
                    <Button
                      size="small"
                      onClick={() => handleStatusUpdate(prayer._id, 
                        prayer.status === 'Answered' ? 'Unanswered' : 'Answered')}
                      className={`status-button ${prayer.status.toLowerCase()}`}
                      startIcon={prayer.status === 'Answered' ? <CheckIcon /> : null}
                    >
                      {prayer.status === 'Answered' ? 'Answered' : 'Mark as Answered'}
                    </Button>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(prayer._id)}
                      className="delete-button"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>New Prayer Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newRequest.title}
            onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newRequest.description}
            onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
          />
          <TextField
            select
            margin="dense"
            label="Category"
            fullWidth
            value={newRequest.category}
            onChange={(e) => setNewRequest({ ...newRequest, category: e.target.value })}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateRequest} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PrayerRequestsPage; 