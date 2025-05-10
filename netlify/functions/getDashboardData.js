// netlify/functions/getDashboardData.js

// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK if it hasn't been initialized yet
// This check is important for serverless environments where function instances
// might be reused across multiple requests.
if (!admin.apps.length) {
  try {
    // Retrieve the service account key from Netlify Environment Variables.
    // The JSON content was stored as a string, so we need to parse it.
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    // Initialize the Firebase Admin SDK with the service account credentials.
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
      // If you were using Firebase Realtime Database, you might also need
      // to add databaseURL here. For Firestore, it's often not needed.
    });

    console.log('Firebase Admin SDK initialized successfully.');

  } catch (error) {
    // Log any errors during initialization. This is crucial for debugging.
    console.error("Firebase Admin initialization error:", error);

    // Return an error response if initialization fails.
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to initialize Firebase Admin SDK" })
    };
  }
}

// Get a reference to the Firestore database instance.
const db = admin.firestore();

// The main handler function for the Netlify Function.
// This function will be executed when the Netlify Function endpoint is called.
exports.handler = async function(event, context) {
  try {
    // --- Fetch Data from Firestore ---
    // This is where you'll write your database queries to get the actual data
    // for your dashboard.

    // Example: Fetching total deliveries count from a 'deliveries' collection.
    // This assumes you have a collection named 'deliveries' in your Firestore.
    const deliveriesSnapshot = await db.collection('deliveries').get();
    const totalDeliveries = deliveriesSnapshot.size; // Get the number of documents in the collection

    // Example: Fetching completed deliveries count.
    // This assumes each delivery document has a 'status' field.
    const completedDeliveriesSnapshot = await db.collection('deliveries').where('status', '==', 'Completed').get();
    const completedDeliveries = completedDeliveriesSnapshot.size;

    // Example: Fetching pending deliveries count.
    const pendingDeliveriesSnapshot = await db.collection('deliveries').where('status', '==', 'Pending').get();
    const pendingDeliveries = pendingDeliveriesSnapshot.size;

     // Example: Fetching delayed deliveries count.
    const delayedDeliveriesSnapshot = await db.collection('deliveries').where('status', '==', 'Delayed').get();
    const delayedDeliveries = delayedDeliveriesSnapshot.size;


    // Example: Fetching recent activity.
    // This assumes you have an 'activity' collection with documents
    // that have a 'timestamp' field (Firestore Timestamp recommended)
    // and fields like 'iconClass', 'message', and 'time'.
    const activitySnapshot = await db.collection('activity')
                                  .orderBy('timestamp', 'desc') // Order by timestamp descending (most recent first)
                                  .limit(5) // Get the top 5 recent activities
                                  .get();

    const recentActivity = activitySnapshot.docs.map(doc => {
      const data = doc.data();
      // Map the Firestore document data to the format your frontend expects.
      return {
        iconClass: data.iconClass, // Assuming iconClass is stored in Firestore
        message: data.message,
        time: data.time // Assuming time is stored or formatted in Firestore
        // You might need to format the timestamp here if storing raw timestamps
        // Example: time: data.timestamp ? data.timestamp.toDate().toLocaleString() : 'N/A'
      };
    });

    // Example: Data structure for Delivery Status Chart (derived from counts)
    const deliveryStatusData = [
      { value: completedDeliveries, name: 'Completed', color: '#10B981' }, // success
      { value: pendingDeliveries, name: 'Pending', color: '#F59E0B' },    // warning
      { value: delayedDeliveries, name: 'Delayed', color: '#EF4444' },     // danger
      // Calculate scheduled deliveries based on total and other statuses
      { value: totalDeliveries - completedDeliveries - pendingDeliveries - delayedDeliveries, name: 'Scheduled', color: '#8B5CF6' } // primary
    ];

    // --- Placeholder for other chart data fetching ---
    // You would add similar logic here to query Firestore for data needed
    // for your Fleet Utilization and Warehouse Stock Levels charts.
    // For now, we'll return placeholder data for these charts.
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

    // Return the fetched data as a JSON response.
    // The frontend JavaScript will receive this JSON object.
    return {
      statusCode: 200, // HTTP status code for success
      headers: {
        "Content-Type": "application/json" // Indicate that the response is JSON
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
    // Log any errors that occur during the function execution (e.g., database errors).
    console.error("Error fetching dashboard data:", error);

    // Return an error response to the frontend.
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({ error: "Failed to fetch dashboard data", details: error.message })
    };
  }
};
