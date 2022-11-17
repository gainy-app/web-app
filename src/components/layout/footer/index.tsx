interface Props {
    footerClassName: string
}

export const Footer = ({footerClassName}: Props) => {
  return (
    <footer className={footerClassName}>
            © 2021 Gainy, Inc.
    </footer>
  );
};
