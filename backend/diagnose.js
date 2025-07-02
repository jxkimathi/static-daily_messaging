require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
const { execSync } = require('child_process');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

// Extract hostname from MongoDB URI
const getHostname = (uri) => {
  try {
    const match = uri.match(/@([^/:]+)/);
    return match ? match[1] : null;
  } catch (err) {
    return null;
  }
};

const hostname = getHostname(MONGODB_URI);

console.log('Diagnosing MongoDB connection issues...');
console.log('MongoDB URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

// Function to check DNS resolution
const checkDns = () => {
  if (!hostname) {
    console.log('Could not extract hostname from MongoDB URI');
    return;
  }

  console.log(`Testing DNS resolution for ${hostname}...`);
  
  dns.lookup(hostname, (err, address) => {
    if (err) {
      console.log(`❌ DNS resolution failed for ${hostname}: ${err.message}`);
      console.log('This could indicate network connectivity issues or DNS problems.');
    } else {
      console.log(`✅ DNS resolution successful: ${hostname} resolves to ${address}`);
    }
  });
};

// Function to test connectivity using ping
const pingHost = () => {
  if (!hostname) return;
  
  console.log(`Testing connectivity to ${hostname} using ping...`);
  
  try {
    const result = execSync(`ping -c 3 ${hostname}`, { encoding: 'utf8' });
    console.log('Ping result:');
    console.log(result);
  } catch (err) {
    console.log(`❌ Ping failed: ${err.message}`);
    console.log('This could indicate network connectivity issues or firewall restrictions.');
  }
};

// Function to test MongoDB connection with detailed error logging
const testConnection = async () => {
  console.log('Testing direct MongoDB connection...');
  
  try {
    // Add connection options for better error reporting
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000
    });
    
    console.log('✅ MongoDB connection successful!');
    mongoose.disconnect();
  } catch (err) {
    console.log('❌ MongoDB connection failed:');
    console.log(`Error name: ${err.name}`);
    console.log(`Error message: ${err.message}`);
    
    if (err.name === 'MongoNetworkError') {
      console.log('\nThis is a network-related error. Possible causes:');
      console.log('1. Network connectivity issues');
      console.log('2. Firewall blocking MongoDB connections');
      console.log('3. VPN interfering with connections');
      console.log('4. MongoDB Atlas IP whitelist restrictions');
      
      console.log('\nRecommended solutions:');
      console.log('1. Check your internet connection');
      console.log('2. Make sure your IP address is whitelisted in MongoDB Atlas');
      console.log('3. Check firewall settings');
      console.log('4. Try connecting from a different network');
    }
  }
};

// Run diagnostic tests
checkDns();
pingHost();
setTimeout(testConnection, 2000); // Wait for DNS check to complete
