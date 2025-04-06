import { Link } from "react-router-dom";

export default function NotFoundView() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>Page not found</h1>
                            <h2> 404 Not Found</h2>
                            <div className="alert alert-warning" role="alert">
                            Sorry, an error has occured, Requested page not found!<br/>
                            Please go to the home page to find your information: <Link to='/'>Home</Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}