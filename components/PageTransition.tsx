import { AnimatePresence } from "framer-motion";
import * as React from "react";

type Props = {
  children: React.ReactNode;
};

const PageTransition = (props: Props) => {
  const { children } = props;
  return <AnimatePresence>{children}</AnimatePresence>;
};

export default PageTransition;
