/**
 * Growth Reports - Data Collection
 * Pulls client data and generates monthly metrics
 * 
 * Setup: Run testWithMockData() first, then setupMonthlyTrigger()
 */

const SHEET_ID = '1tUHHb9kFmsYvgZ8JiJvhdrWHt5RCwvcAvNtCKZq6F64';
const CLIENTS_TAB = 'Clients';
const METRICS_TAB = 'Monthly Metrics';

/**
 * Main function - collect metrics for all clients
 */
function collectMonthlyMetrics() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const clientsSheet = ss.getSheetByName(CLIENTS_TAB);
  const metricsSheet = ss.getSheetByName(METRICS_TAB);
  
  const clients = getClients(clientsSheet);
  
  clients.forEach(client => {
    try {
      const metrics = generateMockMetrics();
      writeMetrics(metricsSheet, client, metrics);
      Logger.log(`✓ ${client.name}: ${metrics.visitors} visitors`);
    } catch (error) {
      Logger.log(`✗ ${client.name}: ${error.message}`);
    }
  });
}

/**
 * Get all clients with GA Property IDs
 */
function getClients(sheet) {
  const data = sheet.getDataRange().getValues();
  const clients = [];
  
  // Skip header row (i=1)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const name = row[0];        // Column A: Name
    const gaId = row[3];        // Column D: GA Property ID
    
    if (name && gaId && gaId !== '') {
      clients.push({ name: name, gaPropertyId: gaId });
    }
  }
  
  return clients;
}

/**
 * Generate mock metrics (replace with real GA4 API later)
 */
function generateMockMetrics() {
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  
  return {
    month: Utilities.formatDate(lastMonth, 'GMT', 'yyyy-MM'),
    visitors: Math.floor(Math.random() * 100) + 50,
    searches: Math.floor(Math.random() * 300) + 200,
    reviews: Math.floor(Math.random() * 5) + 1,
    rating: (4 + Math.random()).toFixed(1)
  };
}

/**
 * Write metrics to Monthly Metrics tab
 */
function writeMetrics(sheet, client, metrics) {
  const monthStr = Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM');
  const existingData = sheet.getDataRange().getValues();
  
  // Check if row exists for this client/month
  for (let i = 1; i < existingData.length; i++) {
    if (existingData[i][0] === client.name && existingData[i][1] === monthStr) {
      // Update existing
      sheet.getRange(i + 1, 3, 1, 4).setValues([[
        metrics.visitors,
        metrics.searches,
        metrics.reviews,
        metrics.rating
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
    '',  // Top Keyword
    '',  // Ranking
    ''   // Quote Requests
  ]);
}

/**
 * Set up monthly trigger (run once)
 */
function setupMonthlyTrigger() {
  // Remove existing triggers
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'collectMonthlyMetrics') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create monthly trigger (1st of month at 9 AM)
  ScriptApp.newTrigger('collectMonthlyMetrics')
    .timeBased()
    .everyMonths(1)
    .onMonthDay(1)
    .atHour(9)
    .create();
    
  Logger.log('✓ Monthly trigger created');
}

/**
 * Test with mock data (run this first)
 */
function testWithMockData() {
  Logger.log('Testing...');
  collectMonthlyMetrics();
  Logger.log('Done! Check Monthly Metrics tab.');
}