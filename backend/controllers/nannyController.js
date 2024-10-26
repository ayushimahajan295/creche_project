import Nanny from '../models/nannyModel.js'; // Adjust the path to your Nanny model


// Function to add a new nanny
export const addNanny = async (req, res) => {
    const {
        firstName,
        lastName,
        age,
        experience,
        certifications,
        contactEmail,
        contactPhone,
        address
    } = req.body;

    try {
        // Validate required fields
        if (!firstName || !lastName || !age || !experience || !contactEmail || !contactPhone) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        // Email and phone number format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[6-9]\d{9}$/;

        if (!emailRegex.test(contactEmail)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        if (!phoneRegex.test(contactPhone)) {
            return res.status(400).json({ message: 'Invalid phone number format.' });
        }

        // Check for existing nanny
        const existingNanny = await Nanny.findOne({
            $or: [{ contactEmail }, { contactPhone }],
        });

        if (existingNanny) {
            return res.status(409).json({ message: 'Nanny with this email or phone number already exists.' });
        }

        // Process certifications if provided
        let certificationsArray = [];
        if (certifications) {
            if (Array.isArray(certifications)) {
                certificationsArray = certifications;
            } else if (typeof certifications === 'string') {
                certificationsArray = certifications.split(',').map(cert => cert.trim());
            } else {
                return res.status(400).json({ message: 'Invalid format for certifications.' });
            }
        }

        // Get the profile picture path
// Get the profile picture path
const profilePicturePath = req.file ? `uploads/${req.file.filename}` : null; // Use relative path

        // Create new nanny object
        const newNanny = new Nanny({
            firstName,
            lastName,
            age,
            experience,
            certifications: certificationsArray,
            profilePicture: profilePicturePath, // Save file path
            contactEmail,
            contactPhone,
            address,
        });

        // Save the new nanny to the database
        const savedNanny = await newNanny.save();

        res.status(201).json({
            message: 'Nanny profile created successfully!',
            nanny: savedNanny,
        });
    } catch (error) {
        console.error('Error creating nanny profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Function to list all nannies
// Function to list all nannies (now using POST)


export const listNannies = async (req, res) => {
    try {
        const nannies = await Nanny.find();
        // Convert profilePicture path to a full URL
        const nanniesWithImages = nannies.map(nanny => ({
            ...nanny.toObject(),
            profilePicture: `${req.protocol}://${req.get('host')}/public/${nanny.profilePicture}`, // Correct the path here
        }));
        res.status(200).json({ success: true, nannies: nanniesWithImages });
    } catch (error) {
        console.error('Error fetching nannies:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};





// Function to get a single nanny by ID
export const getNannyById = async (req, res) => {
    const { id } = req.params;

    try {
        const nanny = await Nanny.findById(id);

        if (!nanny) {
            return res.status(404).json({ message: 'Nanny not found.' });
        }

        res.status(200).json(nanny);
    } catch (error) {
        console.error('Error fetching nanny:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to remove a nanny by ID
export const removeNanny = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNanny = await Nanny.findByIdAndDelete(id);

        if (!deletedNanny) {
            return res.status(404).json({ message: 'Nanny not found.' });
        }

        res.status(200).json({ message: 'Nanny removed successfully.' });
    } catch (error) {
        console.error('Error removing nanny:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
