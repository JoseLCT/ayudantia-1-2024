const urlBase = 'public/imagenes';
const extensionesValidas = ['png', 'jpg', 'jpeg', 'webp'];

export async function guardarImagen(carpeta, imagen, id) {
    const extension = imagen.name.split('.').pop();
    if (!extensionesValidas.includes(extension)) {
        throw new Error(`La extensión ${extension} no es válida`)
    }
    const ruta = `${urlBase}/${carpeta}/${id}.${extension}`;
    await imagen.mv(ruta);
    return ruta;
}