/**
 * Sidecar Backend - Google Apps Script
 * Handles form submissions from landing page
 */

// CONFIG - Change these
const CONFIG = {
  SHEET_ID: 'YOUR_SHEET_ID_HERE',  // Paste your Sheet ID here
  EMAIL_TO: 'your-email@example.com',  // Your email
  EMAIL_FROM: 'Sidecar <noreply@sidecarhq.com>'
};

/**
 * Main function - receives form submission
 * Deploy as Web App with 'Anyone' access
 */
function doPost(e) {
  try {
    console.log('Received request:', e);
    console.log('Post data:', e.postData);
    console.log('Contents:', e.postData ? e.postData.contents : 'none');
    
    let data;
    
    // Try to parse JSON
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      // If not JSON, try form data
      data = e.parameter;
    }
    
    console.log('Parsed data:', data);
    
    // 1. Save to Google Sheet
    const lead = saveLead(data);
    
    // 2. Send notification to you
    sendNotificationEmail(data);
    
    // 3. Send confirmation to lead
    sendConfirmationEmail(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, leadId: lead.id}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Save lead to Google Sheet
 */
function saveLead(data) {
  console.log('Saving lead:', data);
  
  try {
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
    
    // Extract data fields (handle both formats)
    const name = data.name || 'Unknown';
    const email = data.email || 'no-email@example.com';
    const phone = data.phone || '';
    const business = data.business || '';
    const website = data.website || '';
    const challenge = data.challenge || '';
    
    // Add row
    leadsSheet.appendRow([
      id,
      timestamp,
      name,
      email,
      phone,
      business,
      website,
      challenge,
      'New Lead'
    ]);
    
    console.log('Lead saved:', id);
    
    return {
      id: id,
      timestamp: timestamp,
      name: name,
      email: email
    };
    
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
}

/**
 * Send notification email to YOU
 */
function sendNotificationEmail(data) {
  try {
    const subject = `🎯 New Lead: ${data.business || 'Unknown Business'}`;
    const body = `
New free audit request:

Name: ${data.name || 'N/A'}
Email: ${data.email || 'N/A'}
Phone: ${data.phone || 'N/A'}
Business: ${data.business || 'N/A'}
Website: ${data.website || 'N/A'}
Challenge: ${data.challenge || 'N/A'}

Time: ${new Date().toLocaleString()}

View in Sheet: https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}
    `;
    
    GmailApp.sendEmail(CONFIG.EMAIL_TO, subject, body);
    console.log('Notification sent to:', CONFIG.EMAIL_TO);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

/**
 * Send confirmation email to LEAD
 */
function sendConfirmationEmail(data) {
  try {
    const subject = `${data.name || 'Hey'}, your audit is generating...`;
    const body = `
Hey ${data.name || 'there'},

Thanks for requesting a free website audit for ${data.business || 'your business'}.

Your audit is being generated right now and will arrive in your inbox within 5-10 minutes.

WHAT TO EXPECT:
• Your current online score (out of 100)
• What's working well
• 3 opportunities to improve
• 90-day growth forecast

QUESTIONS? Just reply to this email.

— Martin
Sidecar: Your growth co-pilot
    `;
    
    if (data.email) {
      GmailApp.sendEmail(data.email, subject, body, {
        name: 'Martin from Sidecar',
        replyTo: CONFIG.EMAIL_TO
      });
      console.log('Confirmation sent to:', data.email);
    }
  } catch (error) {
    console.error('Error sending confirmation:', error);
  }
}

/**
 * Test function - run this to verify everything works
 */
function testSetup() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-0199',
    business: 'Test Business',
    website: 'testbusiness.com',
    challenge: 'Not showing up on Google'
  };
  
  console.log('Testing with data:', testData);
  
  try {
    const lead = saveLead(testData);
    sendNotificationEmail(testData);
    sendConfirmationEmail(testData);
    console.log('Test completed successfully! Lead ID:', lead.id);
  } catch (error) {
    console.error('Test failed:', error);
  }
}
