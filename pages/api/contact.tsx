import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { Config } from '../../config'

type Data = {
  send: Boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { mail, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: Config.contact.host,
    port: Config.contact.port,
    secure: true,
    auth: {
      user: Config.contact.user,
      pass: Config.contact.pass
    },
  });

  transporter.sendMail({
    from: 'jens@jery.be',
    to: 'info@move-langemark.be',
    subject: `Nieuw bericht van ${mail}`,
    html: `<p>Email: ${mail}<br>Telefoon: ${phone ?? "geen"}<br>Bericht: ${message}</p>`
  }, (err) => {
    if (err) {
      res.status(500).json({ send: false });
    } else {
      res.status(200).json({ send: true });
    };
  });
};