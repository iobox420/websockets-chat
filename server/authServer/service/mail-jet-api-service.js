const mailjet = require('node-mailjet');

class MailJetApiService {
  constructor() {
    this.mailjetConnect = mailjet.connect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );
  }
  async sendMail(to, link) {
    return this.mailjetConnect.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'iobox420@gmail.com',
            Name: 'ChatApp',
          },
          To: [
            {
              Email: to,
              Name: to,
            },
          ],
          Subject: 'Activate your account ',
          TextPart: `For activate your account go to link ${link}`,
          HTMLPart: `
                    <div>
                        <h1>For activate your account go to link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
        },
      ],
    });
  }
}

module.exports = new MailJetApiService();
