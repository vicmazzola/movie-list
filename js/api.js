const url = "http://localhost:3001";

const api = {
  async fetchMovies() {
    try {
      const response = await axios.get(`${url}/movies`);
      return await response.data;
    } catch (error) { // Added error parameter
      alert("Error fetching movies");
      throw error;
    }
  },

  async saveMovie(movie) {
    try {
      const response = await axios.post(`${url}/movies`, movie);
      return await response.data;
    } catch (error) { // Added error parameter
      alert("Error saving movie");
      throw error;
    }
  },

  async fetchMovieById(id) {
    try {
      const response = await axios.get(`${url}/movies/${id}`);
      return await response.data;
    } catch (error) { // Added error parameter
      alert("Error fetching movie by ID");
      throw error;
    }
  },

  async editMovie(movie) {
    try {
      const response = await axios.put(`${url}/movies/${movie.id}`, movie);
      return await response.data;
    } catch (error) { // Added error parameter
      alert("Error editing movie");
      throw error;
    }
  },

  async deleteMovie(id) {
    try {
      await axios.delete(`${url}/movies/${id}`);
    } catch (error) { // Added error parameter
      alert("Error deleting movie");
      throw error;
    }
  },
};

export default api;
