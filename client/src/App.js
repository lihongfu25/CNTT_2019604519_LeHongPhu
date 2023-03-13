import routes from "./route";
import { useRoutes } from "react-router-dom";

function App() {
    const appRoutes = useRoutes(routes);
    return <div>{appRoutes}</div>;
}
export default App;
