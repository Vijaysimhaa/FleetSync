// netlify/functions/getDashboardData.js

// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK if it hasn't been initialized yet
// This is important for serverless functions that might be reused
if (!admin.apps.length) {
  // Use environment variable for service account key
  // The content of the JSON file is stored as a string in the environment variable
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    // You might need to add databaseURL if you're using Realtime Database,
    // but for Firestore, it's often not necessary here.
  });
}

// Get a reference to the Firestore database
const db = admin.firestore();

// Handler function for the Netlify Function
exports.handler = async function(event, context) {
  try {
    // --- Fetch Data from Firestore ---

    // Example: Fetching total deliveries count (assuming a 'deliveries' collection)
    const deliveriesSnapshot = await db.collection('deliveries').get();
    const totalDeliveries = deliveriesSnapshot.size;

    // Example: Fetching completed deliveries count (assuming a 'deliveries' collection with a 'status' field)
    const completedDeliveriesSnapshot = await db.collection('deliveries').where('status', '==', 'Completed').get();
    const completedDeliveries = completedDeliveriesSnapshot.size;

    // Example: Fetching pending deliveries count
    const pendingDeliveriesSnapshot = await db.collection('deliveries').where('status', '==', 'Pending').get();
    const pendingDeliveries = pendingDeliveriesSnapshot.size;

     // Example: Fetching delayed deliveries count
    const delayedDeliveriesSnapshot = await db.collection('deliveries').where('status', '==', 'Delayed').get();
    const delayedDeliveries = delayedDeliveriesSnapshot.size;


    // Example: Fetching recent activity (assuming an 'activity' collection, ordered by timestamp)
    const activitySnapshot = await db.collection('activity')
                                  .orderBy('timestamp', 'desc') // Assuming a 'timestamp' field
                                  .limit(5) // Get the 5 most recent activities
                                  .get();

    const recentActivity = activitySnapshot.docs.map(doc => {
      const data = doc.data();
      // Format the data as your frontend expects
      return {
        iconClass: data.iconClass, // Assuming iconClass is stored in Firestore
        message: data.message,
        time: data.time // Assuming time is stored or formatted in Firestore
        // You might need to format the timestamp here if storing raw timestamps
      };
    });

    // Example: Fetching data for Delivery Status Chart
    // This might involve aggregating data from the 'deliveries' collection
    // For simplicity, let's structure it based on the counts we already got
    const deliveryStatusData = [
      { value: completedDeliveries, name: 'Completed', color: '#10B981' },
      { value: pendingDeliveries, name: 'Pending', color: '#F59E0B' },
      { value: delayedDeliveries, name: 'Delayed', color: '#EF4444' },
      // You might need to query for 'Scheduled' or other statuses
      { value: totalDeliveries - completedDeliveries - pendingDeliveries - delayedDeliveries, name: 'Scheduled', color: '#8B5CF6' } // Example calculation
    ];

    // --- Placeholder for other chart data fetching ---
    // You would add similar logic here to fetch data for Fleet Utilization and Stock Levels charts
    const fleetUtilizationData = [
        { value: 130, name: 'Truck A' },
        { value: 160, name: 'Truck B' },
        { value: 100, name: 'Truck C' },
        { value: 120, name: 'Truck D' },
        { value: 140, name: 'Truck E' }
      ];
    const stockLevelsData = {
        labels: ['July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        warehouseA: [150, 160, 140, 170, 180, 200],
        warehouseB: [250, 230, 260, 240, 280, 300]
    };


    // --- End of Fetch Data from Firestore ---

    // Return the fetched data as a JSON response
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        totalDeliveries: totalDeliveries,
        completedDeliveries: completedDeliveries,
        pendingDeliveries: pendingDeliveries,
        delayedDeliveries: delayedDeliveries,
        recentActivity: recentActivity,
        deliveryStatusData: deliveryStatusData,
        fleetUtilizationData: fleetUtilizationData, // Include other chart data
        stockLevelsData: stockLevelsData // Include other chart data
      })
    };

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({ error: "Failed to fetch dashboard data", details: error.message })
    };
  }
};
