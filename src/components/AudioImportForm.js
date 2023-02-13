import React, { useState } from 'react';
import './AudioImportForm.css'

const AudioImportForm = () => {
  const [audioFileUrl, setAudioFileUrl] = useState('');
  const [transcription, setTranscription] = useState(null);

  const handleUrlChange = (event) => {
    setAudioFileUrl(event.target.value);
    setTranscription(null);
  }


  const handleTranscription = async () => {

    
   

   //////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, app ID, and the details of the new
    // custom workflow we want to create. Change these strings to run your own example.
    /////////////////////////////////////////////////////////////////////////////////////////

    const USER_ID = "ali11hamad";
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "223ca299c4534346ba5b6d6b4be8a3b5";
    const APP_ID = "my-second-application";
    // Change these to make your own predictions
    const WORKFLOW_ID = "my-custom-workflow";
    // const AUDIO_URL = "https://voiceage.com/wbsamples/in_mono/Conference.wav";

    

    
  
    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    /////////////////////////////////////////////////////////////////////////////////// 
  
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "audio": {
              "url": audioFileUrl
            }
          }
        }
      ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

   
  
    fetch(`https://api.clarifai.com/v2/workflows/${WORKFLOW_ID}/results`, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Extract the text from the response
        const text = data.results[0].outputs[0].data.text.raw;
        setTranscription(text);
      })
      .catch(error => console.log('error', error));
    }
  
  return (
//    
<div className="vh-100 dt w-100 tc">
<div className="pa4 dtc v-mid">
      <form className="mb3">
        <input className='input-field' type="text" placeholder="Enter audio file URL" onChange={handleUrlChange} />
      </form>
      {audioFileUrl ? (
        <div className="audio-controls">
          <div className="audio-player">
          <audio controls className="center mb3">
            <source src={audioFileUrl} type={audioFileUrl.type} />
            Your browser does not support the audio element.
          </audio>
          </div>
          <div className=' transcribe-button'>
          <button className=" f3 link dim br3 ph3 pv2 mb2 dib white bg-black" onClick={handleTranscription}>
            Transcribe Audio
          </button>
        </div>
        </div>
      ) : (
        
        <p className="f2 mb3">Enter an audio file URL to load the audio and transcribe it.<br /> audio file should be in <strong>.WAV FORMAT</strong> </p>
        
        
        
      )}
      {transcription && (
        <p className="f2 mb3 transcription">Transcription: {transcription}</p>
      )}
    </div>
    </div>
  );
      };
export default AudioImportForm;
