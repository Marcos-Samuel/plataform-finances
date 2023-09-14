import { useEffect, useState } from "react";
import api from '../../services/base';
import { getItem } from "../../utils/storage";
import './style.css';
import filtro from '../../assets/filtro.png'
import useUser from "../../hooks/useUser";


export default function FilterTransation() {

    const { queryString, setQueryString } = useUser();

    const [selectedFilters, setSelectedFilters] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const token = getItem('@dindin:token');
            try {
                const response = await api.get('/categoria', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setCategories(response.data);

            } catch (err) {
                setError("There was an error connecting to the server. Please check your network connection and try again.");
            }
        }

        fetchCategories();
    }, []);

    const handleFilter = (e) => {
        e.preventDefault();
        const item = e.target.value;

        const updatedFilters = [...selectedFilters];
        const filterIndex = updatedFilters.indexOf(item);

        if (filterIndex !== -1) {
            updatedFilters.splice(filterIndex, 1);
        } else {
            updatedFilters.push(item);
        }

        setSelectedFilters(updatedFilters);
    };

    const handleQueryString = (e) => {
        e.preventDefault();

        let query = "";
        if (selectedFilters.length > 0) {
            query = "?" + selectedFilters.join("&");
        }
        setQueryString(query);
    };

    return (
        <div>
            <div >
            </div>
            <details>
                <summary> <img src={filtro} alt="filtro" /> <span>Filtrar</span>  </summary>
                <form className="form-filter" >


                    <h3>Categoria</h3>
                    <div className="container-button-filter">
                        {categories.map((item) => (
                            <button
                                className={`filter-button ${selectedFilters.includes(`filtro[]=${item.descricao}`) ? 'selected' : ''}`}
                                key={item.id}
                                onClick={handleFilter}
                                value={`filtro[]=${item.descricao}`}
                                type="submit"
                            >
                                {`${item.descricao} +`}
                            </button>
                        ))}
                    </div>


                    <div className="container-aplication-button">
                        <button
                            className="aplication-button"
                            type="button"
                            onClick={() => {
                                setQueryString('');
                                setSelectedFilters('');
                            }}>
                            Limpar Filtros
                        </button>
                        <button
                            className={`aplication-button ${queryString ? 'selected' : ''}`}
                            onClick={handleQueryString} >
                            Aplicar Filtros
                        </button>
                    </div>

                </form>
            </details>
        </div>
    )
}