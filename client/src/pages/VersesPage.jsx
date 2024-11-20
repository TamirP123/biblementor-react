import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_VERSE } from '../utils/mutations';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { motion } from 'framer-motion';
import { FaTrash, FaShare } from 'react-icons/fa';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import '../styles/VersesPage.css';

const VersesPage = () => {
  const [notification, setNotification] = React.useState({ open: false, message: '', type: 'success' });
  const { loading, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'network-only'
  });
  const [removeVerse] = useMutation(REMOVE_VERSE);

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const handleDelete = async (verse) => {
    try {
      await removeVerse({
        variables: { verse },
        update: (cache) => {
          try {
            const existingData = cache.readQuery({ query: GET_ME });
            if (existingData && existingData.me) {
              cache.writeQuery({
                query: GET_ME,
                data: {
                  me: {
                    ...existingData.me,
                    savedVerses: existingData.me.savedVerses.filter(v => v.verse !== verse)
                  }
                }
              });
            }
          } catch (err) {
            console.log('Cache update error:', err);
          }
        }
      });
      setNotification({
        open: true,
        message: 'Verse removed successfully',
        type: 'success'
      });
    } catch (err) {
      setNotification({
        open: true,
        message: 'Error removing verse',
        type: 'error'
      });
    }
  };

  const handleShare = async (verse) => {
    try {
      await navigator.share({
        title: 'Bible Verse',
        text: verse,
      });
    } catch (err) {
      try {
        await navigator.clipboard.writeText(verse);
        setNotification({
          open: true,
          message: 'Verse copied to clipboard',
          type: 'success'
        });
      } catch (clipboardErr) {
        setNotification({
          open: true,
          message: 'Error sharing verse',
          type: 'error'
        });
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <div className="verses-loading">
        <CircularProgress />
        <p>Loading your saved verses...</p>
      </div>
    );
  }

  console.log('User data:', data);

  const savedVerses = data?.me?.savedVerses || [];

  return (
    <div className="verses-page">
      <div className="verses-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Saved Verses
        </motion.h1>
        <p className="verses-subtitle">Your personal collection of biblical wisdom</p>
      </div>

      {savedVerses.length === 0 ? (
        <div className="no-verses">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="no-verses-content"
          >
            <h2>No Saved Verses Yet</h2>
            <p>Start saving your favorite verses from the daily verse section!</p>
          </motion.div>
        </div>
      ) : (
        <div className="verses-grid">
          {savedVerses.map((savedVerse, index) => (
            <motion.div
              key={index}
              className="verse-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="verse-content">
                <p className="verse-text">{savedVerse.verse}</p>
                <p className="saved-date">
                  Saved on {new Date(parseInt(savedVerse.savedAt) || savedVerse.savedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="verse-actions">
                <button 
                  className="action-button share"
                  onClick={() => handleShare(savedVerse.verse)}
                >
                  <FaShare />
                </button>
                <button 
                  className="action-button delete"
                  onClick={() => handleDelete(savedVerse.verse)}
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default VersesPage; 