import {pase,v4 as uuidv4} from "uuid"
import Loading from "../layout/Loading"
import Container from "../layout/Container"
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../services/ServicesForm.";
import ServiceCard from "../services/ServiceCard";
import styles from "../styles/ProjectEdit.module.css"
import stylesContainer from "../styles/Container.module.css";
import servicestyle from "../styles/ServiceCard.module.css"
import Message from "../layout/Message";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ProjectEdit(){

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [services, setServices] = useState([])
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
            setServices(data.services)
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

    function removeService(id, banks){
        const updatedServices = project.services.filter( (service) => service.id !== id);
        const projectUpdate = project
        projectUpdate.services = updatedServices
        projectUpdate.banks = parseFloat(projectUpdate.banks) - parseFloat(banks)

            fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectUpdate)
            })
            .then(resp => resp.json())
            .then((data) => {
                    setProject(projectUpdate)
                    setServices(updatedServices)
                    setMessage('Serviço removido com sucesso');
                    setType('success');
              })
            .catch(error => {
                console.error(error);
                setMessage('Erro ao excluir serviço');
                setType('error');
            });
    }

    function createService(project){
        setMessage()
        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()   
        const lastServiceBanks = lastService.banks
        const newBanks = parseFloat(project.banks) + parseFloat(lastServiceBanks)

        if(newBanks > parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setType("error")
            project.services.pop()
            return false
        }

        project.banks = newBanks
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'PATCH',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp)=> resp.json())
          .then((data)=>{
            console.log(data)
            setMessage("Serviço adicionado com sucesso")
            setType('success')
          })
          .catch((err) => console.log(err))
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
                        <div className={stylesContainer.serviceForm}>
                            {showServiceForm &&(<ServiceForm  
                                    handleSubmit={createService}
                                    btnText={"Adicionar serviço"}
                                    projectData={project}
                                />
                            )}
                        </div>
                    </div>
                    <h2>
                        Serviços
                    </h2>
                </Container>
                <nav className={servicestyle.servicecard}>
                        {services.length > 0 &&
                            services.map((service) =>(
                                <ServiceCard 
                                    id={service.id}
                                    name={service.name}
                                    banks={service.banks}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))
                        }{services.length == 0 &&
                            <p>
                                Não há serviços cadastrados
                            </p>
                        }
                </nav>
            </div>
        ) :(
          <Loading />
        )}  

      </>
    )
}
export default ProjectEdit