// Report Download functionality
const reportBulkActions = document.getElementById("reportBulkActions");
const applyReportAction = document.getElementById("applyReportAction");
const downloadButtons = document.querySelectorAll("[title=\"Download\"]");
const downloadReportDetail = document.getElementById("downloadReportDetail");

if (downloadButtons.length > 0) {
    downloadButtons.forEach(button => {
        button.addEventListener("click", function() {
            const row = this.closest("tr");
            const reportId = row.querySelector("td:nth-child(2)").textContent.trim();
            const reportName = row.querySelector("td:nth-child(3)").textContent.trim();
            downloadReport(reportId, reportName);
        });
    });
}

// Add event listener for the Download Report button in the details modal
if (downloadReportDetail) {
    downloadReportDetail.addEventListener("click", function() {
        // Get the report details from the modal
        const reportId = document.querySelector('.report-detail-id').textContent.trim();
        const reportName = document.querySelector('.report-detail-name').textContent.trim();
        downloadReport(reportId, reportName);
    });
}

if (applyReportAction && reportBulkActions) {
    applyReportAction.addEventListener("click", function() {
        const selectedAction = reportBulkActions.value;
        if (!selectedAction) {
            alert("Please select an action to perform.");
            return;
        }

        // Get all selected reports
        const selectedReports = [];
        const checkboxes = document.querySelectorAll("tbody .custom-checkbox input:checked");
        if (checkboxes.length === 0) {
            alert("Please select at least one report.");
            return;
        }

        checkboxes.forEach(checkbox => {
            const row = checkbox.closest("tr");
            const reportId = row.querySelector("td:nth-child(2)").textContent.trim();
            const reportName = row.querySelector("td:nth-child(3)").textContent.trim();
            selectedReports.push({ id: reportId, name: reportName, row: row });
        });

        console.log("Selected reports:", selectedReports.map(r => ({ id: r.id, name: r.name })));

        // Perform the selected action
        switch (selectedAction) {
            case "download":
                // Download selected reports
                selectedReports.forEach(report => {
                    downloadReport(report.id, report.name);
                });
                break;

            case "delete":
                // Confirm before deleting
                if (confirm(`Are you sure you want to delete ${selectedReports.length} report(s)?`)) {
                    selectedReports.forEach(report => {
                        report.row.remove();
                    });
                    // Update report count
                    const reportCountElement = document.querySelector(".flex.items-center h3 + span");
                    if (reportCountElement) {
                        const currentCount = parseInt(reportCountElement.textContent.split(" ")[0]) || 0;
                        reportCountElement.textContent = (currentCount - selectedReports.length) + " total";
                    }
                    alert(`${selectedReports.length} report(s) have been deleted.`);
                }
                break;
        }

        // Reset the select dropdown
        reportBulkActions.value = "";
    });
}

// Function to handle report download
function downloadReport(reportId, reportName) {
    // In a real application, you would generate a download link to the actual report file
    console.log(`Downloading report: ${reportId} - ${reportName}`);
    
    // For demo purposes, create a sample CSV content
    const csvContent = `Report ID,${reportId}\nReport Name,${reportName}\nDate Generated,${new Date().toLocaleDateString()}\nData Row 1,Value 1,Value 2,Value 3\nData Row 2,Value 4,Value 5,Value 6\nData Row 3,Value 7,Value 8,Value 9`;
    
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Create a download link
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${reportName.replace(/ /g, "_")}_${reportId}.csv`);
    link.style.visibility = "hidden";
    
    // Add the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success message
    alert(`Report "${reportName}" (${reportId}) has been downloaded.`);
}