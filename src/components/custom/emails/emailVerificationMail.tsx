import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

type EmailVerificationMailProps = {
  userEmail: string;
  verificationUrl: string;
};

const EmailVerificationMail = ({ userEmail, verificationUrl }: EmailVerificationMailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Please verify your email address to complete your registration</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Verify Your Email Address
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We need to verify your email address to complete your account setup
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[16px]">
                Hi there,
              </Text>
              <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[16px]">
                Thank you for signing up! To get started, please verify your email address by clicking the button below:
              </Text>
              <Text className="text-[14px] text-gray-600 m-0 mb-[24px]">
                Email: <strong>{userEmail}</strong>
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={verificationUrl}
                className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border"
              >
                Verify Email Address
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
                If the button above doesn't work, you can copy and paste this link into your browser:
              </Text>
              <Link
                href={verificationUrl}
                className="text-blue-600 text-[14px] break-all"
              >
                {verificationUrl}
              </Link>
            </Section>

            {/* Security Note */}
            <Section className="bg-gray-50 p-[20px] rounded-[8px] mb-[32px]">
              <Text className="text-[14px] text-gray-700 m-0 mb-[8px]">
                <strong>Security Note:</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                This verification link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                Best regards,<br />
                The Support Team
              </Text>
              <Text className="text-[12px] text-gray-400 m-0 mb-[8px]">
                123 Business Street, Suite 100<br />
                City, State 12345
              </Text>
              <Text className="text-[12px] text-gray-400 m-0">
                © {new Date().getFullYear()} Company Name. All rights reserved. |{' '}
                <Link href="#" className="text-gray-400 underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// EmailVerification.PreviewProps = {
//   userEmail: 'yousafbhaikhan10@gmail.com',
//   verificationUrl: 'https://example.com/verify?token=abc123xyz789',
// };

export default EmailVerificationMail;
