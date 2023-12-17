import styles from "../styles/ProjectCard.module.css"
import { FaTrashAlt } from 'react-icons/fa';

function ServiceCard({id, name, banks, description, handleRemove}){

    const remove = (e) => {
        handleRemove(id, banks); 
    }
    return(
        <div className={styles.projectcard}>
            <h4>{name}</h4>
            <p><span>Descrição: </span>{description}</p>
                <p><span>Custo total: </span>{banks}</p>
            <div className={styles.projectcardactions}>
                <button onClick={remove}>
                    <FaTrashAlt />
                    Excluir
                </button>
            </div>
        </div> 
    )
}

export default ServiceCard