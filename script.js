const movies = [
    // Acción
    {
        title: "Mad Max: Furia en la Carretera",
        genre: "accion",
        mood: "emocionado",
        duration: 120,
        poster: "https://pics.filmaffinity.com/mad_max_fury_road-539851935-large.jpg",
        synopsis: "Persecución postapocalíptica a través del desierto australiano."
    },
    {
        title: "John Wick: Pacto de Sangre",
        genre: "accion",
        mood: "triste",
        duration: 101,
        poster: "https://es.web.img3.acsta.net/c_300_300/pictures/16/10/10/09/43/331138.jpg",
        synopsis: "Un legendario asesino sale del retiro para vengar a su perro."
    },

    // Comedia
    {
        title: "¿Qué Pasó Ayer?",
        genre: "comedia",
        mood: "feliz",
        duration: 100,
        poster: "https://http2.mlstatic.com/D_924080-MLA31474870391_072019-C.jpg",
        synopsis: "Tres amigos despiertan sin memoria tras una noche de caos en Las Vegas."
    },
    {
        title: "El Gran Lebowski",
        genre: "comedia",
        mood: "relajado",
        duration: 117,
        poster: "https://live.staticflickr.com/3307/3513411521_58ed8be8ed.jpg",
        synopsis: "Un desempleado amante de los bolos se ve envuelto en un secuestro absurdo."
    },

    // Drama
    {
        title: "El Club de la Pelea",
        genre: "drama",
        mood: "emocionado",
        duration: 139,
        poster: "https://www.laguiadelvaron.com/wp-content/uploads/2017/10/149_fight_club_facebook_cover.jpg",
        synopsis: "Un hombre hastiado de su vida crea un club clandestino de combates."
    },
    {
        title: "El Renacido",
        genre: "drama",
        mood: "asustado",
        duration: 156,
        poster: "https://www.edicioncoleccionista.com/wp-content/uploads/2016/03/Ediciones-Blu-ray-de-The-Reventant-o-El-Renacido-Portada-600x242.jpg",
        synopsis: "Un explorero lucha por sobrevivir en el salvaje oeste americano."
    },

    // Ciencia Ficción
    {
        title: "Interestelar",
        genre: "ciencia_ficcion",
        mood: "relajado",
        duration: 169,
        poster: "https://http2.mlstatic.com/D_616044-MLU71187805778_082023-C.jpg",
        synopsis: "Viaje interestelar para encontrar un nuevo hogar para la humanidad."
    },
    {
        title: "Titanes Del Pacifico",
        genre: "ciencia_ficcion",
        mood: "emocionado",
        duration: 164,
        poster: "https://pics.filmaffinity.com/pacific_rim-216432480-large.jpg",
        synopsis: "Monstruos gigantes (Kaijus) atacan la Tierra, y la humanidad los combate con robots gigantes (Jaegers)."
    },

    // Animación
    {
        title: "Coco",
        genre: "animacion",
        mood: "feliz",
        duration: 105,
        poster: "https://www.diariodevenusville.com/wp-content/uploads/2017/12/COCO-caratula-1.jpg",
        synopsis: "Un niño viaja al mundo de los muertos para descubrir su legado familiar."
    },
    {
        title: "Toy Story 4",
        genre: "animacion",
        mood: "emocionado",
        duration: 100,
        poster: "https://blogs.ucontinental.edu.pe/wp-content/uploads/2019/06/toy-story-4-el-proceso-de-animacion-pixar-universidad-continental2.jpg",
        synopsis: "Los juguetes emprenden un viaje para rescatar a su nuevo dueño."
    },

    // Terror
    {
        title: "El Conjuro",
        genre: "terror",
        mood: "asustado",
        duration: 112,
        poster: "https://files.rcnradio.com/public/2018-12/El%20Conjuro.jpg",
        synopsis: "Una familia es aterrorizada por una presencia oscura en su hogar."
    },
    {
        title: "La Monja",
        genre: "terror",
        mood: "emocionado",
        duration: 127,
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm0S7kqR5wuJtZdo4_RRc5h07OvkQgozcRWQ&s",
        synopsis: "Un sacerdote y una novicia investigan la misteriosa muerte de una monja en un monasterio rumano, descubriendo una entidad demoníaca que los aterroriza."
    },
    {
        title: "El Exorcista",
        genre: "terror",
        mood: "feliz",
        duration: 122,
        poster: "https://pics.filmaffinity.com/the_exorcist-869378789-large.jpg",
        synopsis: "Una niña es poseída por una entidad demoníaca y necesita un exorcismo."
    },
    {
        title: "It (Eso)",
        genre: "terror",
        mood: "relajado",
        duration: 135,
        poster: "https://lascronicasdedeckard.com/wp-content/uploads/2019/09/It-2017-Las-Cronicas-de-Deckard-Portada.jpg",
        synopsis: "Un grupo de niños enfrenta a un payaso demoníaco que aterroriza su pueblo."
    }
];

// ========== LÓGICA DEL RECOMENDADOR (NO CAMBIAR) ==========
document.getElementById('movieForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const genre = document.getElementById('genre').value;
    const mood = document.getElementById('mood').value;
    const duration = document.getElementById('duration').value;

    const recommendations = movies.map(movie => {
        let score = 0;
        if (movie.genre === genre) score += 3;
        if (movie.mood === mood) score += 2;
        if (duration === "corta" && movie.duration <= 120) score += 1;
        if (duration === "media" && movie.duration > 120 && movie.duration <= 180) score += 1;
        if (duration === "larga" && movie.duration > 180) score += 1;
        return { ...movie, score };
    });

    const bestMatch = recommendations.reduce((best, current) => 
        current.score > best.score ? current : best
    );

    document.getElementById('movieTitle').textContent = bestMatch.title;
    document.getElementById('moviePoster').src = bestMatch.poster;
    document.getElementById('movieSynopsis').textContent = bestMatch.synopsis;

    const durationAlert = document.getElementById('durationAlert');
    durationAlert.textContent = duration === "corta" && bestMatch.duration > 120 ? 
        "⚠️ Duración mayor a la seleccionada" : 
        (duration === "larga" && bestMatch.duration < 180 ? "⚠️ Duración menor a la seleccionada" : "");

    document.getElementById('movieModal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('movieModal').style.display = 'none';
});