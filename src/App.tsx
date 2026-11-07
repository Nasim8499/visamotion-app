import { Footer, Nav, TabBar } from "./components/Chrome";
import { useRoute } from "./router";
import Home from "./pages/Home";
import PageView from "./pages/PageView";
import Contact from "./pages/Contact";
import { EbayCalculator, GstCalculator, MarginCalculator, ToolsIndex } from "./pages/Tools";

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
    <div className="min-h-[100dvh] pb-tabbar md:pb-0">
      <Nav />
      <main>
        <View route={route} />
      </main>
      <Footer />
      <TabBar />
    </div>
  );
}
