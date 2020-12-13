import { Component } from "react";
import "./App.css";
import Movie from "./movie";

// const movies = [
//   {id:0, title:"Matrix", poster : 'https://nerdist.com/wp-content/uploads/2019/08/matrix-keanue-reeves-759.jpg'},
//   {id:1, title:"Full Metal Jacket", poster :"https://upload.wikimedia.org/wikipedia/en/3/39/The_Hunger_Games_cover.jpg"}
// ]

class App extends Component {
  constructor() {
    super();
    console.log("Constructor");
  }

  // state = {
  //   greeting: "Hello",
  //   movies: [
  //     {id:0, title:"Matrix", poster : 'https://nerdist.com/wp-content/uploads/2019/08/matrix-keanue-reeves-759.jpg'},
  //     {id:1, title:"Full Metal Jacket", poster :"https://upload.wikimedia.org/wikipedia/en/3/39/The_Hunger_Games_cover.jpg"}
  //   ]
  // }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
      return (
        <Movie
          title={movie.title}
          poster={movie.medium_cover_image}
          key={movie.id}
          genres={movie.genres}
          synopsis={movie.summary}
        />
      );
    });
    return movies;
  };

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({ movies });
  };

  _callApi = () => {
    return fetch(
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=5"
    )
      .then((res) => res.json())
      .then((json) => json.data.movies)
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this._getMovies();
  }

  state = {};

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App-loading"}>
        {this.state.movies ? this._renderMovies() : "Loading"}
      </div>

      // <div className="App">
      //   {this.state.greeting}
      // {this.state.movies.map((movie, index)=>{return <Movie title={movie.title} poster={movie.poster} key={index} />})}
      // </div>
    );
  }

  // componentDidMount() {
  //   console.log('componentDidMount')
  // }
}

export default App;
