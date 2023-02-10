import HttpException from "./HttpException";

class WrongRouteException extends HttpException {
	constructor() {
		super(404, `Use correct api's routes`);
	}
}

export default WrongRouteException;
