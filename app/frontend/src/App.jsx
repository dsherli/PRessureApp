import "./App.css";
import AppRoutes from "./components/AppRoutes";
import Shell from "./components/Shell";

function App() {
  return (
    <div className="App">
      <Shell>
        <AppRoutes />
      </Shell>
    </div>
  );
}

export default App;
