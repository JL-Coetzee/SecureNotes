// /components/FeedbackSection.tsx

import React, { useState } from "react";
import { Card, Textarea, Button } from "@rewind-ui/core";
import { getThemeClasses } from "../theme/themeConfig";
import emailjs from "emailjs-com";

interface FeedbackSectionProps {
  theme: "dark" | "light";
}

const FeedbackSection = ({ theme }: FeedbackSectionProps) => {
  const classes = getThemeClasses(theme);

  // States for form data and feedback
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSuccessMessage("");
    setErrorMessage("");

    emailjs
      .send(
        "service_jh6tskm",
        "template_iddjv9g",
        formData,
        "k3Pxt79l9fUQxemFm"
      )
      .then(() => {
        setSuccessMessage("Your feedback has been sent successfully!");
        setFormData({ from_name: "", from_email: "", message: "" }); // Clear the form
      })
      .catch((error) => {
        console.error("Failed to send feedback:", error);
        setErrorMessage(
          "There was an issue sending your feedback. Please try again."
        );
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section
      id="feedback"
      className={`feedback ${classes.spacing.padding.extraLarge} ${classes.typography.textAlignCenter} ${classes.background} ${classes.text}`}
      aria-labelledby="feedback-heading"
    >
      <h2
        id="feedback-heading"
        className={`${classes.textSizes.heading} ${classes.typography.fontSemibold} ${classes.typography.marginBottom.medium}`}
      >
        Feedback
      </h2>
      <Card
        className={`${classes.background} ${classes.text} ${classes.borderGreen} ${classes.shadow} ${classes.transition} ${classes.spacing.padding.large} ${classes.spacing.rounded.large}`}
        role="form"
        aria-labelledby="feedback-heading"
      >
        <form onSubmit={handleSubmit}>
          <div className={`${classes.typography.marginBottom.medium}`}>
            <label
              htmlFor="from_name"
              className={`text-left ${classes.typography.displayBlock} ${classes.typography.marginBottom.small} ${classes.textSizes.subheading}`}
            >
              Name
            </label>
            <input
              type="text"
              id="from_name"
              name="from_name"
              value={formData.from_name}
              onChange={handleInputChange}
              required
              className={`w-full ${classes.spacing.padding.small} ${classes.spacing.rounded.medium} ${classes.textSizes.body} ${classes.background} ${classes.text} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="Enter your name"
              aria-required="true"
            />
          </div>
          <div className={`${classes.typography.marginBottom.medium}`}>
            <label
              htmlFor="from_email"
              className={`text-left ${classes.typography.displayBlock} ${classes.typography.marginBottom.small} ${classes.textSizes.subheading}`}
            >
              Email
            </label>
            <input
              type="email"
              id="from_email"
              name="from_email"
              value={formData.from_email}
              onChange={handleInputChange}
              required
              className={`w-full ${classes.spacing.padding.small} ${classes.spacing.rounded.medium} ${classes.textSizes.body} ${classes.background} ${classes.text} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="Enter your email"
              aria-required="true"
            />
          </div>
          <div className={`${classes.typography.marginBottom.medium}`}>
            <label
              htmlFor="message"
              className={`text-left ${classes.typography.displayBlock} ${classes.typography.marginBottom.small} ${classes.textSizes.subheading}`}
            >
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Enter your feedback"
              className={`w-full ${classes.spacing.padding.small} ${classes.spacing.rounded.medium} ${classes.textSizes.body} ${classes.background} ${classes.text} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              style={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                color: theme === "dark" ? "#ffffff" : "#000000",
                borderColor: theme === "dark" ? "#4b5563" : "#d1d5db",
              }}
              aria-required="true"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            color="purple"
            disabled={isSending}
            className={`${classes.textSizes.body} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            aria-label="Send Feedback"
          >
            {isSending ? "Sending..." : "Send Feedback"}
          </Button>
          {successMessage && (
            <p
              className={`${classes.typography.marginTop.large} ${classes.textSizes.body} text-green-500`}
              role="alert"
            >
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p
              className={`${classes.typography.marginTop.large} ${classes.textSizes.body} text-red-500`}
              role="alert"
            >
              {errorMessage}
            </p>
          )}
        </form>
      </Card>
    </section>
  );
};

export default FeedbackSection;
