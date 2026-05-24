import { useState , useEffect } from "react"
import darkImg from "/public/img/dark.png"
import lightImg from "/public/img/light.png"
import "./index.css"
/* import "./App.css" */
/* darkMode: 'class', */

function App() {
  const [list, setList] = useState ([{userName:"John", userAge: 20, userGender:"male" },
  {userName:"Anna", userAge: 26, userGender:"female" },
  {userName:"Peter", userAge: 150, userGender:"trans" },
  {userName:"Peter", userAge: 40, userGender:"male" },
  {userName:"Yo", userAge: 150, userGender:"trans" },
  {userName:"Ivan", userAge: 88 , userGender:"male" },
  {userName:"Alice", userAge: 150, userGender:"female" },
  {userName:"Islam", userAge: 2 , userGender:"male" },
  {userName:"Argyn", userAge: 77, userGender:"male" },
  {userName:"Dick", userAge: 35, userGender:"male" }]);

  // Это у нас
  const [filtered, setFiltered] = useState ([...list]); // это у нас для осн массива и то что показывается на экране


 /*  // 1 этап, подключ к html через id или как уже это описать в React  */
 // фильтровка list
  const [searchNameValue, setSearchNameValue] = useState("");  // value везде чтобы они сразу обращались к 
  const [searchAgeValue, setSearchAgeValue] = useState("");
  const [selectGenderValue, setSelectGenderValue] = useState("");
/*   const [resultForm, setResultForm] = useState(""); */
  const [createForm, setCreateForm] = useState(""); // создание
  const [deleteButton, setDeleteButton] = useState(""); // удаление
  // форма добавления 
  const [addNameValue, setAddNameValue] = useState("");
  const [addAgeValue, setAddAgeValue] = useState("");
  const [addGenderValue, setAddGenderValue] = useState("male");
  const [showForm, setShowForm] = useState(false);

  const [checkIncludes, setCheckIncludes] = useState([]);
  const [viewMode, setViewMode] = useState('cards');
  const [darkTheme, setDarkTheme] = useState(false);

    const toggleTheme = () => {
        setDarkTheme(prev => !prev);
    document.documentElement.classList.toggle('dark');
    }; 
/* 
  const handleSearch = () => {
    const secondFiltered = list.filter(person => {
        const matchName = !searchNameValue || person.userName.toLowerCase().includes(searchNameValue.toLowerCase().trim());
        const matchAge = !searchAgeValue || person.userAge == Number(searchAgeValue);
        const matchGender = !selectGenderValue || person.userGender == selectGenderValue;
        return matchName && matchAge && matchGender;
    });

    setFiltered(secondFiltered);
} */

const secondFiltered = (dataToFilter, nameValue = searchNameValue, ageValue = searchAgeValue, genderValue = selectGenderValue ) => {
    return dataToFilter.filter(person => {
        const matchName = !nameValue || person.userName.toLowerCase().includes(nameValue.toLowerCase().trim());
        const matchAge = !ageValue || person.userAge == Number(ageValue);
        const matchGender = !genderValue || person.userGender == genderValue;
        return matchName && matchAge && matchGender;
    });
}

const handleSearch = (nameValue = searchNameValue, ageValue = searchAgeValue, genderValue = selectGenderValue) => {
    setFiltered(secondFiltered(list, nameValue, ageValue, genderValue));
}

const handleAddPerson = (e) => {
    e.preventDefault(); // preventDefault не перезагружает страницу отмен стандартн поведение

    if (!addNameValue || !addAgeValue) return; // не добавляется если пусто

    const newPerson = {
        userName: addNameValue,
        userAge: Number(addAgeValue),
        userGender: addGenderValue
    };
    const newList = [...list, newPerson]; // добавл в список
    setList(newList);
    setFiltered(secondFiltered(newList));

    // очищение формы
    setAddNameValue("");
    setAddAgeValue("");
    setAddGenderValue("male");

    //после
    setShowForm(false); 
}

const handleDelete = (index) => { // удаление 
    const newList = list.filter((_, i) => i !== index); // _,  что это блядь
    setList(newList);
    setFiltered(secondFiltered(newList));
    
}

const handleEdit = (index) => {
    let newName = prompt("Новое имя:", list[index].userName);
    let newAge = prompt("Новый возраст:", list[index].userAge);
    let newGender = prompt("Новый пол", list[index].userGender);

    if (!newName || !newAge || !newGender) return;

    const updated = [...list];
    updated[index]  = {
        userName: newName,
        userAge: Number(newAge),
        userGender: newGender
    }
    setList(updated);
    setFiltered(secondFiltered(updated));

}


const handleDelChk = () => {
    if (checkIncludes.length === 0) { // 
        alert("Нужно выбрать пользователей");
        return;
    }


    const newList = list.filter((_, i) => !checkIncludes.includes(i)); // !checkIncludes.includes(i)) - не в выбранных
    setList(newList); // сохр новый список без удаленных
    setFiltered(secondFiltered(newList)); // обновляется список
    setCheckIncludes([]); // убирает галочки
}

const toggleCheckbox = (index) => { //вкл выкл переключатель
    if (checkIncludes.includes(index)){ //index карточка которую выбрали
        setCheckIncludes(checkIncludes.filter (i => i !== index)); // удаление индекса из массива и создание нового массива
    } else {
        setCheckIncludes([...checkIncludes, index]); // добавляет индекс в массив
    }
}

useEffect(() => {
    const sizeMettr = () => {
        if (document.documentElement.clientWidth < 640 ) {
            setViewMode('cards')};  

        };
        sizeMettr();
        window.addEventListener('resize', sizeMettr );
    return () => {
        window.addEventListener('resize', sizeMettr );
    };
})

/* 
const handleClick  */


/* style={{background: darkTheme ? 'black' : 'white'}} */

/* Тут html */ /* выбрать цвет - вместо белого - bg-white */
  return (
    <div className="min-h-screen  bg-white dark:bg-[#1f1f1f]">
        <div className=" max-w-[1140px] mr-auto ml-auto p-auto bg-white dark:bg-[#1f1f1f]">
            <div id="dark-div" className="fixed z-9999 2xl:right-[375px] 2xl:top-[50px] 2xl:w-[50px] xl:right-[145px] xl:top-[50px] lg:w-[40px] lg:right-[15px] lg:top-[20px] md:w-[40px] md:right-[10px] md:top-[20px] sm:w-[30px] sm:right-[10px] sm:top-[10px] w-[30px] right-[10px] top-[10px]">
                <button id="dark-button"  onClick={toggleTheme}>{darkTheme ? <img src={lightImg} alt=""/> : <img src={darkImg} alt="" /> }</button>
            </div>
            <div className="zagolovok mb-[15px]">
                <h1 className="2xl:text-3xl xl:text-3xl lg:text-3xl md:text-lg sm:text-sm text-xs font-bold  mt-[10px] text-center text-black dark:text-[#E1E3E6]"> {/* <!-- flex items-center justify-center  --> */}
                База данных пользователей 
                </h1>
            </div>
            <div id="show" className=" flex justify-end 2xl:w-[800px] xl:w-[800px] lg:w-[800px] md:w-[400px] sm:w-[70px]  w-[70px] m-auto mb-[15px] ">
                <button onClick={() => setShowForm(!showForm)} /* setShowForm(!showForm)} переключатель */
                className="rounded-full border  p-1.5 w-25  text-black dark:text-[#E1E3E6]  dark:hover:bg-[#4b4679] dark:active:bg-[#4b4679] hover:bg-[#8981d9] active:bg-[#8981d9] transition duration-300 ease-in-out">{showForm ? 'Скрыть' : 'Добавить'}
                </button>
            </div>
            {showForm && (
            <div id="create-add" className="create flex-col 2xl:w-[800px] xl:w-[800px] lg:w-[800px]  md:w-[400px] sm:w-[300px] w-[300px] m-auto mb-[20px] p-[15px] font-medium opacity rounded-r-lg border  border-black dark:border-white drop-shadow-xl"  > {/* <!-- bg-[#a5c8e3] --> */}
                <form className="inpt-form" id="create-form" onSubmit={handleAddPerson}>{/*  //onSubmit именно для form  */}
                    <div className="grid 2xl:grid-rows-1 sm:grid-rows-2  2xl:grid-cols-6 xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-1  mb-[10px]" >
                        <input
                        type="text"
                        name="add-name"
                        placeholder="ФИО"
                        className="add-name 2xl:col-span-5 xl:col-span-5 lg:col-span-5 md:col-span-3 sm:col-span-1 col-span-1 text-center border focus:outline-none  dark:hover:border-[#4b4679] dark:focus:border-[#4b4679]  rounded-full p-1   placeholder-black dark:placeholder-[#E1E3E6]  hover:bg-[#cfcfcf] dark:hover:bg-transparent dark:text-[#E1E3E6] text-black  transition duration-300 ease-in-out sm:mb-[5px] mb-[5px]"
                        id="add-name"
                        value={addNameValue}
                        onChange={(e) => setAddNameValue(e.target.value)}/>
                        <input
                        type="number"
                        name="add-age"
                        placeholder="Возраст"
                        className="add-age col-span-1 border focus:outline-none  dark:hover:border-[#4b4679] dark:active:border-[#4b4679]  text-center rounded-full p-1 placeholder-black dark:placeholder-[#E1E3E6] hover:bg-[#cfcfcf] dark:hover:bg-transparent  dark:text-[#E1E3E6] text-black  transition duration-300 ease-in-out 2xl:ml-[5px] xl:ml-[5px] lg:ml-[5px] md:ml-[5px] sm:ml-[0px]"
                        id="add-age"
                        value={addAgeValue}
                        onChange={(e) => setAddAgeValue(e.target.value)}
                        />
                    </div>
                    <div className="inpt-select mb-[10px]">
                        <label htmlFor="form-gender" className="ml-[5px] dark:text-[#E1E3E6] text-black">Пол</label>
                        <select
                        name="add-gender"
                        id="form-gender"
                        value={addGenderValue}
                        onChange={(e) => setAddGenderValue(e.target.value)}
                        className="add-gender border  rounded-full p-1  hover:bg-[#cfcfcf] dark:hover:bg-[#1f1f1f] dark:bg-[#1f1f1f] dark:hover:border-[#4b4679] dark:active:border-[#4b4679] text-black dark:text-[#E1E3E6]   transition duration-300 ease-in-out ml-10">
                            <option value="male">Мужчины</option>
                            <option value="female">Женщины</option>
                            <option value="trans">Другие</option>
                        </select>    
                    </div>
                    <div className="button-div flex justify-around ">
                        <button className="rounded-full border p-1.5 w-25 dark:text-[#E1E3E6] hover:bg-[#8981d9] transition duration-300 ease-in-out" id="form-button" type="submit">Ввод</button>
                    </div> {/* <!-- type="submit" для отпрв --> */}
                </form>
            </div>
            )}
            <div className="menu-list flex flex-col 2xl:w-[800px] xl:w-[800px] lg:w-[800px] md:w-[400px] sm:w-[300px] w-[300px] m-auto"> {/* <!-- -violet bg-[#9789e2] --> */}
                <div className="grid 2xl:grid-cols-6 xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-5 gap-1  mb-[15px]">
                    <input
                    type="text"
                    id="search-name"
                    placeholder="Поиск по имени"
                    className="2xl:col-span-5  xl:col-span-5 lg:col-span-5 md:col-span-3 dark:text-[#E1E3E6]  border dark:border  dark:border-[#E1E3E6] hover:bg-[#cfcfcf] dark:hover:border-[#4b4679] dark:focus:border-[#4b4679] placeholder-black dark:placeholder-[#E1E3E6] dark:hover:bg-transparent focus:outline-none rounded-sm  transition duration-300 ease-in-out p-[3px]"
                    value={searchNameValue}
                    onChange={(e) => {
                    const newValue = e.target.value;
                        setSearchNameValue(newValue);
                        handleSearch(newValue, searchAgeValue, selectGenderValue);   
                    }}
                    />
                <input
                    type="number"
                    id="search-age"
                    placeholder="По возрасту"
                    className="2xl:col-span-1 xl:col-span-1 lg:col-span-1 md:col-span-2 border dark:text-[#E1E3E6] hover:bg-[#cfcfcf] dark:border-[#E1E3E6] hover:bg-[#cfcfcf] dark:hover:border-[#4b4679] dark:focus:border-[#4b4679] dark:bg-transparent dark:hover:bg-transparent placeholder-black dark:placeholder-[#E1E3E6] focus:outline-none rounded-sm  transition duration-300 ease-in-out  p-[3px]"
                    value={searchAgeValue}
                    /* onChange сбытие инпута остальное функция REACT e объект события */
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setSearchAgeValue(newValue);
                        handleSearch(searchNameValue, newValue, selectGenderValue); 
                    }}
                    />
                </div>
                <div className="flex justify-between mb-[10px] md:mb-[]">
                    <div className="lg:inline md:flex md:flex-col-reverse ">
                        <select
                        name="select-gender"
                        id="select-gender"
                        className="hover:bg-[#cfcfcf] border text-black dark:text-[#E1E3E6] dark:bg-[#1f1f1f] dark:hover:bg-[#4b4679] dark:active:bg-[#4b4679] transition duration-300 ease-in-out rounded-sm p-[5px] mr-[5px] md:mb-[5px]"
                        value={selectGenderValue}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setSelectGenderValue(e.target.value);
                            handleSearch(searchNameValue, searchAgeValue, newValue);   
                    }}>
                            <option value="">Все</option>
                            <option value="male">Мужчины</option>
                            <option value="female">Женщины</option>
                            <option value="trans">Другие</option>
                        </select>
                        <button
                        id="delete-list"
                        type="submit"
                        className="md:mb-[5px] hover:bg-[#cfcfcf] border transition duration-300 ease-in-out rounded-sm bg-[#FCEBEB] hover:bg-[#f2caca] dark:bg-[#9b4444] dark:hover:bg-[#1f1f1f]  text-red-400 p-[5px]"
                        onClick={handleDelChk}
                        >Удалить выбранное</button>
                    </div>
                    <div id="viewListButtons" className="hidden min-[640px]:inline">
                        <button id="viewCard" className={viewMode ==='cards' ? ' p-[5px] m-[5px] rounded-sm  transition duration-300 dark:border dark:focus:border-[#8f87e6] hover:bg-[#4b4679] active:bg-[#4b4679]  bg-[#8981d9] text-[#E1E3E6] ':
                        'p-[5px] m-[5px] rounded-sm  transition duration-300  text-black border hover:bg-[#8981d9]  active:bg-[#8981d9] dark:text-[#E1E3E6]'} onClick={() => setViewMode('cards')}>⊞ Карточки</button>
                        <button id="viewTable" className={viewMode ==='table' ? 'p-[5px] rounded-sm  transition duration-300 dark:border dark:focus:border-[#8f87e6]   hover:bg-[#4b4679] active:bg-[#4b4679] hover:border-[#8f87e6] bg-[#8981d9] text-[#E1E3E6]' : 'p-[5px] rounded-sm  transition duration-300  text-black border hover:bg-[#8981d9]  active:bg-[#8981d9] dark:text-[#E1E3E6]'} onClick={() => setViewMode('table')}>☰ Таблица</button>
                        {/* <button id="viewTable" className={}"p-[5px] rounded-sm  transition duration-300 border dark:text-[#E1E3E6] hover:bg-[#8981d9] active:bg-[#8981d9] dark:bg-[#8981d9] dark:hover:bg-[#4b4679] dark:active:bg-[#4b4679]" onClick={() => setViewMode('table')}>☰ Таблица</button>*/}

                    </div>
                </div>
            </div>
            {viewMode === 'cards' &&  <div>
                <div id="result_card" className="list flex  justify-around "> {/* <!-- bg-[#dbdbf6] border-violet-200 --> */}
                <div id="result_text" className="grid lg:grid-cols-3 lg:gap-4 md:grid-cols-2 md:gap-2 sm:grid-cols-1 sm:gap-1">
                    {filtered.map((person, index) => (
                        <div key={index} className="mb-[10px] p-[10px] border  rounded-r-lg hover:bg-[#e0e0e0] dark:hover:bg-[#1a1414]  transition duration-300 ease-in-out shadow-md dark:border-amber-50"  id="result-card-daddy" >
                        <div className="flex flex-row mt-[5px] " id="result-card-skin">
                            <div id="result-skin-chkbox" className="flex flex-col-reverse justify-between mr-[10px] ml-[10px]">
                                <input
                                    type="checkbox"
                                    id="result-chbbox"
                                    className="delete-select mb-10 accent-[#8981d9]"
                                    value={index}
                                    checked={checkIncludes.includes(index)}
                                    onChange={() => toggleCheckbox(index)}
                                    />
                            </div>
                            <div id="result-skin-data" className="flex flex-col mb-[10px]">
                                <p className="font-medium text-gray-950 dark:text-[#E1E3E6]">
                                    {person.userName}</p>
                                <p className="text-gray-700 dark:text-[#E1E3E6]">
                                    возраст - {person.userAge} 
                                </p>
                                <p className=" font-style: italic dark:text-[#E1E3E6]">
                                    {person.userGender} 
                                </p> 
                            </div> 
                            <span  id="result" /> 
                        </div>
                        <div className="flex flex-row  mb-[10px]">
                            <button onClick={() => handleEdit(index)} className="rounded-full border p-1.5 w-25 dark:text-[#E1E3E6] bg-white dark:bg-[#1f1f1f] hover:bg-[#8981d9] transition duration-300 ease-in-out ml-5 mr-5 w-30">Редактировать</button>
                            <button onClick={() => handleDelete(index)}className="rounded-full border p-1.5 w-25 bg-[#FCEBEB] hover:bg-[#f2caca] dark:bg-[#9b4444] dark:hover:bg-[#1f1f1f]    dark:text-red-550  text-red-400 transition duration-300 ease-in-ou">Удалить</button>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>}
            {viewMode === 'table' &&  <div>{
                <div id="result_table" className="list hidden min-[640px]:flex justify-around flex-col 2xl:w-[980px] xl:w-[980px] lg:w-[980px] md:w-[600px] sm:w-[500px]  m-auto transition duration-500 ">{/*  bg-[#dbdbf6] border-violet-200 */}
                <table className="border border-collapse rounded-r-lg " >
                    <thead className="  bg-[#cfcfcf] dark:bg-[#1a1414] text-black dark:text-[#E1E3E6] ">
                        <th className="pb-8 md:text-sm"></th>
                        <th>Имя</th>
                        <th>Возраст</th>
                        <th >Пол</th>
                        <th colSpan="2">
                            Действия
                        </th>
                    </thead>
                    {filtered.map((person, index) => (
                    <tbody className="[&_td]:pt-[10px] [&_td]:pb-[10px]" >
                        <tr className="hover:bg-[#e0e0e0] dark:hover:bg-[#1a1414] dark:text-[#E1E3E6] dark:border-b border-b  p-10 transition duration-300 ease-in-out">
                            <td>
                                <input
                                    type="checkbox"
                                    id="result-chbbox"
                                    className="delete-select accent-[#8981d9]"
                                    value={index}
                                    checked={checkIncludes.includes(index)}
                                    onChange={() => toggleCheckbox(index)}
                                    />
                            </td>
                            <td className="">{person.userName}</td>
                            <td> возраст - {person.userAge}</td>
                            <td>{person.userGender}</td>
                            <td><button onClick={() => handleEdit(index)} className="rounded-full border p-1.5 w-25 dark:bg-[#1f1f1f] bg-white hover:bg-[#8981d9] transition duration-300 ease-in-out ml-5 mr-5 w-30">Редактировать</button></td>
                            <td><button onClick={() => handleDelete(index)}className="rounded-full border p-1.5 w-25 bg-[#FCEBEB] dark:bg-[#9b4444] hover:bg-[#f2caca] dark:hover:bg-[#1f1f1f] text-red-400 transition duration-300 ease-in-ou">Удалить</button></td>
                        </tr>
                    </tbody>         ))}
                </table>
            </div>
            
            }</div>}
            <footer className="footer h-20" id="footer"></footer>
        </div>
    </div>




   

  );


}
export default App