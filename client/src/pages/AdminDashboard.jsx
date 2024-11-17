import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Box,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slider,
  Icon,
  LinearProgress,
  useMediaQuery,
  Menu,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { Edit as EditIcon, Add as AddIcon, ExitToApp as LogoutIcon, Delete as DeleteIcon, TrendingUp, AttachMoney, Inventory, ShoppingCart } from "@mui/icons-material";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from "chart.js";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { useTheme } from "@mui/material/styles";

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const AdminDashboard = () => {

  return (
    <div className="admin-dashboard">
    </div>
  );
};

export default AdminDashboard;
