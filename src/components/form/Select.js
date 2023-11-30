import styles from '../styles/Select.module.css'
function Select({text, name, options, handleOnChange, value}){
    console.log(options);
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name}>
                <option>
                    Selecione uma opção
                </option>
                {Object.values(options).map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )   
}

export default Select