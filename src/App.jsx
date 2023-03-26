import { useEffect, useState } from "react";
import CardGallery from "./components/CardGallery/CardGallery";
import Tree from "./components/Tree/Tree";
import ApiService from "./services/api.service";
import { useDispatch } from "react-redux";
import { fillCatalog } from "./store/reducers/CatalogSlice";
import Loader from "./components/Loader/Loader";
import "./App.css";

function App() {
    const dispatch = useDispatch();

    const [selected, setSelected] = useState("card-gallery");
    const selectedChange = (e) => {
        setSelected(e.target.value);
    };

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let isFirstMounting = true;
        setIsLoading(true);
        ApiService.getCards().then((data) => {
            if (isFirstMounting) {
                dispatch(fillCatalog({ catalog: data }));
                setIsLoading(false);
            }
        });

        return () => (isFirstMounting = false);
    }, []);

    return (
        <div className="app">
            <header className="app-header">Challenge Boro</header>
            <main className="app-main">
                {isLoading ? (
                    <div className="loader-container">
                        <Loader></Loader>
                    </div>
                ) : (
                    <>
                        <form className="form-toggle-view">
                            <fieldset>
                                <legend>Please select your preferred view</legend>
                                <div className="radio-container">
                                    <div>
                                        <input
                                            type="radio"
                                            id="card-gallery"
                                            name="toggle"
                                            value="card-gallery"
                                            checked={selected === "card-gallery"}
                                            onChange={selectedChange}
                                        />
                                        <label htmlFor="card-gallery">Card gallery</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="tree"
                                            name="toggle"
                                            value="tree"
                                            checked={selected === "tree"}
                                            onChange={selectedChange}
                                        />
                                        <label htmlFor="tree">Tree</label>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                        {selected === "card-gallery" ? <CardGallery></CardGallery> : <Tree></Tree>}
                    </>
                )}
            </main>
            <footer className="app-footer">created by Elena Ivanova 2023</footer>
        </div>
    );
}

export default App;
