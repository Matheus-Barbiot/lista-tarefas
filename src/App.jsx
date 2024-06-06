import React, { useState, useRef, useEffect } from 'react'
import './App.css'

class Tarefa {
    constructor(title, feito=false){
        this.title = title
        this.feito = feito
    }
}

function App() {
    const [novaTarefa, setNovaTarefa] = useState('')
    const [listaTarefas, setListaTarefas] = useState([])
    const [mostrar, setMostrar] = useState(false)
    
    const inputText = useRef(null)

    // Criar nova tarefa  =========================
    const criarTarefa = (event) => {
        if(event.key === 'Enter') {
            if(novaTarefa != '') {
                let novaLista = [...listaTarefas, new Tarefa(novaTarefa)]
                setListaTarefas(novaLista)
                setNovaTarefa('')
                setMostrar(false)
            }
        }
        if(event.key === 'Escape') {
            setMostrar(false)
        }
        if(event.key === 'Backspace') {
            if(novaTarefa === '') {
                setMostrar(false)
            }
        }
    }

    const mostrarInput = (mostrar) => {
        if(mostrar){
            return <input type='text' onChange={(event) => setNovaTarefa(event.target.value)} id='name' ref={inputText} onKeyDown={(event) => criarTarefa(event)} placeholder='Adicionar nova tarefa' maxLength='40' minLength='0'/>
        }
    }
    const deletarTarefa = (num) => {
        let novaLista = listaTarefas.filter((_, index) => index !== num)
        setListaTarefas(novaLista)
    } 

    // Mapeamento de tarefas =========================
    const listaHTML = listaTarefas.map(
    (tarefa, num) => {
        return <>
            <li>
                <input type='checkbox' 
                onClick={()=>listaTarefas[num].feito = !listaTarefas[num].feito}
                className='check' 
                />
                <p>{tarefa.title}</p>
                <button onClick={()=>deletarTarefa(num)}>x</button>
            </li>
        </>
    }
    )

    useEffect(()=>{console.table(listaTarefas)})
    return (
        <>
        <div>
            <button onClick={() => setMostrar(true)} id='add'>+</button>
            {mostrarInput(mostrar)}
        </div>
        
        <div>
        <h2>Lista:</h2>

            <ul>
            {listaHTML}
            </ul>
        </div>
        
        </>
    )
}

export default App
