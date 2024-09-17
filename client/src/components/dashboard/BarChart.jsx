import React from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale);

const BarChart = ({ counter }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Bar chart data
  const barData = {
    labels: ["HFAT-1", "HFAT-2", "HFAT-3", "Ambulance", "CST", "Autopsy"],
    datasets: [
      {
        data: [
          counter.HFAT1Count ?? 0,
          counter.HFAT2Count ?? 0,
          counter.HFAT3Count ?? 0,
          counter.AMBULANCECount ?? 0,
          counter.CSTCount ?? 0,
          counter.AutopsyCount ?? 0,
        ],
        backgroundColor: [
          colors.greenAccent[400],
          colors.blueAccent[400],
          colors.redAccent[400],
          colors.grey[400],
          colors.orangeAccent[400],
          colors.purpleAccent[400],
        ],
        borderColor: [
          colors.primary[400],
          colors.primary[400],
          colors.primary[400],
          colors.primary[400],
          colors.primary[400],
          colors.primary[400],
        ],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options (legend hidden)
  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: theme.palette.mode === "dark" ? "white" : "black",
        },
      },
      y: {
        ticks: {
          color: theme.palette.mode === "dark" ? "white" : "black",
        },
      },
    },
    plugins: {
      legend: {
        display: false, // This removes the legend (count label)
      },
    },
  };

  return (
    <Box width="600px" height="400px" margin="0 auto">
      <Bar data={barData} options={options} />
    </Box>
  );
};

export default BarChart;
