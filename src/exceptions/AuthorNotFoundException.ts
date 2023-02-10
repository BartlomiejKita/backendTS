import HttpException from "./HttpException";

class AuthorNotFoundException extends HttpException {
	constructor(id: string) {
		super(404, `Author with id ${id} not found`);
	}
}

export default AuthorNotFoundException;
