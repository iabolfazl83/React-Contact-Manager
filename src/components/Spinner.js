const Spinner = () => {
    return (
        <>
            <img
                src={require("../assets/loading-gif.gif")}
                className="d-block m-auto"
                style={{width: "100px"}}
                alt="spinner"
            />
        </>
    );
};

export default Spinner;