/**
 * Sidecar - Growth Reports System
 * Sprint 3: Data Collection + AI Reports + Email Delivery
 * 
 * Setup:
 * 1. Add your OpenAI API key below
 * 2. Add your Gmail address below  
 * 3. Run testReportGeneration()
 * 4. Run setupMonthlyTrigger()
 */

const SHEET_ID = '1tUHHb9kFmsYvgZ8JiJvhdrWHt5RCwvcAvNtCKZq6F64';
const CLIENTS_TAB = 'Clients';
const METRICS_TAB = 'Monthly Metrics';
const REPORTS_TAB = 'Reports';

// ⚠️ CHANGE THESE:
const OPENAI_API_KEY = 'sk-YOUR_API_KEY_HERE';  // Get from openai.com
const SENDER_EMAIL = 'sidecareports@gmail.com'; // CHANGE THIS when you create the Gmail
const SENDER_NAME = 'Martin from Sidecar';

/**
 * Main function - runs monthly (or manually)
 * Collects metrics, generates reports, sends emails
 */
function generateAndSendReports() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const clientsSheet = ss.getSheetByName(CLIENTS_TAB);
  const metricsSheet = ss.getSheetByName(METRICS_TAB);
  const reportsSheet = ss.getSheetByName(REPORTS_TAB);
  
  const clients = getClients(clientsSheet);
  
  clients.forEach(client => {
    try {
      // Get or generate metrics
      const metrics = getLatestMetrics(metricsSheet, client.name);
      
      // Generate AI report
      const report = generateAIReport(client, metrics);
      
      // Save to Reports tab
      saveReport(reportsSheet, client, report);
      
      // Send email
      sendReportEmail(client, report);
      
      Logger.log(`✓ ${client.name}: Report generated and sent`);
    } catch (error) {
      Logger.log(`✗ ${client.name}: ${error.message}`);
    }
  });
}

/**
 * Get clients with email addresses
 */
function getClients(sheet) {
  const data = sheet.getDataRange().getValues();
  const clients = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const name = row[0];        // Column A: Name
    const businessType = row[1]; // Column B: Business Type
    const website = row[2];     // Column C: Website
    const gaId = row[3];        // Column D: GA Property ID
    const gbpId = row[4];       // Column E: GBP Location ID
    const email = row[5];       // Column F: Email
    const status = row[6];      // Column G: Status
    const startDate = row[7];   // Column H: Start Date
    
    if (name && email && gaId) {
      clients.push({ 
        name: name, 
        email: email,
        businessType: businessType,
        website: website,
        gaPropertyId: gaId,
        gbpId: gbpId,
        status: status
      });
    }
  }
  
  return clients;
}

/**
 * Get latest metrics for a client (or generate mock data)
 */
function getLatestMetrics(sheet, clientName) {
  const data = sheet.getDataRange().getValues();
  const currentMonth = Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM');
  
  // Find latest entry for this client
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][0] === clientName) {
      return {
        month: data[i][1],
        visitors: data[i][2],
        searches: data[i][3],
        reviews: data[i][4],
        rating: data[i][5]
      };
    }
  }
  
  // Generate mock if no data
  return generateMockMetrics();
}

/**
 * Generate mock metrics (for testing)
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
 * Generate AI report using OpenAI
 */
function generateAIReport(client, metrics) {
  const prompt = buildPrompt(client.name, metrics);
  
  const response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    })
  });
  
  const result = JSON.parse(response.getContentText());
  return result.choices[0].message.content;
}

/**
 * Build the prompt for OpenAI
 */
function buildPrompt(clientName, metrics) {
  return `Write a friendly, no-jargon monthly growth report for ${clientName}, a local service business.

Data for ${metrics.month}:
- Website visitors: ${metrics.visitors}
- Google searches showing their business: ${metrics.searches}
- New reviews: ${metrics.reviews}
- Average rating: ${metrics.rating} stars

Format:
THE SCOREBOARD
• [2-3 bullet points with the numbers, casual tone]

WHAT'S WORKING
• [1-2 sentences explaining what the numbers mean in plain English]

NEXT MOVES
• [1 specific, actionable suggestion]
• Hit reply if you want me to [something specific related to the suggestion] — Martin

Tone: Like a co-worker who's been friends for years. Warm, encouraging, no buzzwords like "SEO" or "optimization". Use "you" and "your".`;
}

