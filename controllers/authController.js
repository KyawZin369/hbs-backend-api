const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');
const SECRET = process.env.JWT_SECRET; //  JWT_SECRET is in .env file

// Function to generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
};

// Register Controller
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 5);

        // Create new user in the database
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role: role || 'USER', // Defaults to USER if role not provided
            },
        });

        // Generate JWT for the newly created user
        const token = generateToken(newUser);

        // Return user data (without password) and JWT token
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};
