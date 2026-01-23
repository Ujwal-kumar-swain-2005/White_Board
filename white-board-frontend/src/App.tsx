import "./App.css";
import Layout from "./component/Layout";
import Canvas from "./component/Canvas";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="app-root">
        <Layout>
        
          <div className="canvas-wrapper">
            <Canvas />
          </div>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
