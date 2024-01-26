import path from "node:path";

import nodemailer, { Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";

import { configs } from "../configs";
import { emailTemplates } from "../constants/email.constants";
import { EEmailActions } from "../enums";

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: configs.SMTP_USER,
        pass: configs.SMTP_PASS,
      },
    });

    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
        partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
      },
      viewPath: path.join(process.cwd(), "src", "templates", "views"),
      extName: ".hbs",
    };

    this.transporter.use("compile", hbs(hbsOptions));
  }

  public async sendMail(
    email: string | string[],
    emailAction: EEmailActions,
    context: Record<string, string | number>,
  ) {
    const { templateName, subject } = emailTemplates[emailAction];
    const mailOptions = {
      to: email,
      subject,
      template: templateName,
      context,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
