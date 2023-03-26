import React, { useEffect, useState } from "react";
import "./Sorting.css";
import { useDispatch } from "react-redux";
import { filterCatalogByField } from "../../store/reducers/CatalogSlice";

const Sorting = () => {
    let dispatch = useDispatch();
    const [selected, setSelected] = useState("category");

    const selectedChange = (e) => {
        setSelected(e.target.value);
    };

    useEffect(() => {
        dispatch(filterCatalogByField({ field: selected }));
    }, [selected]);

    return (
        <form className="sorting-container">
            <fieldset>
                <legend>Please select your preferred sorting method</legend>
                <div className="radio-container">
                    <div>
                        <input
                            type="radio"
                            id="category"
                            name="sorting"
                            value="category"
                            checked={selected === "category"}
                            onChange={selectedChange}
                        />
                        <label htmlFor="category">category</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="timestamp"
                            name="sorting"
                            value="timestamp"
                            checked={selected === "timestamp"}
                            onChange={selectedChange}
                        />
                        <label htmlFor="timestamp">date</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="image"
                            name="sorting"
                            value="image"
                            checked={selected === "image"}
                            onChange={selectedChange}
                        />
                        <label htmlFor="image">file name</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="filesize"
                            name="sorting"
                            value="filesize"
                            checked={selected === "filesize"}
                            onChange={selectedChange}
                        />
                        <label htmlFor="filesize">file size</label>
                    </div>
                </div>
            </fieldset>
        </form>
    );
};

export default Sorting;
