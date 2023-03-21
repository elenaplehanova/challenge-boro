import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import "./App.css";
import ApiService from "./services/api.service";

function App() {
    const [catalog, setCatalog] = useState();

    useEffect(() => {
        ApiService.getCards().then((data) => {
            setCatalog([...data.splice(0, 15)]);
        });
    }, []);

    return (
        <div className="app">
            <header className="app-header">Challenge Boro</header>
            <main className="app-main">
                {catalog &&
                    catalog.map((item) => {
                        return <Card key={item.image} card={item}></Card>;
                    })}
            </main>
            <footer className="app-footer">created by Elena Ivanova 2023</footer>
        </div>
    );
}

export default App;
