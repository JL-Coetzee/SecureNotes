import { getThemeClasses } from "../theme/themeConfig";

interface FooterProps {
  theme: "dark" | "light";
}

const Footer = ({ theme }: FooterProps) => {
  const classes = getThemeClasses(theme);

  return (
    <footer
      className={`footer ${classes.spacing.padding.medium} ${classes.typography.textAlignCenter} ${classes.background} ${classes.text}`}
    >
      <p className={`${classes.textSizes.body}`}>
        © 2024 FC Venter. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
