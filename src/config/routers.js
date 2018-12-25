import App from "../../App";
import Search from "../../components/buscador";
import Details from "../../components/details"
import Galeria from "../../components/galeria"
import DetailsFav from "../../components/detailFav"
const Routes = {
    Home: { screen: App },
    Search: { screen: Search },
    Detail: {screen: Details},
    Galeria: {screen: Galeria},
    DetailsFav: {screen: DetailsFav},
}

export default Routes