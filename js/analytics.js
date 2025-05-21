// Initialize charts
let funnelChart = null;
let cohortChart = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts when tabs are shown
    document.addEventListener('alpinejs:initialized', () => {
        initializeFunnelChart();
        initializeCohortChart();
    });

    // Handle tab switching
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'style' && !mutation.target.style.display) {
                // Element became visible
                if (mutation.target.id === 'funnelContent' && funnelChart) {
                    funnelChart.resize();
                } else if (mutation.target.id === 'cohortContent' && cohortChart) {
                    cohortChart.resize();
                }
            }
        });
    });

    // Observe content sections
    ['funnelContent', 'cohortContent'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            observer.observe(element, { attributes: true });
        }
    });
});

function initializeFunnelChart() {
    const element = document.getElementById('funnelChart');
    if (!element) return;
    
    funnelChart = echarts.init(element);
    updateFunnelData('delivery', 'month');
}

function initializeCohortChart() {
    const element = document.getElementById('cohortHeatmap');
    if (!element) return;
    
    cohortChart = echarts.init(element);
    updateCohortView();
}

// Synthetic Data Generation
function generateSyntheticData(days = 30) {
    const now = new Date();
    const deliveryPatterns = {
        'Morning Rush': { startHour: 8, endHour: 11, weight: 0.3 },
        'Lunch Time': { startHour: 12, endHour: 14, weight: 0.25 },
        'Evening Peak': { startHour: 16, endHour: 19, weight: 0.35 },
        'Night Time': { startHour: 20, endHour: 23, weight: 0.1 }
    };

    // Generate delivery data with realistic patterns
    const deliveries = Array.from({ length: days }, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const volume = generateTimeBasedData(date, deliveryPatterns);
        const revenue = Math.round(volume * (2500 + Math.random() * 1000));
        
        return {
            date: date.toISOString().split('T')[0],
            volume,
            revenue: formatIndianCurrency(revenue),
            efficiency: Math.round(85 + Math.random() * 10),
            onTime: Math.random() > 0.15
        };
    });

    const vehicles = generateVehicleData();
    const warehouses = generateWarehouseData();
    const analytics = generateAnalyticsData();

    const syntheticData = {
        deliveries,
        vehicles,
        warehouses,
        analytics
    };

    // Update visualizations
    const preview = document.getElementById('syntheticDataPreview');
    if (preview) {
        preview.textContent = JSON.stringify(syntheticData, null, 2);
    }

    return syntheticData;
}

function generateTimeBasedData(date, patterns) {
    const hour = date.getHours();
    let baseVolume = 100;
    
    for (const [pattern, info] of Object.entries(patterns)) {
        if (hour >= info.startHour && hour <= info.endHour) {
            baseVolume *= (1 + info.weight);
        }
    }
    
    const dayFactor = date.getDay() === 0 || date.getDay() === 6 ? 0.7 : 1.2;
    return Math.round(baseVolume * dayFactor * (0.9 + Math.random() * 0.2));
}

function generateVehicleData() {
    return Array.from({ length: 10 }, (_, i) => ({
        id: `VEH-${String(i + 1).padStart(4, '0')}`,
        type: ['Truck', 'Van', 'Bike'][i % 3],
        status: ['Active', 'Maintenance', 'Idle'][Math.floor(Math.random() * 3)],
        utilization: Math.round(65 + Math.random() * 25),
        mileage: Math.round(1000 + Math.random() * 5000),
        fuelEfficiency: Math.round(80 + Math.random() * 15),
        maintenanceScore: Math.round(70 + Math.random() * 25),
        revenue: formatIndianCurrency(Math.round(50000 + Math.random() * 100000))
    }));
}

function generateWarehouseData() {
    return ['Warehouse A', 'Warehouse B', 'Warehouse C'].map(name => ({
        name,
        capacity: 50000,
        currentStock: Math.round(30000 + Math.random() * 15000),
        turnoverRate: Math.round(70 + Math.random() * 20),
        pickingEfficiency: Math.round(75 + Math.random() * 20),
        stockoutRisk: Math.random() < 0.1 ? 'High' : Math.random() < 0.3 ? 'Medium' : 'Low',
        revenue: formatIndianCurrency(Math.round(500000 + Math.random() * 1000000))
    }));
}

function generateAnalyticsData() {
    return {
        averageDeliveryTime: Math.round(25 + Math.random() * 10),
        customerSatisfaction: Math.round(85 + Math.random() * 10),
        fuelEfficiency: Math.round(75 + Math.random() * 15),
        maintenanceCompliance: Math.round(90 + Math.random() * 8),
        totalRevenue: formatIndianCurrency(Math.round(5000000 + Math.random() * 2000000))
    };
}

function formatIndianCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Funnel Analysis Functions
function initializeFunnelAnalysis() {
    const ctx = document.getElementById('funnelChart').getContext('2d');
    funnelChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'],
            datasets: [{
                data: [100, 85, 72, 62],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function updateFunnelData(type, dateRange) {
    // Fetch data from Firebase based on type and date range
    const funnelData = getFunnelData(type, dateRange);
    funnelChart.data.datasets[0].data = funnelData;
    funnelChart.update();
}

function exportFunnelData() {
    const data = funnelChart.data;
    const csvContent = "data:text/csv;charset=utf-8," 
        + data.labels.map((label, i) => `${label},${data.datasets[0].data[i]}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "funnel_analysis.csv");
    document.body.appendChild(link);
    link.click();
}

// Cohort Analysis Functions
function initializeCohortAnalysis() {
    const ctx = document.getElementById('cohortHeatmap').getContext('2d');
    cohortChart = new Chart(ctx, {
        type: 'heatmap',
        data: {
            datasets: [{
                data: generateCohortData(),
                borderWidth: 1,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

function generateCohortData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const retentionData = [];
    
    for (let i = 0; i < months.length; i++) {
        for (let j = 0; j < 4; j++) {
            retentionData.push({
                x: j,
                y: i,
                v: Math.round(100 * Math.pow(0.85, j))
            });
        }
    }
    return retentionData;
}

function updateCohortData(metric, size) {
    // Fetch data from Firebase based on metric and cohort size
    const cohortData = getCohortData(metric, size);
    cohortChart.data.datasets[0].data = cohortData;
    cohortChart.update();
}

function exportCohortData() {
    const data = cohortChart.data.datasets[0].data;
    const csvContent = "data:text/csv;charset=utf-8,Month,M0,M1,M2,M3\n" 
        + data.map(d => `${d.y},${d.v}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "cohort_analysis.csv");
    document.body.appendChild(link);
    link.click();
}

// Add event listeners for UI controls
function setupEventListeners() {
    const funnelType = document.getElementById('funnelType');
    const dateRange = document.getElementById('dateRange');
    const cohortMetric = document.getElementById('cohortMetric');
    const cohortSize = document.getElementById('cohortSize');
    
    if (funnelType) {
        funnelType.addEventListener('change', () => 
            updateFunnelData(funnelType.value, dateRange.value));
    }
    
    if (dateRange) {
        dateRange.addEventListener('change', () => 
            updateFunnelData(funnelType.value, dateRange.value));
    }
    
    if (cohortMetric) {
        cohortMetric.addEventListener('change', () => 
            updateCohortView());
    }
    
    if (cohortSize) {
        cohortSize.addEventListener('change', () => 
            updateCohortView());
    }
}

// Call setup when DOM is ready
document.addEventListener('DOMContentLoaded', setupEventListeners);

// Initialize synthetic data on page load
generateSyntheticData();