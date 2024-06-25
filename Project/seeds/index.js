const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "65ca6972cc548d39244c9f95",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: cities[[random1000, random1000]],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dpulhgbu1/image/upload/v1719218517/YelpCamp/ispbmtr5qyv6e8soooef.jpg",
          filename: "YelpCamp/ispbmtr5qyv6e8soooef",
        },
        {
          url: "https://res.cloudinary.com/dpulhgbu1/image/upload/v1719218517/YelpCamp/ciz9spsfdvqxtwtkhyf8.jpg",
          filename: "YelpCamp/ciz9spsfdvqxtwtkhyf8",
        },
      ],
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut corrupti dicta earum reprehenderit quis dolor qui deleniti maiores sapiente beatae culpa, placeat, tempore nobis necessitatibus ullam fugiat recusandae. Non, aliquam?",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
