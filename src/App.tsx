import { Footer, Nav } from "./components/Chrome";
import { useRoute } from "./router";
import Home from "./pages/Home";
import PageView from "./pages/PageView";
import Contact from "./pages/Contact";
import { EbayCalculator, GstCalculator, MarginCalculator, ToolsIndex } from "./pages/Tools";
import { AnimatePresence, motion } from "framer-motion";

function View({ route }: { route: string }) {
  switch (route) {
    case "/":
      return <Home />;
    case "/contact-us":
      return <Contact />;
    case "/tools":
      return <ToolsIndex />;
    case "/gst-calculator":
      return <GstCalculator />;
    case "/margin-calculator":
      return <MarginCalculator />;
    case "/ebay-fee-calculator":
      return <EbayCalculator />;
    default:
      return <PageView route={route} />;
  }
}

export default function App() {
  const route = useRoute();
  return (
    <div className="min-h-[100dvh]">
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={route}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <View route={route} />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
