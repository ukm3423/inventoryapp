import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const Overview = () => {
  // Dummy data for the charts
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
      }
    ]
  };

  const pieChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FFA726'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FFA726'
      ]
    }]
  };

  return (
    <div>

      {/* Render charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Sales Chart</h3>
          {/* {barChartData && (
            <Bar
              data={barChartData}
              options={{ maintainAspectRatio: false }}
            />
          )} */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Product Distribution</h3>
          {/* {pieChartData && (
            <Pie
              data={pieChartData}
              options={{ maintainAspectRatio: false }}
            />
          )} */}
        </div>

      </div>
    </div>
  );
}

export default Overview;
