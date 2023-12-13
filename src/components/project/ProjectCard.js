import styles from "../styles/ProjectCard.module.css";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

function ProjectCard({id, name, budget, category, handleRemove}){

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={styles.projectcard}>
            <h4>
                {name}
            </h4>
            <p>
                <span>
                    Orçamento:
                </span>
                R${budget}
            </p>
            <p className={styles.categorytext}>
                <span classN    ame={`${styles[category.name.toLowerCase()]}`}>
                </span>
                {category.name}
            </p>
            <div className={styles.projectcardactions}>
                <Link to={`/projectEdit/${id}`}>
                    <FaPencilAlt /> Editar
                </Link>
                <button onClick={remove}>   
                    <FaTrashAlt/> Excluir
                </button>
            </div>
        </div>
    )
}

export default ProjectCard