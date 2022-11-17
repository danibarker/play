import logo from "./logo.svg";
import "./App.css";
import FirebaseProvider from "./FirebaseProvider";
import TheRoutes from "./Routes";
import AuthProvider from "./AuthProvider";

function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <TheRoutes />
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;
