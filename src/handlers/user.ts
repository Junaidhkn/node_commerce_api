import { prisma } from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res) => {
	const { username, email, password } = req.body;
	const hashedPassword = await hashPassword(password);
	const user = await prisma.user.create({
		data: {
			username,
			email,
			password: hashedPassword,
		},
	});

	const token = createJWT(user);
	res.json({ token });
};

export const loginUser = async (req, res) => {
	const { username, password } = req.body;
	const user = await prisma.user.findUnique({
		where: {
			username,
		},
	});

	if (!user) {
		res.status(404);
		res.json({ message: 'User not found' });
		return;
	}

	const valid = await comparePasswords(password, user.password);

	if (!valid) {
		res.status(401);
		res.json({ message: 'Invalid password' });
		return;
	}

	const token = createJWT(user);
	res.json({ token });
};
