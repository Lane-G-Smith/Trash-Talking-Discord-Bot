
// find a way to trigger the bot in chat, and let people program in insults
// target a name to save with insults 
// insulting person trigger will be set to !burnNameOfPerson 
// burns can be randomly generated with random name inserted or aimed at a specific person

const makeTextResponse = (text) => {
    return {
      type: 'text',
      content: `${whatup}`
    };
  };
  const response = makeTextResponse('Hello there! How can I help you today?');

  export default makeTextResponse