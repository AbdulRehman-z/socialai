import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

const OTPEmail = ({ email, otpCode }: { email: string, otpCode: string }) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your verification OTP: {otpCode}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Verification OTP
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                {email} use this OTP to complete your verification
              </Text>
            </Section>

            {/* OTP Code Display */}
            <Section className="text-center mb-[32px]">
              <div className="bg-gray-50 border-[2px] border-dashed border-gray-300 rounded-[12px] py-[24px] px-[16px] mb-[16px]">
                <Text className="text-[36px] font-bold text-gray-900 m-0 letter-spacing-[8px] font-mono">
                  {otpCode}
                </Text>
              </div>
              <Text className="text-[14px] text-gray-500 m-0">
                This code will expire in 5 minutes
              </Text>
            </Section>

            {/* Instructions */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 m-0 mb-[16px]">
                Enter this 6-digit code in the OTP field to continue. If you didn't request this code, please ignore this email.
              </Text>
              <Text className="text-[14px] text-gray-500 m-0">
                For security reasons, never share this code with anyone.
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="bg-blue-50 border-l-[4px] border-solid border-blue-400 p-[16px] rounded-r-[4px] mb-[32px]">
              <Text className="text-[14px] text-blue-800 m-0 font-medium">
                🔒 Security Tip: We will never ask for your verification code via phone or email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t-[1px] border-solid border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                This email was sent to yousafbhaikhan10@gmail.com
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                123 Security Street, Tech City, TC 12345
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                © 2025 Your Company. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OTPEmail;
