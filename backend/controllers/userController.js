import User from "../models/User.js";

// @desc    Get current user profile (Simulated single user)
// @route   GET /api/users/profile
// @access  Public (for now)
export const getProfile = async (req, res) => {
    try {
        // For single user mode, get the first user (stable)
        const user = await User.findOne().sort({ createdAt: 1 });

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                bus_id: user.bus_id || "", // Ensure field exists
                department: "Supnum", // Hardcoded for now as per design
                level: "L2",          // Hardcoded for now
                studentId: "8829103", // Hardcoded/Placeholder
                notifications_enabled: user.notifications_enabled,
                dark_mode: user.dark_mode,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Public (for now)
export const updateProfile = async (req, res) => {
    try {
        const user = await User.findOne().sort({ createdAt: 1 });

        if (user) {
            // Check if name is taken by another user
            if (req.body.name && req.body.name !== user.name) {
                const userExists = await User.findOne({ name: req.body.name });
                if (userExists) {
                    return res.status(400).json({ message: "This name is already taken. Please choose another one." });
                }
            }

            user.name = req.body.name || user.name;
            user.bus_id = req.body.bus_id || user.bus_id;

            if (req.body.notifications_enabled !== undefined) {
                user.notifications_enabled = req.body.notifications_enabled;
            }
            if (req.body.dark_mode !== undefined) {
                user.dark_mode = req.body.dark_mode;
            }

            if (req.body.newPassword) {
                if (!req.body.currentPassword) {
                    return res.status(400).json({ message: "Current password is required" });
                }

                // Simple plain text comparison for now
                if (req.body.currentPassword !== user.password) {
                    return res.status(401).json({ message: "Incorrect current password" });
                }

                user.password = req.body.newPassword;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                bus_id: updatedUser.bus_id,
                notifications_enabled: updatedUser.notifications_enabled,
                dark_mode: updatedUser.dark_mode,
                password: req.body.newPassword ? "Updated" : "Unchanged"
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
