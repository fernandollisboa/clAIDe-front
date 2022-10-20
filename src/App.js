import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle.js";
import Home from "./pages/Home";

function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
