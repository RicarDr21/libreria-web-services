import { useEffect, useState } from "react";

import { crearLibro, eliminarLibro, listarLibros } from "./api.js";

export default function App() {
  const [libros, setLibros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    listarLibros().then(setLibros);
  }, []);

  async function guardar(e) {
    e.preventDefault();
    const respuesta = await crearLibro({ titulo, autor });
    if (respuesta.status === 400) {
      setError("El título y el autor son obligatorios.");
      return;
    }
    const libro = await respuesta.json();
    setLibros([...libros, libro]);
    setTitulo("");
    setAutor("");
    setError("");
  }

  async function eliminar(id) {
    await eliminarLibro(id);
    setLibros(libros.filter((libro) => libro.id !== id));
  }

  return (
    <>
      <header className="cabecera">
        <h1>Biblioteca</h1>
      </header>

      <main className="contenido">
        <h2 className="titulo-seccion">Nuevo libro</h2>
        <form className="formulario" onSubmit={guardar}>
          {error && <span className="error">{error}</span>}
          <label>
            Título:
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </label>
          <label>
            Autor:
            <input value={autor} onChange={(e) => setAutor(e.target.value)} />
          </label>
          <button type="submit" className="boton">Guardar</button>
        </form>

        <h2 className="titulo-seccion">Catálogo</h2>
        <div className="grilla">
          {libros.map((libro) => (
            <article key={libro.id} className="tarjeta">
              <div className="portada">{libro.titulo.charAt(0)}</div>
              <h3>{libro.titulo}</h3>
              <p className="meta">{libro.autor}</p>
              <button className="boton boton-peligro" onClick={() => eliminar(libro.id)}>
                Eliminar
              </button>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
