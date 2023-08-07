const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  profilePicture: String,
  birthday: Date,
  sex: String,
  account: String,
  bloodType: String,
  disabilities: String,

});

const User = mongoose.model('User', userSchema);



app.post('/check-email', async (req, res) => {
    try {
      const { email } = req.body;
  
      const existingUser = await User.findOne({ email }).exec();
  
      if (existingUser) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ exists: false });
    }
  });
  

  app.post('/register-account', upload.single('profilePicture'), async (req, res) => {
    try {
      const { email, password, birthday, sex, account, bloodType, disabilities } = req.body;
      const profilePicture = req.file.filename;

      const existingUser = await User.findOne({ email }).exec();
  
      if (existingUser) {
        res.json({ success: false, message: 'An account with this email address already exists.' });
        return;
      }
  
      const newUser = new User({
        email,
        password,
        profilePicture,
        birthday,
        sex,
        account,
        bloodType,
        disabilities,
      });
  
      await newUser.save();
  
      res.json({ success: true, message: 'Account created successfully!' });
    } catch (error) {
      console.error('Error registering account:', error);
      res.status(500).json({ success: false, message: 'Account creation failed.' });
    }
  });

  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ Email : email }).exec();
  
      if (user) {
  
        if (user.password === password) {
          res.json({ success: true });
        } else {
          res.json({ success: false, message: 'Invalid password.' });
        }
      } else {
        res.json({ success: false, message: 'User not found.' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'An error occurred.' });
    }
  });


    const appointmentSchema = new mongoose.Schema({
    phone: String,
    date: Date,
    time: String,
    message: String,
    });

    const Appointment = mongoose.model('Appointment', appointmentSchema);

    app.post('/schedule-appointment', async (req, res) => {
    try {
        const { phone, date, time, message } = req.body;

        const newAppointment = new Appointment({
        phone,
        date,
        time,
        message,
        });

        await newAppointment.save();

        res.json({ success: true, message: 'Appointment scheduled successfully!' });
    } catch (error) {
        console.error('Error scheduling appointment:', error);
        res.status(500).json({ success: false, message: 'Appointment scheduling failed.' });
    }
    });


    app.post('/check-availability', async (req, res) => {
        try {
          const { date, time } = req.body;
      
          const existingAppointment = await Appointment.findOne({ date, time }).exec();
      
          if (existingAppointment) {
            res.json({ available: false });
          } else {
            res.json({ available: true });
          }
        } catch (error) {
          console.error('Error checking appointment availability:', error);
          res.status(500).json({ available: false });
        }
      });

      app.get('/appointments', async (req, res) => {
        try {
          const appointments = await Appointment.find().exec();
          res.json(appointments);
        } catch (error) {
          console.error('Error fetching appointments:', error);
          res.status(500).json({ message: 'An error occurred.' });
        }
      });

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });