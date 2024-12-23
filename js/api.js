const url = "https://api.jsonbin.io/v3/b/6755bc6ce41b4d34e461f41a";

const headers = {
    "Content-Type": "application/json",
    "X-Master-Key": "$2a$10$tfzMefn7m3.7t67ZgfhwOeDzW5DSP9o0SWwdwl1cQSBxKBDq95ZvG",
};

const api = {
    async fetchMovies() {
        try {
            const response = await axios.get(url, {headers}); // Add headers here
            return response.data.record.movies;
        } catch (error) {
            console.error("Error fetching movies:", error);
            alert("Error fetching movies");
            throw error;
        }
    },

    async saveMovie(movie) {
        try {
            const movies = await this.fetchMovies();
            const updatedMovies = [...movies, { ...movie, id: Date.now().toString() }];
            const response = await axios.put(
                url,
                {movies: updatedMovies},
                {headers} // Add headers here
            );
            return response.data;
        } catch (error) {
            console.error("Error saving movie:", error);
            alert("Error saving movie");
            throw error;
        }
    },

    async fetchMovieById(id) {
        try {
            const movies = await this.fetchMovies(); // Busca a lista de filmes
            const movie = movies.find((movie) => movie.id === id); // Encontra o filme pelo ID
            if (!movie) {
                throw new Error("Movie not found"); // Caso o filme não seja encontrado
            }
            return movie;
        } catch (error) {
            console.error("Error fetching movie by ID:", error.message);
            alert("Error fetching movie by ID");
            throw error;
        }
    }
    ,

    async editMovie(movie) {
        try {
            const movies = await this.fetchMovies();
            const updatedMovies = movies.map((m) => (m.id === movie.id ? movie : m));
            const response = await axios.put(
                url,
                {movies: updatedMovies},
                {headers} // Add headers here
            );
            return response.data;
        } catch (error) {
            console.error("Error editing movie:", error);
            alert("Error editing movie");
            throw error;
        }
    },

    async deleteMovie(id) {
        try {
            const movies = await this.fetchMovies();
            const updatedMovies = movies.filter((movie) => movie.id !== id);
            const response = await axios.put(
                url,
                {movies: updatedMovies},
                {headers} // Add headers here
            );
            return response.data;
        } catch (error) {
            console.error("Error deleting movie:", error);
            alert("Error deleting movie");
            throw error;
        }
    },
};

export default api;

async function testApiConnection() {
    try {
        const movies = await api.fetchMovies();
        console.log("Movies fetched successfully:", movies);
    } catch (error) {
        console.error("API connection error:", error);
    }
}

testApiConnection();
