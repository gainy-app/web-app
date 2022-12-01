import styles from './privacy.module.scss';
import { Button } from '../../common/Button';
import { useFormContext } from '../../../contexts/FormContext';

export const PrivacyPolicyForm = () => {
  const { next } = useFormContext();
  return (
    <>
      <div className={styles.privacyWrapper}>
        <h1>Gainy Privacy Policy</h1>
        <p>DriveWealth’s Terms of Use</p>
        <p>At Gainy Inc., we take privacy and security seriously. This Privacy Policy outlines how Gainy, Inc., a Delaware corporation with its mailing address 773 Vista Tulocay Ln, Unit 215, Napa, CA, 94559, USA company file number 5045873 and its affiliates (collectively, the “Company,” “Gainy,” “we,” “our,” or “us”) process the information we collect about you through our websites, mobile apps, and other online services (collectively, the “Services”) and when you otherwise interact with us, such as through our customer service channels.</p>
        <h2>I. TYPES OF INFORMATION COLLECTED AND HOW WE COLLECT THEM</h2>
        <p>Personal Information You Provide:

          We may collect the following personal information you provide when you use our Services, like when you sign up for an account, request a transaction, enroll in a promotion or program, or otherwise engage or communicate with us:
          ‍
          1. Identity Data includes your full name, date of birth, gender and other data on government-issued identification documents.

          2. Contact Data includes your email address.

          3. Profile Data includes your job title, investment approach, investment amount and your interests, preferences, feedback, and survey responses.</p>
        <p>Personal Information You Provide:

          We may collect the following personal information you provide when you use our Services, like when you sign up for an account, request a transaction, enroll in a promotion or program, or otherwise engage or communicate with us:
          ‍
          1. Identity Data includes your full name, date of birth, gender and other data on government-issued identification documents.

          2. Contact Data includes your email address.

          3. Profile Data includes your job title, investment approach, investment amount and your interests, preferences, feedback, and survey responses.</p>
        <p>Personal Information You Provide:

          We may collect the following personal information you provide when you use our Services, like when you sign up for an account, request a transaction, enroll in a promotion or program, or otherwise engage or communicate with us:
          ‍
          1. Identity Data includes your full name, date of birth, gender and other data on government-issued identification documents.

          2. Contact Data includes your email address.

          3. Profile Data includes your job title, investment approach, investment amount and your interests, preferences, feedback, and survey responses.</p>
        <div className={styles.acceptBlock}>
          <Button onClick={next}>I accept</Button>
          <p>We use cookies to provide you with the best experience and show you relevant information. Learn more</p>
        </div>
      </div>
    </>
  );
};