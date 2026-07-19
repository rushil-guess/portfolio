import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_l5c55bq";
const TEMPLATE_ID = "template_grqosmu";
const PUBLIC_KEY = "0j4v35CkKDMA3XdO8";

export async function sendEmail(form) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
    },
    PUBLIC_KEY
  );
}