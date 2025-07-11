const { text } = require("express");

class MessageService {
  constructor() {
    this.messages = this.getDefaultMessages();
  }
  
  getDefaultMessages() {
    return [
      { _id: "1", text: "The world deserves someone like you who speaks life into others, who has dreams to change the world and fully devotes themselves to helping others. You are one of the brightest minds I know and you bring so much joy and light into the world. I want you to know that you are seen and loved. I pray that everything you do is blessed and that I get to see you making your mark in this world is a blessing in itself. Here's day 1 of 22. 💗", order: 0 },
      { _id: "2", text: "If ambition was a person it would be you. I've never met someone so driven and passionate about the things that they love. You inspire me each and every day. You always push me to do the things that I love and to never give up even when I'm so done with it. You are such a rock and I hope that fire in you never dies. I'm so proud of the person you are and the person you continue to be everyday. Here's to day 2 of 22💗", order: 1 },
      { _id: "3", text: "It's very rare to find someone who wears his heart on his sleeve like you do. You never keep me guessing on where we are or how you feel and you're always honest about that. You don't mince your words when you speak about your values or faith. You're firm but also carry alot of grace with you. You're all the things they say love to be; kind, patient, selfless and many more. I'm grateful to be part of that love you carry so dearly. Here's to day 3 of 22💗", order: 2 },
      { _id: "4", text: "One of the things that drew me to you was your faith. Believing in something greater than your self or the world as strongly as you do shows so much about your charachter. You carry that with you so proudly and so firmly. I love that you try to share pieces of that with me and you slowly bring me into your world. It’s one of the things that I never expected from you but it’s also one of the things that draw me closer to you everyday. Here’s to day 4 of 22💗", order: 3 },
      { _id: "5", text: "Being with you makes me calm down in so many ways. I’m not someone used to reassuarance. I usually cringe so much from people pouring their hearts out to me. But from you it’s like a warm hug, what keeps me moving through the days. You remind me that I’m not too much and that you’re always here. You always hold my hand through the days that feel so bleak. I don’t doubt alot when you’re with me because you always remind me that I can do anything I put my mind to. That I shouldn’t give up and that you’ll always be next to me. You’re my light and I can only hope to be the same for you. Here’s to day 5 of 22💗", order: 4 },
      { _id: "6", text: "Most people don’t like change. I mean even you sometimes😭. But whenever I’ve mentioned something that I don’t like or makes me feel some type of way you always make it right. Granted most times I don’t even see the unreasonableness in my claims but you never complain about it. You go out of your way to make me happy even if it’s the littlest thing. You pay so much attention to details that I usually miss. You always say that you know me better than myself.(I still heavily doubt that) but you’re well on your way there. You give me so much grace and patience that I don’t give myself a lot. You make me realize that things don’t have to be perfect for them to work. You keep me grounded because Lord knows I love to fly sometimes. You’re the voice in my head that says everything will be okay even when I don’t believe it. I adore how you’re able to be a voice of reason every time and still have compassion as well. Dealing with me isn’t easy but somehow you always make me feel like I’m not doing much even when I feel like I’ve over the top. I love you! Here’s to day 6 of 22💗", order: 5 },
      { _id: "7", text: "I know I’m the funny person in this relationship ofcourse but you make me laugh sometimes. Even though I take things so seriously sometimes. Your light hearted banter keeps me going. I don’t take the little  moments that we have together for granted. I don’t think I’ve stopped smiling since we met. Even if we have our downs the ups are worth more. You remind me that there’s always joy around me because you don’t stop calling me that anyway and I don’t want you to honestly. You’ve become the best part of my days and nights. What I look foward to after a long day. I don’t think it’s possible to have bad days when you exist in my life. I pray that I make your days brighter and lighter and that you always feel happy by my side. Well I know you do cause you always show you’re 32 teeth around me😭. All in all you’re my happiness and I love that I get to experience the joy you carry around everyday. Here’s to day 7 of 22💗", order: 6 },
      { _id: "8", text: "I know I call you a patient person alot but it’s barely enough to describe you. You carry yourself with so much grace and it shows in everything that you do. The way you talk and how you present yourself even when you’re upset is just a small example of that. It something that makes loving you the easiest thing to do. You give so much grace to the people around you and I know because I feel it everyday. You make want to become a better person and sometimes just have a little bit of the grace you have. I hope that you remember to give yourself the same grace that you show others, to go east on yourself sometimes and to rest whenever you need to. Even if you forget I’ll always be here to remind you to breathe and relax. I hope that in the love I give you, you also feel grace, that you know that you don’t have to be perfect because I love you with every bit and you should never forget that. Here’s to day 8 of 22💗", order: 7},
      { _id: "9", text: "You have this fighting spirit that I really admire. Most days it keeps me going in my own individual pursuits. When ever I feel tired or like giving up I just imagine what would Thuo do and giving up is never an option. I know I say that you inspire me a lot but having someone in my corner who’s always rooting for me everyday is what pushes me to do more for myself and for us. You’ve show me through how you live your life that there’s always something to look forward to and something to fight for. You listen to me when I complain about something that’s not going right and know just the words to say to make me fight for what I want. Everyday with you makes me have a clear vision of my life. A life that I want to have with you and one that I want to build. You make me feel celebrated of my achievements even when I don’t feel like they’re much. You push me to be a better version of myself everyday. I love you because I already see the traits of who I want to be in you and I see that our goals always align. I wouldn’t want anyone else cheering me on if it wasn’t you. In return I’ll always be here to cheer you on and tell you how proud of you I am everyday. In these 4 months that we’ve been getting to know each other I’ve not only seen you grow everyday but also seen you push yourself to limits I didn’t even know was possible. You’re everything I want and need and more and I’m always here to tell you I’m proud of you. Here’s to day 9💗", order: 8},
      { _id: "10", text: "I think my favourite part of being with you is just spending time with you. Taking a nap in between school because I need a break from the day or just sitting in silence with you. It brings me so much peace and joy. It makes me feel same. The moments when you look at me with the kindest eyes and even without saying anything and I can feel so much love held within that gaze. I’ve always wanted a soft love where I feel safe and you’ve given me that. I’m grateful everyday to get to experience the gentle person that you are and pure love that you have to give. Here’s to day 10💗", order: 9 }
    ];
  }

  async findAll() {
    console.log('Returning all default messages');
    return this.messages;
  }

  async create(messageData) {
    const newMessage = {
      _id: new Date().getTime().toString(),
      text: messageData.text,
      order: this.messages.length
    };
    this.messages.push(newMessage);
    return newMessage;
  }
}

const messageService = new MessageService();

module.exports = {
  messageService
};
