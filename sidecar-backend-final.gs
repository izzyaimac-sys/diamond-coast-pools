/**
 * Sidecar Backend - Google Apps Script
 * Handles form submissions from landing page
 * Updated to handle both JSON and form data
 */

// CONFIG - CHANGE THESE
const CONFIG = {
  SHEET_ID: 'PASTE_YOUR_SHEET_ID_HERE',
  EMAIL_TO: 'your-email@gmail.com'
};

function doPost(e) {
  try {
    console.log('Received request');
    console.log('Parameter:', e.parameter);
    
    let data = {};
    
    // Try form data first (what the iframe sends)
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
      console.log('Using form data:', data);
    } 
    // Try JSON
    else if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
        console.log('Using JSON data');
      } catch (err) {
        console.log('JSON parse failed');
      }
    }
    
    // 1. Save to Google Sheet
    const lead = saveLead(data);
    
    // 2. Send notification to you
    sendNotificationEmail(data);
    
    // 3. Send confirmation to lead
    sendConfirmationEmail(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveLead(data) {
  const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let leadsSheet = sheet.getSheetByName('Leads');
  
  if (!leadsSheet) {
    leadsSheet = sheet.insertSheet('Leads');
    leadsSheet.appendRow([
      'ID', 'Timestamp', 'Name', 'Email', 'Phone', 
      'Business', 'Website', 'Challenge', 'Status'
    ]);
  }
  
  const id = Utilities.getUuid();
  const timestamp = new Date();
  
  const name = data.name || 'Unknown';
  const email = data.email || 'no-email@example.com';
  const phone = data.phone || '';
  const business = data.business || '';
  const website = data.website || '';
  const challenge = data.challenge || '';
  
  leadsSheet.appendRow([
    id, timestamp, name, email, phone,
    business, website, challenge, 'New Lead'
  ]);
  
  return {id: id, name: name, email: email};
}

function sendNotificationEmail(data) {
  const subject = `🎯 New Lead: ${data.business || 'Unknown'}`;
  const body = `
New audit request:

Name: ${data.name || 'N/A'}
Email: ${data.email || 'N/A'}
Phone: ${data.phone || 'N/A'}
Business: ${data.business || 'N/A'}
Website: ${data.website || 'N/A'}
Challenge: ${data.challenge || 'N/A'}

Time: ${new Date().toLocaleString()}
  `;
  
  GmailApp.sendEmail(CONFIG.EMAIL_TO, subject, body);
}

function sendConfirmationEmail(data) {
  if (!data.email) return;
  
  const subject = `${data.name || 'Hey'}, your audit is generating...`;
  const body = `
Hey ${data.name || 'there'},

Thanks for requesting a free website audit for ${data.business || 'your business'}.

Your audit is being generated and will arrive in 5-10 minutes.

— Martin
Sidecar: Your growth co-pilot
  `;
  
  GmailApp.sendEmail(data.email, subject, body, {
    name: 'Martin from Sidecar',
    replyTo: CONFIG.EMAIL_TO
  });
}

function testSetup() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-0199',
    business: 'Test Business',
    website: 'testbusiness.com',
    challenge: 'Not showing up on Google'
  };
  
  console.log('Testing...');
  saveLead(testData);
  sendNotificationEmail(testData);
  sendConfirmationEmail(testData);
  console.log('Test complete!');
}
