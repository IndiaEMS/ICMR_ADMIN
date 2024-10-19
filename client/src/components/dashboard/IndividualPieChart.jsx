import React from "react";
import { Pie } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { tooltip } from "leaflet";

ChartJS.register(ArcElement, Tooltip, Legend);

const IndividualPieChart = ({ title, subtitle, counter, target }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = {
    labels: [`Archived`, `Remaining`],
    datasets: [
      {
        label: "Data Distribution",
        data: [counter ?? 0, target - counter],
        backgroundColor: [colors.greenAccent[400], colors.blueAccent[400]],
        borderColor: [colors.primary[400], colors.primary[400]],
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
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset.data;
            const currentValue = dataset[tooltipItem.dataIndex];
            const percentage = ((currentValue / target) * 100).toFixed(2); // Calculate percentage
            return `${tooltipItem.label} : ${currentValue} (${percentage}%)`; // Show label and percentage
          },
        },
      },
    },
  };

  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Total : {target}
      </Typography>
      <Box width="250px" height="250px" margin="0 auto">
        <Pie data={data} options={options} />
      </Box>
    </div>
  );
};

export default IndividualPieChart;
