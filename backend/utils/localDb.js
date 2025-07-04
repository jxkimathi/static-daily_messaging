const fs = require('fs');
const path = require('path');

const LOCAL_DB_PATH = path.join(__dirname, 'local-messages.json');

const DEFAULT_MESSAGES = [
  { text: "You are incredibly kind and your thoughtfulness never goes unnoticed.", order: 0 },
  { text: "Your smile brightens everyone's day, especially mine.", order: 1 },
  { text: "Your determination inspires me. You never give up, even when things get tough.", order: 2 },
  { text: "The way you care for others shows what a beautiful heart you have.", order: 3 },
  { text: "I admire your creativity and how you see the world in your unique way.", order: 4 },
  { text: "Your strength during difficult times is truly remarkable.", order: 5 },
  { text: "You have an amazing ability to make people feel valued and important.", order: 6 },
  { text: "I love how passionate you are about the things you believe in.", order: 7 },
  { text: "Your humor and ability to make people laugh is a gift.", order: 8 },
  { text: "I appreciate your honesty and how I can always count on you to be real.", order: 9 },
  { text: "You have this wonderful way of finding joy in the little things.", order: 10 },
  { text: "Your intelligence and curiosity about the world is inspiring.", order: 11 },
  { text: "I admire your courage to always be authentically you.", order: 12 },
  { text: "The way you listen and truly hear people is a rare quality.", order: 13 },
  { text: "Your generosity and willingness to help others makes the world better.", order: 14 },
  { text: "I love how you're always growing and evolving as a person.", order: 15 },
  { text: "Your patience and understanding with others is something I aspire to.", order: 16 },
  { text: "You have an incredible way of making people feel comfortable and welcome.", order: 17 },
  { text: "Your optimism is contagious and lifts everyone around you.", order: 18 },
  { text: "I admire your resilience and how you bounce back from setbacks.", order: 19 },
  { text: "The thoughtfulness you put into everything you do doesn't go unnoticed.", order: 20 },
  { text: "Your loyalty and commitment to those you care about is beautiful.", order: 21 }
];

const initLocalDB = () => {
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    try {
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(DEFAULT_MESSAGES, null, 2));
      console.log('Created local messages database with default messages');
    } catch (err) {
      console.error('Error creating local database:', err);
    }
  }
};

const getLocalMessages = () => {
  try {
    initLocalDB();
    const data = fs.readFileSync(LOCAL_DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading local messages:', err);
    return DEFAULT_MESSAGES;
  }
};

const saveLocalMessage = (message) => {
  try {
    const messages = getLocalMessages();
    const newMessage = {
      ...message,
      _id: Date.now().toString(),
      order: messages.length
    };
    messages.push(newMessage);
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(messages, null, 2));
    return newMessage;
  } catch (err) {
    console.error('Error saving local message:', err);
    return null;
  }
};

module.exports = {
  getLocalMessages,
  saveLocalMessage,
  initLocalDB
};
