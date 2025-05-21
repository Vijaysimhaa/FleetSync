// Initialize charts
let funnelChart = null;
let cohortChart = null;

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

// Event Listeners
document.getElementById('funnelType').addEventListener('change', (e) => {
    updateFunnelData(e.target.value, document.getElementById('dateRange').value);
});

document.getElementById('dateRange').addEventListener('change', (e) => {
    updateFunnelData(document.getElementById('funnelType').value, e.target.value);
});

document.getElementById('cohortMetric').addEventListener('change', (e) => {
    updateCohortData(e.target.value, document.getElementById('cohortSize').value);
});

document.getElementById('cohortSize').addEventListener('change', (e) => {
    updateCohortData(document.getElementById('cohortMetric').value, e.target.value);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeFunnelAnalysis();
    initializeCohortAnalysis();
});