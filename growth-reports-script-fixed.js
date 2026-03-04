const SHEET_ID = '1tUHHb9kFmsYvgZ8JiJvhdrWHt5RCwvcAvNtCKZq6F64';
const CLIENTS_TAB = 'Clients';
const METRICS_TAB = 'Monthly Metrics';

// ADD YOUR API KEY HERE:
const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';
const SENDER_EMAIL = 'sidecareports@gmail.com';
const SENDER_NAME = 'Martin from Sidecar';

function collectMonthlyMetrics() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const clientsSheet = ss.getSheetByName(CLIENTS_TAB);
  const metricsSheet = ss.getSheetByName(METRICS_TAB);
  const clients = getClients(clientsSheet);
  
  clients.forEach(client => {
    try {
      const metrics = generateMockMetrics();
      writeMetrics(metricsSheet, client, metrics);
      const report = generateAIReport(client.name, metrics);
      saveReportToSheet(client, metrics.month, report);
      sendReportEmail(client, report);
      Logger.log('✓ ' + client.name + ': Report sent');
    } catch (error) {
      Logger.log('✗ ' + client.name + ': ' + error.message);
    }
  });
}

function getClients(sheet) {
  const data = sheet.getDataRange().getValues();
  const clients = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const name = row[0];
    const gaId = row[3];
    const email = row[5];
    if (name && email && gaId) {
      clients.push({ name: name, email: email, gaPropertyId: gaId });
    }
  }
  return clients;
}

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

function writeMetrics(sheet, client, metrics) {
  const monthStr = Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM');
  const existingData = sheet.getDataRange().getValues();
  for (let i = 1; i < existingData.length; i++) {
    if (existingData[i][0] === client.name && existingData[i][1] === monthStr) {
      sheet.getRange(i + 1, 3, 1, 4).setValues([[metrics.visitors, metrics.searches, metrics.reviews, metrics.rating]]);
      return;
    }
  }
  sheet.appendRow([client.name, monthStr, metrics.visitors, metrics.searches, metrics.reviews, metrics.rating, '', '', '']);
}

function generateAIReport(clientName, metrics) {
  const prompt = buildPrompt(clientName, metrics);
  const response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + OPENAI_API_KEY,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: prompt}],
      temperature: 0.6,
      max_tokens: 250
    })
  });
  const result = JSON.parse(response.getContentText());
  return result.choices[0].message.content;
}

function buildPrompt(clientName, metrics) {
  return `Write a quick monthly update for ${clientName}. THEIR NUMBERS: - ${metrics.visitors} website visitors - ${metrics.searches} Google searches found them - ${metrics.rating} stars (${metrics.reviews} new reviews) FORMAT: THE SCOREBOARD • [one line with number and simple comparison] • [one line with number] • [one line celebrating a win] WHAT'S WORKING [One sentence saying what improved and why it matters.] NEXT MOVES [One sentence saying one thing to fix.] [One sentence ending with: "Hit reply if you want me to [do the thing for them]."] RULES: - 120 words MAXIMUM - Write like you're texting a buddy - NO jargon: no SEO, ranking, optimization, keywords - Use simple words: "found you on Google" - Never say "consider" or "think about" - Ending must be: "Hit reply if you want me to [specific task]."`;
}

function saveReportToSheet(client, month, reportText) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let reportsSheet = ss.getSheetByName('Reports');
  if (!reportsSheet) {
    reportsSheet = ss.insertSheet('Reports');
    reportsSheet.appendRow(['Timestamp', 'Client', 'Month', 'Report Text', 'Status']);
  }
  reportsSheet.appendRow([new Date(), client.name, month, reportText, 'Sent']);
}

function sendReportEmail(client, reportText) {
  const subject = 'Your ' + getMonthName() + ' Growth Report — Sidecar';
  const htmlBody = buildEmailHtml(client, reportText);
  MailApp.sendEmail({
    to: client.email,
    subject: subject,
    htmlBody: htmlBody,
    name: SENDER_NAME,
    replyTo: SENDER_EMAIL
  });
}

function buildEmailHtml(client, reportText) {
  const firstName = client.name.split(' ')[0];
  const formattedReport = reportText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#FDF6E3;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FDF6E3;">
<tr><td align="center" style="padding:40px 20px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
<tr><td style="padding:30px;background-color:#0D7377;border-radius:8px 8px 0 0;">
<h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;">🛵 Sidecar</h1>
<p style="margin:5px 0 0 0;color:rgba(255,255,255,0.9);font-size:14px;">Your growth co-pilot</p>
</td></tr>
<tr><td style="padding:30px;color:#2C3E50;line-height:1.6;">
<p style="margin-top:0;">Hey ${firstName},</p>
<p>Here's how ${getMonthName()} went:</p>
<div style="background-color:#FDF6E3;padding:20px;border-radius:6px;margin:20px 0;">
${formattedReport}
</div>
<p style="margin-top:30px;color:#95A5A6;font-size:13px;">— Martin<br>Sidecar: Your growth co-pilot</p>
</td></tr>
<tr><td style="padding:20px 30px;background-color:#f8f9fa;border-radius:0 0 8px 8px;border-top:1px solid #e9ecef;">
<p style="margin:0;color:#95A5A6;font-size:12px;text-align:center;">You're receiving this because you're a Sidecar client.<br>Questions? Just hit reply.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function getMonthName() {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[new Date().getMonth()];
}

function setupMonthlyTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'collectMonthlyMetrics') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ScriptApp.newTrigger('collectMonthlyMetrics').timeBased().everyMonths(1).onMonthDay(1).atHour(9).create();
  Logger.log('✓ Monthly trigger created');
}

function testWithMockData() {
  Logger.log('Testing...');
  collectMonthlyMetrics();
  Logger.log('Done! Check your email and Reports tab.');
}

function testEmailOnly() {
  const testClient = { name: 'Test Business', email: Session.getActiveUser().getEmail() };
  const testReport = `THE SCOREBOARD
• 139 people visited your website — up 23%
• 4.3 stars (you got 4 new reviews!)
• Nice work on those reviews!

WHAT'S WORKING
More people are finding you on Google — that means more potential customers calling.

NEXT MOVES
Make sure your phone number is easy to find on your website.
Hit reply if you want me to move your phone number to the top of your homepage.`;
  sendReportEmail(testClient, testReport);
  Logger.log('✓ Test email sent to: ' + testClient.email);
}
