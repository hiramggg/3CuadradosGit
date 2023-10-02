document.addEventListener('DOMContentLoaded', function() {
    
    let movieData;
  
    const urlParams = new URLSearchParams(window.location.search);
    const movieDataParam = urlParams.get('data');
  
    if (movieDataParam) {
      movieData = JSON.parse(decodeURIComponent(movieDataParam));
  
      const movieTitleElement = document.getElementById('movieTitle');
      movieTitleElement.textContent = movieData.title;
  
      const moviePosterElement = document.getElementById('moviePoster');
      moviePosterElement.src = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path;
  
      const movieDescriptionElement = document.getElementById('movieDescription');
      movieDescriptionElement.textContent = movieData.overview;
  
      const movieRatingElement = document.getElementById('movieRating');
      movieRatingElement.textContent = `Calificación: ${movieData.vote_average}`;
    } else {
      const errorElement = document.createElement('p');
      errorElement.textContent = 'No se ha proporcionado información de la película.';
      document.body.appendChild(errorElement);
    }
  
    
    const storedMovieData = localStorage.getItem('movieData');
  
    if (storedMovieData) {
      movieData = JSON.parse(storedMovieData);
  
      
      const movieTitleElement = document.getElementById('movieTitle');
      const moviePosterElement = document.getElementById('moviePoster');
      const movieDescriptionElement = document.getElementById('movieDescription');
      const movieRatingElement = document.getElementById('movieRating');
      const userRatingElement = document.getElementById('userRating'); // Obtener el elemento HTML para mostrar la calificación del usuario
  
      movieTitleElement.textContent = movieData.title;
      moviePosterElement.src = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path;
      movieDescriptionElement.textContent = movieData.overview;
      movieRatingElement.textContent = `Calificación: ${movieData.vote_average}`;
    } else {
      alert('No se ha proporcionado información de la película.');
    }
  
    
    const movieRatingInput = document.getElementById('movieRatingInput');
    const submitRatingButton = document.getElementById('submitRating');
    const movieRatingElement = document.getElementById('movieRating');
  
    
    submitRatingButton.addEventListener('click', function() {
      
        if (!movieData) {
            alert('La información de la película no está disponible.');
            return; 
          }
      
          const userRating = parseInt(movieRatingInput.value);
      
          if (userRating >= 1 && userRating <= 10) {
            const apiKey = '4932183659c8c5589d8792ccc740829d';
            const movieId = movieData.id;
            
            const ratingData = {
              value: userRating,
            };
            
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify({ data: ratingData }), 
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Calificación exitosa:', data);
                movieRatingElement.textContent = `Calificación de la Película: ${movieData.vote_average}`;
                userRatingElement.textContent = `Tu Calificación: ${userRating}`;
              })
              .catch((error) => {
                console.error('Error al calificar la película:', error);
              });
            
          } else {
            alert('Ingresa una calificación válida (1-10).');
          }
    });
  
  });
  