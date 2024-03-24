import Contact from "./Contact";
import Spinner from "../Spinner";
import {PINK, CURRENTLINE, ORANGE} from "../../helpers/colors";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext"

const Contacts = () => {
    const {loading, deleteContact, filteredContacts} = useContext(ContactContext)

    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3 float-end">
                                <Link to={"/contacts/add"} className="btn m-2" style={{backgroundColor: PINK}}>
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2"/>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container">
                <div className="row">
                    {loading ? <Spinner/> : filteredContacts.length > 0 ? filteredContacts.map(contact => (
                        <Contact key={contact.id} contact={contact}
                                 deleteContact={() => deleteContact(contact.id, contact.fullName)}/>)) : (<div
                        className="text-center py-5"
                        style={{backgroundColor: CURRENTLINE}}>
                        <p className="h3" style={{color: ORANGE}}>
                            مخاطب یافت نشد...
                        </p>
                        <img
                            src={require("../../assets/no-found.gif")}
                            alt="پیدا نشد"
                            className="w-25"/>
                    </div>)}
                </div>
            </section>
        </>
    );
};

export default Contacts;
