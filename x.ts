

import { createClient } from '@deepgram/sdk';
import fs from 'fs';

const listen = async () => {
  const deepgramApiKey = '5ead50bf366f7e011a991be79b16c7ce729348b4';
  // const url = 'https://static.deepgram.com/examples/Bueller-Life-moves-pretty-fast.wav';
  const deepgram = createClient(deepgramApiKey);

  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    fs.readFileSync("C:/Users/mrith/Downloads/asd.wav"),
    {
      model: 'nova-2',
      language: 'en',
      smart_format: true,
    },
    
  );

  if (error) {
    console.error(error);
  } else {
    console.dir(result, { depth: null });
  }
}

listen();
