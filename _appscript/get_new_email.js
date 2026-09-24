function checkNewEmails() {
  var threads = GmailApp.getInboxThreads(0, 10); // Get up to 10 inbox Threads emails
  let data = [];
  if (threads.length > 0) {
    threads.forEach(thread => {
      var messages = thread.getMessages();
      messages.forEach(message => {
        if (!message.isUnread()) return;
        var fromEmail = message.getFrom();
        var toEmail = message.getTo();

        // Extract email addresses without '<' and '>'
        var subject = message.getSubject().replace(/^Re:\s*/i, "");
        var from = fromEmail.match(/<([^>]*)>/);
        var to = toEmail.match(/<([^>]*)>/);
        var date = message.getDate();
        from = from ? from[1] : fromEmail;  // If the match fails, return the whole 'from' field
        to = to ? to[1] : toEmail;
        var ticketId = find14CharSequences(subject)[0] ?? 'direct_email';
        var seqType = ticketId !== 'direct_email' ? ticketId.substring(0, 2).toUpperCase() : null;

        const result = {
          ticket_id: ticketId,
          from: from,
          to: to,
          date: date,
          sequence_type: seqType,
          threadId: message.getId(),
          count: parseInt(messages.length)
        };
        data.push(result);
      });
    });
    // Logger.log(data);

    if (data.length > 0) {

      const uniqueEmails = Object.values(
        data.reduce((acc, email) => {
          if (!acc[email.from]) {
            acc[email.from] = email;
          }
          return acc;
        }, {})
      );
      Logger.log('count:' + data.length + ' => ' + JSON.stringify(uniqueEmails, null, 2));

      var url = "https://curtis-css.com/api/get_warranty_unread_email";
      var options = {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(uniqueEmails),
        muteHttpExceptions: true
      };
      var res = UrlFetchApp.fetch(url, options);
      Logger.log("Response Body: " + res.getContentText());
    } else {
      Logger.log("No new email data to send.");
    }
  } else {
    Logger.log("No new emails.");
  }
}

function find14CharSequences(sentence) {
  const regex = /\b(CF|PS|SI|TS)\w{12}\b/gi; // Matches sequences that start with CF or PS and have 14 total characters
  return sentence.match(regex) || [];
}
