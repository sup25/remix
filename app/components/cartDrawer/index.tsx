import { motion } from "framer-motion";
import DrawerNav from "./drawerNav";
import { DrawerNavProps } from "./type";
import DrawerBody from "./drawerBody";
import DrawerFooter from "./drawerFooter";

const CartDrawer = ({ onClose }: DrawerNavProps) => {
  const handleBackgroundClick = () => {
    onClose();
  };
  return (
    <motion.div
      id="background"
      className="fixed top-0 left-0 bg-black/50 w-full h-screen z-[9999] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleBackgroundClick}
    >
      <motion.div
        className="bg-white w-[400px] h-screen shadow-lg"
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <DrawerNav onClose={onClose} />
        <DrawerBody />

        <DrawerFooter />
      </motion.div>
    </motion.div>
  );
};

export default CartDrawer;
