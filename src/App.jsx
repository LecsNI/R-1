import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './index.css'
/* import './App.css' */

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
  const [searchNameValue, setSearchNameValue] = useState('');  // value везде чтобы они сразу обращались к 
  const [searchAgeValue, setSearchAgeValue] = useState('');
  const [selectGenderValue, setSelectGenderValue] = useState('');
/*   const [resultForm, setResultForm] = useState(''); */
  const [createForm, setCreateForm] = useState(''); // создание
  const [deleteButton, setDeleteButton] = useState(''); // удаление
  // форма добавления 
  const [addNameValue, setAddNameValue] = useState('');
  const [addAgeValue, setAddAgeValue] = useState('');
  const [addGenderValue, setAddGenderValue] = useState('male');
  const [showForm, setShowForm] = useState(false);

  const [checkIncludes, setCheckIncludes] = useState([]);
// чекбоксы и поиск не работают

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
    setAddNameValue('');
    setAddAgeValue('');
    setAddGenderValue('male');

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
        alert('Нужно выбрать пользователей');
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


/* Тут html */
  return (
    <div className="container max-w-[1140px] mr-auto ml-auto p-auto "> {/* <!-- w-[1140px]  --> */}
        <div className="zagolovok mb-[15px]">
            <h1 className="text-3xl font-bold underline mt-[10px] text-center "> {/* <!-- flex items-center justify-center  --> */}
              База данных пользователей 
            </h1>
        </div>
        <div id="show" className=" flex justify-end w-[800px] m-auto mb-[15px] ">
            <button onClick={() => setShowForm(!showForm)} /* setShowForm(!showForm)} переключатель */ className="rounded-full border p-1.5 w-25 hover:bg-[#8981d9] transition duration-300 ease-in-out">Добавить</button>
        </div>
        {showForm && (
        <div id="create-add" className="create flex-col w-[800px] m-auto mb-[20px] p-[15px] font-medium opacity rounded-r-lg border border-#008a77-400 drop-shadow-xl"  > {/* <!-- bg-[#a5c8e3] --> */}
            <form className="inpt-form" id="create-form" onSubmit={handleAddPerson}> //onSubmit именно для form 
                <div className="grid grid-cols-6 grid-rows-1 mb-[10px]" >
                    <input
                    type="text"
                    name="add-name"
                    placeholder="ФИО"
                    className="add-name col-span-5 text-center border border-#008a77-400 rounded-full p-1  hover:bg-[#cfcfcf] transition duration-300 ease-in-out"
                    id="add-name"
                    value={addNameValue}
                    onChange={(e) => setAddNameValue(e.target.value)}/>
                    <input
                    type="number"
                    name="add-age"
                    placeholder="Возраст"
                    className="add-age border border-navy-600 text-center rounded-full p-1  hover:bg-[#cfcfcf] transition duration-300 ease-in-out ml-5"
                    id="add-age"
                    value={addAgeValue}
                    onChange={(e) => setAddAgeValue(e.target.value)}
                    />
                </div>
                <div className="inpt-select mb-[10px]">
                    <label htmlFor="form-gender" className="ml-[5px]">Пол</label>
                    <select
                    name="add-gender"
                    id="form-gender"
                    value={addGenderValue}
                    onChange={(e) => setAddGenderValue(e.target.value)}
                    className="add-gender border border-navy-600 rounded-full p-1 hover:bg-[#cfcfcf] transition duration-300 ease-in-out ml-10">
                        <option value="male">Мужчины</option>
                        <option value="female">Женщины</option>
                        <option value="trans">Другие</option>
                    </select>    
                </div>
                <div className="button-div flex items-center">
                    <button className="rounded-full border p-1.5 w-25 hover:bg-[#8981d9] transition duration-300 ease-in-out" id="form-button" type="submit">Ввод</button>
                </div> {/* <!-- type="submit" для отпрв --> */}
            </form>
          </div>
        )}
        <div className="menu-list flex flex-col w-[800px] m-auto"> {/* <!-- -violet bg-[#9789e2] --> */}
            <div className="grid grid-cols-6 gap-1 mb-[15px]">
                <input
                type="text"
                id="search-name"
                placeholder="Поиск по имени"
                className="col-span-5 border hover:bg-[#cfcfcf] rounded-sm  transition duration-300 ease-in-out p-[3px]"
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
                className="border hover:bg-[#cfcfcf] rounded-sm  transition duration-300 ease-in-out  p-[3px]"
                value={searchAgeValue}
                /* onChange сбытие инпута остальное функция REACT e объект события */
                onChange={(e) => {
                    const newValue = e.target.value;
                    setSearchAgeValue(newValue);
                    handleSearch(searchNameValue, newValue, selectGenderValue); 
                }}
                />
            </div>
            <div className="flex justify-between mb-[10px]">
                <div className="">
                    <select
                    name="select-gender"
                    id="select-gender"
                    className="hover:bg-[#cfcfcf] transition duration-300 ease-in-out rounded-sm p-[5px]"
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
                    className="hover:bg-[#cfcfcf] active:bg-[#433d61] border transition duration-300 ease-in-out rounded-sm bg-[#FCEBEB] hover:bg-[#cfcfcf] text-red-400 p-[5px]"
                    onClick={handleDelChk}
                    >Удалить выбранное</button>
                </div>
                <div id="" className="">
                    <button id="" className="hover:bg-[#8981d9]  active:bg-[#8981d9]">⊞</button> {/* <!-- Найти иконку карточек фиол --> */}
                    <button id="" className="hover:bg-[#8981d9] active:bg-[#8981d9]">☰</button>{/*  <!-- Иконка списка фиолетовый --> */}
                </div>
            </div>
        </div>

        <div id="result_card" className="list flex  justify-around"> {/* <!-- bg-[#dbdbf6] border-violet-200 --> */}
            <div id="result_text" className="grid grid-cols-3 gap-4">
                {filtered.map((person, index) => (
                    <div key={index} className="mb-[10px] p-[10px] border rounded-r-lg hover:bg-[#e0e0e0]  transition duration-300 ease-in-out shadow-md"  id="result-card-daddy">
                    <div className="flex flex-row mt-[5px]" id="result-card-skin">
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
                            <p className="font-medium text-gray-950 dark:text-gray">
                                {person.userName}</p>
                            <p className="text-gray-700 dark:text-gray-400">
                                возраст - {person.userAge} 
                            </p>
                            <p className=" font-style: italic">
                                {person.userGender} 
                            </p> 
                        </div> 
                        <span  id="result" /> 
                    </div>
                    <div className="flex flex-row  mb-[10px]">
                        <button onClick={() => handleEdit(index)} className="rounded-full border p-1.5 w-25 bg-white hover:bg-[#8981d9] transition duration-300 ease-in-out ml-5 mr-5 w-30">Редактировать</button>
                        <button onClick={() => handleDelete(index)}className="rounded-full border p-1.5 w-25 bg-[#FCEBEB] hover:bg-[#f2caca] text-red-400 transition duration-300 ease-in-ou">Удалить</button>
                    </div>
                    </div>
                ))}
            </div>
        </div>
        <div id="result_table" className="list flex justify-around flex-col w-[800px] m-auto ">{/*  bg-[#dbdbf6] border-violet-200 */}

            <table >
                <thead>
                    <th></th>
                    <th>Имя</th>
                    <th>Возраст</th>
                    <th>Пол</th>
                </thead>
                {filtered.map((person, index) => (
                <tbody >
                    <tr className='hover:bg-[#e0e0e0]  transition duration-300 ease-in-out'>
                        <td >
                            <input
                                type="checkbox"
                                id="result-chbbox"
                                className="delete-select accent-[#8981d9]"
                                value={index}
                                checked={checkIncludes.includes(index)}
                                onChange={() => toggleCheckbox(index)}
                                />
                        </td>
                        <td>{person.userName}</td>
                        <td> возраст - {person.userAge}</td>
                        <td>{person.userGender}</td>
                        <td><button onClick={() => handleEdit(index)} className="rounded-full border p-1.5 w-25 bg-white hover:bg-[#8981d9] transition duration-300 ease-in-out ml-5 mr-5 w-30">Редактировать</button></td>
                        <td><button onClick={() => handleDelete(index)}className="rounded-full border p-1.5 w-25 bg-[#FCEBEB] hover:bg-[#f2caca] text-red-400 transition duration-300 ease-in-ou">Удалить</button></td>
                    </tr>
                </tbody>         ))}
            </table>

        </div>
        <footer className="footer h-20" id="footer"></footer>
    </div>



   

  );
}



export default App