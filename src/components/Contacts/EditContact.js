import {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getContact, updateContact,} from "../../services/contactService";
import {Spinner} from "../";
import {COMMENT, ORANGE, PURPLE} from "../../helpers/colors";
import {ContactContext} from "../../context/contactContext";

const EditContact = () => {
    const {contactId} = useParams();
    const navigate = useNavigate();
    const {
        contacts, setContacts, setFilteredContacts, loading, setLoading, groups
    } = useContext(ContactContext);
    const [contact, setContact] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const {data: contactData} = await getContact(contactId);
                setLoading(false)
                setContact(contactData)
            } catch (err) {
                console.log(err.message);
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    const setContactInfo = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        const allContacts = [...contacts];
        try {
            const {data, status} = await updateContact(contact, contactId);
            const contactIndex = contacts.findIndex(
                (c) => c.id === parseInt(contactId)
            );
            contacts[contactIndex] = {...data}
            setContacts(contacts)
            setFilteredContacts(contacts)
            navigate("/contacts");
            if (status !== 200) {
                setContacts(allContacts)
                setFilteredContacts(allContacts)
                alert("خطایی رخ داد")
            }
        } catch (err) {
            console.log(err.message);
            setContacts({allContacts})
            setFilteredContacts({allContacts})
            alert("خطایی رخ داد")
            setLoading(false)
        }
    };

    // const submitForm = async (event) => {
    //     event.preventDefault();
    //     try {
    //         setLoading(true);
    //         // Copy State
    //         // Update State
    //         // Send Request
    //         // status == 200 -> do nothing
    //         // status == error -> setState(copyState)
    //         const { data, status } = await updateContact(contact, contactId);
    //
    //         /*
    //          * NOTE
    //          * 1- forceRender -> setForceRender(true)
    //          * 2- Send request server
    //          * 3- Update local state
    //          * 4- Update local state before sending request to server
    //          */
    //
    //         if (status === 200) {
    //             setLoading(false);
    //
    //             const allContacts = [...contacts];
    //             const contactIndex = allContacts.findIndex(
    //                 (c) => c.id === parseInt(contactId)
    //             );
    //             allContacts[contactIndex] = { ...data };
    //
    //             setContacts(allContacts);
    //             setFilteredContacts(allContacts);
    //
    //             navigate("/contacts");
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         setLoading(false);
    //     }
    // };

    return (<>
        {loading ? (<Spinner/>) : (<>
            <section className="p-3">
                <div className="container">
                    <div className="row my-2">
                        <div className="col text-center">
                            <p className="h4 fw-bold" style={{color: ORANGE}}>
                                ویرایش مخاطب
                            </p>
                        </div>
                    </div>
                    <hr style={{backgroundColor: ORANGE}}/>
                    <div
                        className="row p-2 w-75 mx-auto align-items-center"
                        style={{backgroundColor: "#44475a", borderRadius: "1em"}}
                    >
                        <div className="col-md-8">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input
                                        name="fullName"
                                        type="text"
                                        className="form-control"
                                        value={contact.fullName}
                                        onChange={setContactInfo}
                                        required={true}
                                        placeholder="نام و نام خانوادگی"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="photo"
                                        type="text"
                                        value={contact.photo}
                                        onChange={setContactInfo}
                                        className="form-control"
                                        required={true}
                                        placeholder="آدرس تصویر"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="mobile"
                                        type="number"
                                        className="form-control"
                                        value={contact.mobile}
                                        onChange={setContactInfo}
                                        required={true}
                                        placeholder="شماره موبایل"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        value={contact.email}
                                        onChange={setContactInfo}
                                        required={true}
                                        placeholder="آدرس ایمیل"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="job"
                                        type="text"
                                        className="form-control"
                                        value={contact.job}
                                        onChange={setContactInfo}
                                        required={true}
                                        placeholder="شغل"
                                    />
                                </div>
                                <div className="mb-2">
                                    <select
                                        name="group"
                                        value={contact.group}
                                        onChange={setContactInfo}
                                        required={true}
                                        className="form-control"
                                    >
                                        <option value="">انتخاب گروه</option>
                                        {groups.length > 0 && groups.map((group) => (
                                            <option key={group.id} value={group.id}>
                                                {group.name}
                                            </option>))}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="submit"
                                        className="btn"
                                        style={{backgroundColor: PURPLE}}
                                        value="ویرایش مخاطب"
                                    />
                                    <Link
                                        to={"/contacts"}
                                        className="btn mx-2"
                                        style={{backgroundColor: COMMENT}}
                                    >
                                        انصراف
                                    </Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <img
                                alt={''}
                                src={contact.photo}
                                className="img-fluid rounded"
                                style={{border: `1px solid ${PURPLE}`}}
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center mt-1">
                    <img
                        alt={''}
                        src={require("../../assets/man-taking-note.png")}
                        height="300px"
                        style={{opacity: "60%"}}
                    />
                </div>
            </section>
        </>)}
    </>);
};

export default EditContact;