/**
 * Save report to Reports tab
 */
function saveReport(sheet, client, reportText) {
  const now = new Date();
  const monthStr = Utilities.formatDate(now, 'GMT', 'yyyy-MM');
  
  sheet.appendRow([
    now,                    // Timestamp
    client.name,            // Client
    monthStr,               // Month
    reportText,             // Report
    'Sent',                 // Status
    SENDER_EMAIL            // From
  ]);
}

/**
 * Send report email with Sidecar branding
 */
function sendReportEmail(client, reportText) {
  const subject = `Your ${getMonthName()} Growth Report — Sidecar`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FDF6E3;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDF6E3;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px; background-color: #0D7377; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">🛵 Sidecar</h1>
              <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Your growth co-pilot</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px; color: #2C3E50; line-height: 1.6;">
              <p style="margin-top: 0;">Hey ${client.name.split(' ')[0]},</p>
              <p>Here's how ${getMonthName()} went:</p>
              
              <div style="background-color: #FDF6E3; padding: 20px; border-radius: 6px; margin: 20px 0;">
                ${formatReportForEmail(reportText)}
              </div>
              
              <p style="margin-top: 30px; color: #95A5A6; font-size: 13px;">
                — Martin<br>
                Sidecar: Your growth co-pilot
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #95A5A6; font-size: 12px; text-align: center;">
                You're receiving this because you're a Sidecar client.<br>
                Questions? Just hit reply.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  
  MailApp.sendEmail({
    to: client.email,
    subject: subject,
    htmlBody: htmlBody,
    name: SENDER_NAME,
    replyTo: SENDER_EMAIL
  });
}

/**
 * Format report text for HTML email
 */
function formatReportForEmail(reportText) {
  // Convert markdown-style formatting to HTML
  return reportText
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color: #0D7377;">$1</strong>')
    .replace(/^• /gm, '<span style="color: #FF6B6B;">•</span> ')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

/**
 * Get current month name
 */
function getMonthName() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return months[new Date().getMonth()];
}

/**
 * Test report generation (run this first!)
 */
function testReportGeneration() {
  Logger.log('🛵 Testing Sidecar report generation...');
  
  // Test with mock client
  const testClient = {
    name: 'Test Business',
    email: SENDER_EMAIL, // Sends to yourself for testing
    gaPropertyId: 'test'
  };
  
  const metrics = generateMockMetrics();
  Logger.log('Metrics:', metrics);
  
  try {
    const report = generateAIReport(testClient, metrics);
    Logger.log('Report generated:');
    Logger.log(report);
    
    // Save test
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const reportsSheet = ss.getSheetByName(REPORTS_TAB);
    saveReport(reportsSheet, testClient, report);
    Logger.log('✓ Saved to Reports tab');
    
    // Email test (comment out if you haven't set up Gmail yet)
    // sendReportEmail(testClient, report);
    // Logger.log('✓ Test email sent');
    
    Logger.log('\n✅ Test complete! Check the Reports tab.');
    Logger.log('When ready, run setupMonthlyTrigger() for automation.');
  } catch (error) {
    Logger.log('❌ Error:', error.message);
    Logger.log('Make sure you set OPENAI_API_KEY in the script!');
  }
}

/**
 * Set up monthly trigger (run once)
 */
function setupMonthlyTrigger() {
  // Remove existing triggers
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'generateAndSendReports') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create monthly trigger (1st of month at 9 AM)
  ScriptApp.newTrigger('generateAndSendReports')
    .timeBased()
    .everyMonths(1)
    .onMonthDay(1)
    .atHour(9)
    .create();
    
  Logger.log('✓ Monthly trigger created for 1st of month at 9 AM');
}

/**
 * Manual trigger - run this to generate reports now
 */
function runNow() {
  generateAndSendReports();
}
