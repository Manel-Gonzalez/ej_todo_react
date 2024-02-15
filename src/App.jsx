import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasques, setTasques] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [type, setType] = useState("Familiar");
  const [msg, setMsg] = useState("");

  useEffect(()=> {
    if(tasques.length !==0){
      localStorage.setItem("tasques",JSON.stringify(tasques))
    }
  },[tasques])

  useEffect(()=>{
    const tasques = JSON.parse(localStorage.getItem('tasques'))
    if(tasques){
      setTasques(tasques)
    }
  },[])

  function handleChange(e) {
    setInputValue(e.target.value);
    setMsg("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue !== "") {
      setTasques((tasques) => [
        ...tasques,
        { title: inputValue, id: 0 + tasques.length, type: type },
      ]);
      setInputValue("");
    } else {
      setMsg("El campo no puede estar vacio, planta arboles");
    }
  }

  const onOptionChange = (e) => {
    setType(e.target.value);
  };

  const eliminaTasca = (value) => {
    setTasques((oldValues) => {
      return oldValues.filter((tasca) => tasca !== value);
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 w-100 gap-2 sm:grid-cols-2 ">
        <form
          onSubmit={handleSubmit}
          className="w-100 h-fit bg-gray-300/20 grid grid-cols-1 gap-2 p-2 rounded-md"
        >
          <label htmlFor="camp-tasca" className="text-white">
            Nova Tasca
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="camp-tasca"
            placeholder="Tasca a afegir"
            className="mx-2 px-2 rounded border border-blue-400"
            value={inputValue}
          />
          <p className="text-red-500">{msg}</p>
          <div className="grid grid-cols-2 gap-2 mx-4">
            <div className="bg-green-500 rounded-md">
              <input
                type="radio"
                name="type"
                value="Familiar"
                id="familiar"
                checked={type === "Familiar"}
                onChange={onOptionChange}
              />
              <label htmlFor="familiar">Familiar</label>
            </div>

            <div className="bg-orange-500 rounded-md">
              <input
                type="radio"
                name="type"
                value="Trabajo"
                id="trabajo"
                checked={type === "Trabajo"}
                onChange={onOptionChange}
              />
              <label htmlFor="trabajo">Trabajo</label>
            </div>

            <div className="bg-red-500 rounded-md">
              <input
                type="radio"
                name="type"
                value="Urgente"
                id="urgente"
                checked={type === "Urgente"}
                onChange={onOptionChange}
              />
              <label htmlFor="urgente">Urgente</label>
            </div>

            <div className="bg-blue-500 rounded-md">
              <input
                type="radio"
                name="type"
                value="Personal"
                id="personal"
                checked={type === "Personal"}
                onChange={onOptionChange}
              />
              <label htmlFor="personal">Personal</label>
            </div>
          </div>

          <button
            type="submit"
            className="border-2 border-blue-500 rounded-md bg-sky-400 mx-2"
          >
            Afegeix
          </button>
        </form>

        <div className="w-100 bg-gray-300/20 p-2 rounded-md">
          <h1 className="text-white p-2">LListat Tasques</h1>
          {tasques?.map((e) => {
            if (e.type === "Familiar") {
              return (
                <div className="bg-green-500 p-2 my-1 flex flex-row justify-between rounded-md">
                  <p className=" ">{e.title}</p>
                  <a
                    onClick={() => eliminaTasca(e)}
                    className="align-top text-xs cursor-pointer"
                  >
                    x
                  </a>
                </div>
              );
            }
            if (e.type === "Trabajo") {
              return (
                <div className="bg-orange-500 p-2 my-1 flex flex-row justify-between rounded-md">
                  <p className=" ">{e.title}</p>
                  <a
                    onClick={() => eliminaTasca(e)}
                    className="align-top text-xs cursor-pointer"
                  >
                    x
                  </a>
                </div>
              );
            }
            if (e.type === "Urgente") {
              return (
                <div className="bg-red-500 p-2 my-1 flex flex-row justify-between rounded-md">
                  <p className=" ">{e.title}</p>
                  <a
                    onClick={() => eliminaTasca(e)}
                    className="align-top text-xs cursor-pointer"
                  >
                    x
                  </a>
                </div>
              );
            }
            if (e.type === "Personal") {
              return (
                <div className="bg-blue-500 p-2 my-1 flex flex-row justify-between rounded-md">
                  <p className=" ">{e.title}</p>
                  <a
                    onClick={() => eliminaTasca(e)}
                    className="align-top text-xs cursor-pointer"
                  >
                    x
                  </a>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default App;
