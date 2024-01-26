import { EEmailActions } from "../enums";

export const emailTemplates = {
  [EEmailActions.WELCOME]: {
    templateName: "welcome",
    subject: "Welcome to our powerful CRUD platform",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "WE CONTROL YOUR PASSWORD",
  },
};
