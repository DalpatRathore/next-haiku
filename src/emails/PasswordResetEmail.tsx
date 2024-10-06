import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface PasswordResetEmailProps {
  name: string;
  resetCode: string;
}

const baseUrl = process.env.APP_BASE_URL ? `${process.env.APP_BASE_URL}` : "";

const PasswordResetEmail = ({ name, resetCode }: PasswordResetEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Password Reset Request for NextHaiku</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={buttonContainer}>
            <Img
              src={`https://dalpatrathore.vercel.app/logo.png`}
              width="75"
              height="75"
              alt="logo"
            />
          </Section>
          <Heading style={codeTitle}>Hi, {name}</Heading>
          <Heading as="h2" style={codeTitle}>
            Your Password Reset Code
          </Heading>

          <Section style={codeContainer}>
            <Heading style={codeStyle}>{resetCode}</Heading>
          </Section>
          <Text style={paragraph}>(This code is valid for only 1 hour)</Text>
          <Section style={buttonContainer}>
            <Button href={`${baseUrl}/reset-password`} style={button}>
              Reset Password
            </Button>
          </Section>
          <Hr />
          <Text style={codeDescription}>
            We received a request to reset your password. If you did not make
            this request, please ignore this email.
          </Text>
          <Text style={codeDescription}>
            If you&apos;d like to proceed, click the button above and follow the
            instructions to reset your password.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PasswordResetEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  textAlign: "center" as const,
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  borderRadius: "5px",
  marginTop: "20px",
  width: "480px",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "4% 4%",
};

const codeTitle = {
  textAlign: "center" as const,
};

const codeDescription = {
  textAlign: "center" as const,
};

const codeContainer = {
  background: "rgba(0,0,0,.05)",
  borderRadius: "4px",
  margin: "16px auto 14px",
  verticalAlign: "middle",
  width: "280px",
  maxWidth: "100%",
};

const codeStyle = {
  color: "#000",
  display: "inline-block",
  paddingBottom: "8px",
  paddingTop: "8px",
  margin: "0 auto",
  width: "100%",
  textAlign: "center" as const,
  letterSpacing: "8px",
};

const buttonContainer = {
  margin: "27px auto",
  width: "auto",
};

const button = {
  backgroundColor: "#5e6ad2",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  textAlign: "center" as const,
  padding: "12px 24px",
  margin: "0 auto",
};

const paragraph = {
  color: "#444",
  letterSpacing: "0",
  padding: "0 40px",
  margin: "0",
  textAlign: "center" as const,
};
