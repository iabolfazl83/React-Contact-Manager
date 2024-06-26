import {useState, useEffect} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

import {ContactContext} from "./context/contactContext";
import {
    AddContact,
    ViewContact,
    Contacts,
    EditContact,
    Navbar,
} from "./components";

import {
    getAllContacts,
    getAllGroups,
    createContact,
    deleteContact,
} from "./services/contactService";

import "./App.css";
import {
    CURRENTLINE,
    FOREGROUND,
    PURPLE,
    YELLOW,
    COMMENT,
} from "./helpers/colors";

const App = () => {
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [contact, setContact] = useState({});
    const [contactQuery, setContactQuery] = useState({text: ""});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const {data: contactsData} = await getAllContacts();
                const {data: groupsData} = await getAllGroups();

                setContacts(contactsData);
                setFilteredContacts(contactsData);
                setGroups(groupsData);

                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const createContactForm = async (event) => {
        event.preventDefault();
        try {
            setLoading((prevLoading => !prevLoading));
            const {status, data} = await createContact(contact);

            if (status === 201) {
                const allContacts = [...contacts, data];
                setContacts(allContacts);
                setFilteredContacts(allContacts);
                setContact({});
                setLoading((prevLoading => !prevLoading));
                navigate("/contacts");
            }
        } catch (err) {
            setLoading((prevLoading => !prevLoading));
            console.log(err.message);
        }
    };

    const onContactChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value,
        });
    };

    const confirmDelete = (contactId, contactFullName) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div
                        dir="rtl"
                        style={{
                            backgroundColor: CURRENTLINE,
                            border: `1px solid ${PURPLE}`,
                            borderRadius: "1em",
                        }}
                        className="p-4"
                    >
                        <h1 style={{color: YELLOW}}>پاک کردن مخاطب</h1>
                        <p style={{color: FOREGROUND}}>
                            مطمئنی که میخوای مخاطب {contactFullName} رو پاک کنی ؟
                        </p>
                        <button
                            onClick={() => {
                                removeContact(contactId);
                                onClose();
                            }}
                            className="btn mx-2"
                            style={{backgroundColor: PURPLE}}
                        >
                            مطمئن هستم
                        </button>
                        <button
                            onClick={onClose}
                            className="btn"
                            style={{backgroundColor: COMMENT}}
                        >
                            انصراف
                        </button>
                    </div>
                );
            },
        });
    };

    const removeContact = async (contactId) => {
        const allContacts = [...contacts];
        try {
            setLoading(true)
            const updatedContacts = contacts.filter(contact => contact.id !== contactId);
            setContacts(updatedContacts)
            setFilteredContacts(updatedContacts)
            const {status} = await deleteContact(contactId);
            setLoading(false)
            if (status !== 200) {
                setContacts(allContacts)
                setFilteredContacts(allContacts)
                setLoading(false)
                alert("خطایی رخ داد")
            }
        } catch (err) {
            console.log(err.message);
            setContacts(allContacts)
            setFilteredContacts(allContacts)
            setLoading(false)
            alert("خطایی رخ داد")
        }
    };

    const contactSearch = (event) => {
        setContactQuery({...contactQuery, text: event.target.value});
        const allContacts = contacts.filter((contact) => {
            return contact.fullName
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });

        setFilteredContacts(allContacts);
    };

    return (
        <ContactContext.Provider
            value={{
                loading,
                setLoading,
                contact,
                setContact,
                contactQuery,
                contacts,
                setContacts,
                filteredContacts,
                setFilteredContacts,
                groups,
                onContactChange,
                deleteContact: confirmDelete,
                createContact: createContactForm,
                contactSearch,
            }}
        >
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts"/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/contacts/add" element={<AddContact/>}/>
                    <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                    <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
                </Routes>
            </div>
        </ContactContext.Provider>
    );
};

export default App;
