export const config = (country?: string) => ({
  title: 'Where are you based?',
  subtitle: 'The terms of service that apply to you will depend on your country of residence.',
  description: 'By pressing Continue, you agree to our <a href="https://www.gainy.app/terms-of-service" target={"_blank"} rel="noreferrer">Terms & Conditions</a>  and <a href="https://www.gainy.app/privacy-policy" target={"_blank"} rel="noreferrer">Privacy Policy.</a>  Your data will be securely collected by DriveWealth',
  notAvailable: {
    title: `Unfortunately, we don't work in ${country} yet.`,
    subtitle: 'But we are actively working on it!'
  }
}) ;