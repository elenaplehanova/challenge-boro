import React from "react";
import "./Sorting.css";
import { useDispatch, useSelector } from "react-redux";
import { filterCatalogByField, setNewPackOfCards } from "../../store/reducers/CatalogSlice";

const Sorting = () => {
    let dispatch = useDispatch();
    const { pageNumber, numberOfCardsPerPage } = useSelector((state) => state.paginationReducer);

    const filter = (e) => {
        const { value } = e.target;
        dispatch(filterCatalogByField({ field: value }));
        dispatch(setNewPackOfCards({ pageNumber, numberOfCardsPerPage }));
    };

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
                            onClick={filter}
                        />
                        <label htmlFor="category">category</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="timestamp"
                            name="sorting"
                            value="timestamp"
                            onClick={filter}
                        />
                        <label htmlFor="timestamp">date</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="image"
                            name="sorting"
                            value="image"
                            onClick={filter}
                        />
                        <label htmlFor="image">file name</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="filesize"
                            name="sorting"
                            value="filesize"
                            onClick={filter}
                        />
                        <label htmlFor="filesize">filesize</label>
                    </div>
                </div>
            </fieldset>
        </form>
    );
};

export default Sorting;
