import {createContext} from "react";

export const ContactContext = createContext({
    loading: false, setLoading: () => {},
    contact: {},
    contacts: [],
    setContacts: [],
    filteredContacts: [],
    setFilteredContacts: [],
    contactQuery: {},
    groups: [],
    onContactChange: () => {},
    deleteContact: () => {},
    createContact: () => {},
    contactSearch: () => {},
});