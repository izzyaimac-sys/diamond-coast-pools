/**
 * Sidecar Backend - Google Apps Script
 * Handles form submissions from landing page
 */

// CONFIG - Change these
const CONFIG = {
  SHEET_ID: 'YOUR_GOOGLE_SHEET_ID_HERE',  // Create a Sheet, copy ID from URL
  EMAIL_TO: 'your-email@example.com',     // Where you get notifications
  EMAIL_FROM: 'Sidecar <noreply@sidecarhq.com>'
};

/**
 * Main function - receives form submission
 * Deploy as Web App with 'Anyone' access
 */
function doPost(e) {
  try {
    // Parse form data
    const data = JSON.parse(e.postData.contents);
    
    // 1. Save to Google Sheet
    const lead = saveLead(data);
    
    // 2. Send notification to you
    sendNotificationEmail(data);
    
    // 3. Send confirmation to lead
    sendConfirmationEmail(data);
    
    // 4. Queue audit generation (async)
    // generateAudit(lead); // We'll add this later
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, leadId: lead.id}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Save lead to Google Sheet
 */
function saveLead(data) {
  const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let leadsSheet = sheet.getSheetByName('Leads');
  
  // Create sheet if doesn't exist
  if (!leadsSheet) {
    leadsSheet = sheet.insertSheet('Leads');
    leadsSheet.appendRow([
      'ID', 'Timestamp', 'Name', 'Email', 'Phone', 
      'Business', 'Website', 'Challenge', 'Status'
    ]);
  }
  
  // Generate ID
  const id = Utilities.getUuid();
  const timestamp = new Date();
  
  // Add row
  leadsSheet.appendRow([
    id,
    timestamp,
    data.name,
    data.email,
    data.phone,
    data.business,
    data.website,
    data.challenge,
    'New Lead - Audit Pending'
  ]);
  
  return {
    id: id,
    timestamp: timestamp,
    ...data
  };
}

/**
 * Send notification email to YOU
 */
function sendNotificationEmail(data) {
  const subject = `🎯 New Lead: ${data.business}`;
  const body = `
New free audit request:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Business: ${data.business}
Website: ${data.website}
Challenge: ${data.challenge}

Time: ${new Date().toLocaleString()}

View in Sheet: https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}
  `;
  
  GmailApp.sendEmail(CONFIG.EMAIL_TO, subject, body);
}

/**
 * Send confirmation email to LEAD
 */
function sendConfirmationEmail(data) {
  const subject = `${data.name}, your audit is generating...`;
  const body = `
Hey ${data.name},

Thanks for requesting a free website audit for ${data.business}.

Your audit is being generated right now and will arrive in your inbox within 5-10 minutes.

WHAT TO EXPECT:
• Your current online score (out of 100)
• What's working well
• 3 opportunities to improve
• 90-day growth forecast
• 1 specific action item to implement

QUESTIONS? Just reply to this email.

— Martin
Sidecar: Your growth co-pilot

P.S. — While you wait, here's a free resource that might help:
"5 Ways to Get More Google Reviews This Week"
https://sidecarhq.com/guides/reviews
  `;
  
  GmailApp.sendEmail(data.email, subject, body, {
    name: 'Martin from Sidecar',
    replyTo: CONFIG.EMAIL_TO
  });
}

/**
 * For testing - creates the Google Sheet
 */
function createSheet() {
  const sheet = SpreadsheetApp.create('Sidecar Leads');
  console.log('Sheet created:', sheet.getId());
  console.log('URL:', sheet.getUrl());
  return sheet.getId();
}

/**
 * For testing - manual trigger
 */
function testSubmit() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-0199',
    business: 'Test Business',
    website: 'testbusiness.com',
    challenge: 'Not showing up on Google'
  };
  
  saveLead(testData);
  sendNotificationEmail(testData);
  sendConfirmationEmail(testData);
  
  console.log('Test completed!');
}
