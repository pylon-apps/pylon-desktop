import "./App.css";
import {ChakraProvider} from "@chakra-ui/react";

function App() {
    return (
        <ChakraProvider>
            <h1 style={{textAlign: "center"}}>Hello world</h1>
        </ChakraProvider>
    );
}

export default App;
