// netlify/functions/getDashboardData.js

// This is a basic example. In a real application, you would
// connect to a database here to fetch your actual data.

exports.handler = async function(event, context) {
  // Sample data (replace with data fetched from your database)
  const dashboardData = {
    totalDeliveries: 1800, // Example: different number from hardcoded
    completedDeliveries: 1750,
    pendingDeliveries: 30,
    delayedDeliveries: 20,
    recentActivity: [
      { iconClass: 'ri-truck-line', message: 'Delivery XYZ Scheduled', time: 'Just now' },
      { iconClass: 'ri-checkbox-circle-line', message: 'Delivery ABC Completed', time: '15 minutes ago' },
      // ... more real activity data from your database
    ],
    deliveryStatusData: [
      { value: 1750, name: 'Completed', color: '#10B981' },
      { value: 30, name: 'Pending', color: '#F59E0B' },
      { value: 20, name: 'Delayed', color: '#EF4444' },
      { value: 50, name: 'Scheduled', color: '#8B5CF6' }
    ],
    fleetUtilizationData: [
      { value: 130, name: 'Truck A' },
      { value: 160, name: 'Truck B' },
      { value: 100, name: 'Truck C' },
      { value: 120, name: 'Truck D' },
      { value: 140, name: 'Truck E' }
    ],
    stockLevelsData: {
        labels: ['July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        warehouseA: [150, 160, 140, 170, 180, 200],
        warehouseB: [250, 230, 260, 240, 280, 300]
    }
  };

  return {
    statusCode: 200, // HTTP status code for success
    headers: {
      "Content-Type": "application/json" // Indicate that the response is JSON
    },
    body: JSON.stringify(dashboardData) // Send the data as a JSON string
  };
};
