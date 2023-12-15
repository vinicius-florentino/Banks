import Loading from "../layout/Loading"
import Container from "../layout/Container"
import ProjectForm from "../project/ProjectForm";
import styles from "../styles/ProjectEdit.module.css"
import stylesContainer from "../styles/Container.module.css";
import Message from "../layout/Message";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function ProjectEdit(){

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
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
    
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function editProject(project){

        setMessage('')

        if(project.budget < project.banks){
            setMessage("Orçamento menor que o custo do projeto")
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        }).then(resp => resp.json())
          .then((data)=>{

            setProject(data)
            setShowProjectForm(!setShowProjectForm)
            setMessage("Projeto atualizado com sucesso")
            setType('success')
          })
          .catch(err => console.log(err))
    }

    return( 
        <>
        {project.name ? (
            <div className={`${stylesContainer.minH} ${styles.projectdetails}`} >
                <Container customClasse="column">
                    {message && <Message type={type} msg={message} />}
                    <div>
                        <div className={stylesContainer.projectEditdetails}>
                            <div className={styles.detailscontainer}>
                                <h1>{project.name}</h1>
                                <button onClick={toggleProjectForm} className={styles.btn}>
                                    {showProjectForm ? 'Fechar projeto':'Editar projeto' }
                                </button>
                            </div>
                        </div>
                        {!showProjectForm
                            ?(
                                <div>
                                    <p> <span>Categoria: </span> {project.category.name} </p>
                                    <p> <span>Total do orçamento: </span> R${project.budget} </p>
                                    <p> <span>Total utiliazdo: </span> R${project.banks} </p>
                                </div>
                            )
                            :(
                                <div>
                                    <ProjectForm 
                                        handleSubmit={editProject}
                                        btnText="Concluir edição" 
                                        projectData={project} />
                                </div>
                            )
                        }
                    </div>
                    <div className={styles.serviceformcontainer}>
                        <nav>
                            <h2>
                                Adicione um serviço
                            </h2>
                            <button onClick={toggleServiceForm} className={styles.btn}>
                                {showServiceForm ? 'Fechar serviços': 'Adicionar serviço' }
                            </button>
                        </nav>
                        <div>
                            {showServiceForm &&(
                                <div className={stylesContainer.projectEditdetails}>
                                    Formulário do serviço
                                </div>
                            )}
                        </div>
                    </div>
                    <h2>
                        Serviços
                    </h2>
                    <Container customClasse="start">
                        <p>
                            Itens de serviços
                        </p>
                    </Container>
                </Container>    
            </div>
        ) :(
          <Loading />
        )}  

      </>
    )
}
export default ProjectEdit