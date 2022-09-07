const AppContainer = ({
    children
}) => {
    const props = {
        className: `appContainer m-auto w-10/12 py-10`,
    };
    return (
        <div {...props}>
            {children}
        </div>
    );
};

export default AppContainer;
