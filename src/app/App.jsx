
import Eventos from "../components/Eventos";
import UserProvider from "../components/UserProvider";

const App = () =>
    <UserProvider>
        <Eventos />
    </UserProvider>

export default App;