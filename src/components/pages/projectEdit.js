import Loading from "../layout/Loading"
import Container from "../layout/Container"
import styles from "../styles/ProjectEdit.module.css"
import stylesContainer from "../styles/Container.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function ProjectEdit(){

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(true)

    useEffect(()=>{
        setTimeout(() =>{
            fetch(`http://localhost:5000/projects/${id}`,{
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            },
        }).then(resp => resp.json())
        .then((data)=>{
            setProject(data)
        })
        .catch(err => console.log(err))
        }, 500)
    }, [id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    return( 
        <>
        {project.name ? (
            <div className={`${stylesContainer.minH} ${styles.projectdetails}`} >
                <Container customClasse="column">
                    <div>
                        <div className={stylesContainer.projectEditdetails}>
                            <div className={styles.detailscontainer}>
                                <h1>{project.name}</h1>
                                <button onClick={toggleProjectForm} className={styles.btn}>
                                    {showProjectForm 
                                        ? 'Editar projeto'
                                        : 'Fechar projeto'
                                    }
                                </button>
                            </div>
                        </div>
                        {showProjectForm
                            ?(
                                <div>
                                    <p> <span> Categoria: </span> {project.category.name} </p>
                                    <p> <span>Total do orçamento: </span> R${project.budget} </p>
                                    <p> <span>Total utiliazdo: </span> R${project.banks} </p>
                                </div>
                            )
                            :(
                                <div>
                                    <p>
                                        Detalhes do projeto
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </Container>
            </div>
        ) :(
          <Loading />
        )}  

      </>
    )
}
export default ProjectEdit