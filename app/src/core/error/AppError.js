class AppError extends Error {
    constructor(e) {
        super();
        this.message = String(e);
    }

    toString() {
        return this.message;
    }
}

export default AppError;
