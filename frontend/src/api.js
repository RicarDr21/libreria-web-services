const URL = "http://127.0.0.1:8000/api/libros/";

export const listarLibros = () => fetch(URL).then((r) => r.json());

export const crearLibro = (datos) =>
  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

export const eliminarLibro = (id) => fetch(`${URL}${id}/`, { method: "DELETE" });
