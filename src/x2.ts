import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
let data = new FormData();
data.append('file', '');
data.append('recordedB', fs.createReadStream('C:/Users/mrith/Downloads/RecordedScreenWithAudio.webm"'));

let config = {
  method: 'put',
  maxBodyLength: Infinity,
  url: 'https://s3.us-west-002.backblazeb2.com/FathomVideo/videos/1735345406986.webm?AWSAccessKeyId=da54fadef64d&Content-Type=video%2Fwebm&Expires=1735345466&Signature=%2FKFVTogatKl9mryK9JtL932gWV4%3D',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});