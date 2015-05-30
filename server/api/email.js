var path           = require('path'),
    Config         = require('../config'),
    MandrillApi    = require('mandrill-api/mandrill'),
    Mandrill       = new MandrillApi.Mandrill(Config.SLUICE_MANDRILL_API_KEY),
    EmailApi       = {};

/**
 * Send an email to the address configured as the sales notification endpoint.
 * 
 * ```
 * {
 *  "paymentId": "...",
 *  "transaction": {},  // @see https://developer.paypal.com/docs/api/#execute-an-approved-paypal-payment
 *  "payer": {},        // @see https://developer.paypal.com/docs/api/#execute-an-approved-paypal-payment
 *  "cart": {},
 *  "coupons": {}
 * }
 * ```
 * 
 * @param {Object} content The content of the email.
 */
EmailApi.sendSellerNotification = function (content) {
  var msg     = getDefaultMessage(),
      options = {},
      template_name,
      template_content;

  template_name    = 'seller-notification';
  template_content =  [
                        {
                          name: 'paymentId',
                          content: content.paymentId
                        },
                        {
                          name: 'transaction',
                          content: JSON.stringify(content.transaction, null, '\t')
                        },
                        {
                          name: 'payer',
                          content: JSON.stringify(content.payer, null, '\t')
                        },
                        {
                          name: 'cart',
                          content: JSON.stringify(content.cart, null, '\t')
                        },
                        {
                          name: 'coupons',
                          content: JSON.stringify(content.coupons, null, '\t')
                        }
                      ];

  msg.subject     = 'SluiceGear.com Sale Notification';
  msg.from_email  = Config.SLUICE_SELLER_NOTIFICATION_EMAIL;
  msg.from_name   = Config.SLUICE_SELLER_NOTIFICATION_EMAIL;
  msg.to[0].email = Config.SLUICE_SELLER_NOTIFICATION_EMAIL;
  msg.to[0].name  = Config.SLUICE_SELLER_NOTIFICATION_EMAIL;

  options.template_name    = template_name;
  options.template_content = template_content;
  options.message          = msg;
  options.async            = false;
  options.ip_pool          = false;
  options.send_at          = false;

  Mandrill.messages.sendTemplate(options, function (result) {
    console.log('Successfully sent email via Mandrill');
  }, function (err) {
    console.log(JSON.stringify(err));
  });
};

function getDefaultMessage() {
  return {
    'html':                 '',
    'text':                 '',
    'subject':              '',
    'from_email':           '',
    'from_name':            '',
    'to':                   [{
                              'email': '',
                              'name':  '',
                              'type':  'to'
                            }],
    'headers':              {},
    'important':            false,
    'track_opens':          null,
    'track_clicks':         null,
    'auto_text':            null,
    'auto_html':            null,
    'inline_css':           null,
    'url_strip_qs':         null,
    'preserve_recipients':  null,
    'view_content_link':    null,
    'bcc_address':          null,
    'tracking_domain':      null,
    'signing_domain':       null,
    'return_path_domain':   null,
    'merge':                true,
    'merge_language':       'mailchimp',
    'global_merge_vars':    [],
    'merge_vars':           [],
    'tags':                 [],
    'metadata':             {},
    'recipient_metadata':   [],
    'attachments':          [],
    'images':               []
  };
}

module.exports = EmailApi;