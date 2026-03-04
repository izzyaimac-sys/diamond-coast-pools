/**
 * Growth Reports - Google Analytics Data Pull
 * Runs monthly to collect client metrics
 * 
 * Setup:
 * 1. Extensions → Apps Script
 * 2. Delete default code, paste this
 * 3. Add GA property IDs to Sheet
 * 4. Set trigger (see bottom)
 */

// Configuration
const SHEET_ID = 'YOUR_SHEET_ID_HERE'; // From Sheet URL
const CLIENTS_TAB = 'Clients';
const METRICS_TAB = 'Monthly Metrics';

/**
 * Main function - run this manually or via trigger
 */
function collectMonthlyMetrics() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const clientsSheet = ss.getSheetByName(CLIENTS_TAB);
  const metricsSheet = ss.getSheetByName(METRICS_TAB);
  
  // Get all active clients
  const clients = getActiveClients(clientsSheet);
  
  // Process each client
  clients.forEach(client => {
    try {
      const metrics = fetchGoogleAnalytics(client.gaPropertyId);
      writeMetricsToSheet(metricsSheet, client, metrics);
      Logger.log(`✓ Updated ${client.name}: ${metrics.visitors} visitors`);
    } catch (error) {
      Logger.log(`✗ Error for ${client.name}: ${error.message}`);
    }
  });
}

/**
 * Get active clients from Clients tab
 */
function getActiveClients(sheet) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const clients = [];
  
  // Find column indexes
  const nameIdx = headers.indexOf('Name');
  const gaIdIdx = headers.indexOf('GA Property ID');
  const statusIdx = headers.indexOf('Status');
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[statusIdx] === 'Active' && row[gaIdIdx]) {
      clients.push({
        name: row[nameIdx],
        gaPropertyId: row[gaIdIdx]
      });
    }
  }
  
  return clients;
}

/**
 * Fetch data from Google Analytics 4
 * Note: Requires GA4 Property ID and proper permissions
 */
function fetchGoogleAnalytics(propertyId) {
  // For now, returns mock data
  // Replace with actual GA4 API call when you have real access
  
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  
  return {
    month: Utilities.formatDate(lastMonth, 'GMT', 'yyyy-MM'),
    visitors: Math.floor(Math.random() * 100) + 50, // Mock: 50-150 visitors
    searches: Math.floor(Math.random() * 300) + 200, // Mock: 200-500 searches
    reviews: Math.floor(Math.random() * 5) + 1,
    rating: (4 + Math.random()).toFixed(1)
  };
  
  /*
  // REAL IMPLEMENTATION (when you have GA access):
  
  const request = {
    dateRanges: [{
      startDate: '28daysAgo',
      endDate: 'today'
    }],
    metrics: [
      { name: 'totalUsers' },
      { name: 'sessions' }
    ]
  };
  
  const report = AnalyticsData.Properties.runReport(request, `properties/${propertyId}`);
  
  return {
    month: Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM'),
    visitors: report.rows[0].metricValues[0].value,
    sessions: report.rows[0].metricValues[1].value
  };
  */
}

/**
 * Write metrics to Monthly Metrics tab
 */
function writeMetricsToSheet(sheet, client, metrics) {
  // Check if entry already exists for this client/month
  const existingData = sheet.getDataRange().getValues();
  const monthStr = Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM');
  
  for (let i = 1; i < existingData.length; i++) {
    if (existingData[i][0] === client.name && existingData[i][1] === monthStr) {
      // Update existing row
      sheet.getRange(i + 1, 3, 1, 5).setValues([[
        metrics.visitors,
        metrics.searches,
        metrics.reviews,
        metrics.rating,
        '' // Placeholder for top keyword
      ]]);
      return;
    }
  }
  
  // Add new row
  sheet.appendRow([
    client.name,
    monthStr,
    metrics.visitors,
    metrics.searches,
    metrics.reviews,
    metrics.rating,
    '', // Top keyword
    '', // Ranking
    ''  // Quote requests
  ]);
}

/**
 * Set up monthly trigger (run once to create)
 */
function setupMonthlyTrigger() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'collectMonthlyMetrics') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new monthly trigger (1st of every month at 9 AM)
  ScriptApp.newTrigger('collectMonthlyMetrics')
    .timeBased()
    .everyMonths(1)
    .onMonthDay(1)
    .atHour(9)
    .create();
    
  Logger.log('✓ Monthly trigger set up');
}

/**
 * Test function - run this first
 */
function testWithMockData() {
  Logger.log('Testing with mock data...');
  collectMonthlyMetrics();
  Logger.log('Test complete. Check your Monthly Metrics tab!');
}