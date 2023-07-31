import jwt from 'jsonwebtoken';

type User = {
	id: string;
	username: string;
};

export const createJWT = (user: User) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET,
		{ expiresIn: '1d' },
	);
	return token;
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.send('Not authorized');
		return;
	}

	const [, token] = bearer.split(' ');
	if (!token) {
		console.log('here');
		res.status(401);
		res.send('Not authorized');
		return;
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
		console.log(payload);
		next();
		return;
	} catch (e) {
		console.error(e);
		res.status(401);
		res.send('Not authorized');
		return;
	}
};
