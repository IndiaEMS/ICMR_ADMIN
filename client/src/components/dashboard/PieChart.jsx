import React from "react";
import { Pie } from "react-chartjs-2";
import { Box } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ counter }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = {
    labels: ["HFAT-1", "HFAT-2", "HFAT-3", "Ambulance", "CST", "Autopsy"],
    datasets: [
      {
        label: "Data Distribution",
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: theme.palette.mode === "dark" ? "white" : "black",
        },
      },
    },
  };

  return (
    <div>
      <Box width="350px" height="400px" margin="0 auto">
        <Pie data={data} options={options} />
      </Box>
    </div>
  );
};

export default PieChart;
