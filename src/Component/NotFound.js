import { Link } from "react-router-dom"
export default function NotFound(){
    return(
        <div >
            <h2>Page not found!</h2>
            <p>
                This page is not found actually , malheuresement cette page n'est pas disponible
                Try another one please!
            </p>
            <p>Go to the <Link to="/">Home Page</Link></p>
        </div>
    )
}