import HttpException from "./HttpException";

class NotImplementedError extends HttpException {
	constructor(message?:string) {
		super(501, message || "Not Implemented");
	}
}

export default NotImplementedError;
