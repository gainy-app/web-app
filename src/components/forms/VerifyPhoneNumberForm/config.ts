export const config = (number: string) => ({
  title: 'Verify your number',
  subtitle: `We sent a code to <b>(***) (***) ${number.slice(6,-1)}</b>. Enter it here.`,
});