const net = require('net');
const fs = require('fs');
const path = require('path');

// Define the server address and port
const SERVER_ADDRESS = '0.0.0.0'; // Bind to all available IP addresses
const SERVER_PORT = 3001;

// Define the file path for saving the received data in the same folder
const filePath = path.join(__dirname, 'received_data.txt');

// Create a TCP server
const server = net.createServer((socket) => {
    // Handle incoming data
    socket.on('data', (chunk) => {
        // Append received data to the file
        fs.appendFile(filePath, chunk.toString(), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Data successfully saved to received_data.txt');
            }
        });
    });

    // Handle errors
    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });

    // Handle client disconnection
    socket.on('close', () => {
        // No need to log anything to the terminal
    });
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
});

// Start the TCP server
server.listen(SERVER_PORT, SERVER_ADDRESS, () => {
    console.log(`Server running at tcp://${SERVER_ADDRESS}:${SERVER_PORT}/`);
});
