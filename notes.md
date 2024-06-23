Router intro.

Router.get(), on the other hand, is used with an instance of express.Router(). This method allows for more modular and flexible routing by enabling you to define routes in separate modules or files, which can then be incorporated into the main application. This approach is more scalable and helps in organizing the code better, especially as the application grows.

Example

`const express = require('express');
const app = express();

const productRoutes = require('./products');
const userRoutes = require('./users');

// Mount routers
app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(3000, () => {
console.log('Server is running on http://localhost:3000');
});`

router.use() means to use at the start to check things. acts as a middleware.
