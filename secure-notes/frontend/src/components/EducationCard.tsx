import { Card } from "@rewind-ui/core";
import { motion } from "framer-motion";
import { getThemeClasses } from "../theme/themeConfig";
import { hoverEffect } from "../theme/animations";

interface EducationCardProps {
  degree: string;
  institution: string;
  years: string;
  theme: "dark" | "light";
}

const EducationCard = ({
  degree,
  institution,
  years,
  theme,
}: EducationCardProps) => {
  const classes = getThemeClasses(theme);

  return (
    <motion.div
      whileHover="hover"
      variants={hoverEffect}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex justify-center"
    >
      <motion.div
        className={`w-full`}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
      >
        <Card
          withDivider={false}
          className={`p-6 min-h-[230px] ${classes.background} ${classes.text} ${classes.borderGreen} ${classes.shadow} ${classes.transition} ${classes.spacing.padding.large} ${classes.spacing.rounded.large}`}
        >
          <motion.h3
            className={`${classes.textSizes.subheading} ${classes.typography.fontBold}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {degree}
          </motion.h3>
          <motion.p
            className={`${classes.textSizes.body} ${classes.typography.marginTop.small}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {institution}
          </motion.p>
          <motion.p
            className={`${classes.textSizes.body} ${classes.typography.marginTop.small} ${classes.mutedText}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {years}
          </motion.p>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default EducationCard;
