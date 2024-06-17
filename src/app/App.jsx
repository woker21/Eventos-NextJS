import Router from "./app/Router";
import Eventos from "./components/Eventos";
import UserProvider from "./components/UserProvider";

const App = () =>
    <UserProvider><Router />
    <Eventos/>
    </UserProvider>

export default App;