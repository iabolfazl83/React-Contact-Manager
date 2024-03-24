import SearchContact from "./Contacts/SearchContact";
import {BACKGROUND, PURPLE} from "../helpers/colors";
import {useLocation} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg" style={{backgroundColor: BACKGROUND}}>
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <i className="fas fa-id-badge"/>
                            {" "}وب اپلیکیشن مدیریت <span style={{color: PURPLE}}>مخاطبین</span>
                        </div>
                    </div>
                    {
                        useLocation().pathname === "/contacts" ? (
                            <div className="col">
                                <SearchContact/>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
