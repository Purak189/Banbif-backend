const User = require('../models/user'); 

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error('Error al obtener el usuario por email:', error);
    throw error;
  }
}

module.exports = getUserByEmail;