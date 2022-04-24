import React, {useState, useEffect} from 'react';
import todo from "../todoProject/images/todo.svg";
import "./Todo.css";
import plus from "../todoProject/images/plus-solid.svg";
import pentosq from "../todoProject/images/pen-to-square-solid.svg";
import trash from "../todoProject/images/trash.svg";
import reset from "../todoProject/images/reset.svg";
// to get the data from LS

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('plzz fill data');
        } else if(inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
                 setToggleSubmit(true);

                 setInputData('');

                 setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData }
            setItems([...items, allInputData]);
            setInputData('')
        }
    }
    

    
    // delete the items
    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateditems);
    }


    
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);

    }
    

    // remove all 
    const removeAll = () => {
         setItems([]);
    }

    // add data to localStorage
    useEffect(() => {
       localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        <>
        <div className="showItems">
                        <img src={reset} className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}/>
                    </div>
            <div className="main-div">
            
                <div className="child-div">
                     {/* clear all button  */}
                     
    
                    <figure>
                        <img src={todo} alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="✍ Add Items..."
                           value={inputData} 
                           onChange={(e) => setInputData(e.target.value) }
                        />
                        {
                            toggleSubmit ? <img src={plus} className="plus" title="Add Item" onClick={addItem} /> :
                                 <img src={pentosq} className="edit" title="Update Item" onClick={addItem} />
                        }
                       
                    </div>

                    <div className="showItems">
                        
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <img src={pentosq} className="edit" title="Edit Item" onClick={() => editItem(elem.id)} />
                                            <img src={trash} className="trash" title="Delete Item" onClick={() => deleteItem(elem.id)} />
                                        </div>
                                  </div>
                                )
                            })

                        }
                       
                    </div>
                   
                   
                </div>
          </div>  
        </>
    )
}

export default Todo
