import React, { useEffect, useState } from 'react';
import { Button, TextField,FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const BlogEditor = ({selectedTopic}) => {
  console.log(selectedTopic)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tone, setTone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  
  useEffect(()=>{
    setTitle(selectedTopic?.name);
  },[])
  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleToneChange = (event) => {
    setTone(event.target.value);
  };

  const handleGenerateClick = ()=>{

  }

  const handleGenerateClickGPT = async () => {
    console.log('Title:', title);
    console.log('Content:', content);

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        prompt: `# Blog Content\n\nTitle: ${title}\nContent:\n${content}`,
        model:"text-davinci-002",
        max_tokens: 200,
        temperature: 0.7,
        n: 1,
      }, {
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
      });

      const generatedContent = response.data.choices[0].text;
      console.log('Generated Content:', generatedContent);
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(`Error: ${error.message}`);
        setAlertOpen(true);
        setTimeout(() => {
          setAlertOpen(false);
        }, 3000);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['undo', 'redo'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'undo',
    'redo',
  ];

  return (
    <div className="BlogEditor">
      
      <Typography variant="h4">Blog Editor</Typography>
      <TextField label="Blog Title" value={title} style={{fontWeight:900, fontSize:'20px'}} onChange={handleTitleChange} fullWidth margin="normal" />
      <FormControl fullWidth margin="normal">
        <InputLabel>Tone</InputLabel>
        {tone && <br/>}
        <Select value={tone} onChange={handleToneChange}>
          <MenuItem value="">Select Tone</MenuItem>
          <MenuItem value="Formal">Formal</MenuItem>
          <MenuItem value="Casual">Casual</MenuItem>
          <MenuItem value="Professional">Professional</MenuItem>
          <MenuItem value="Friendly">Friendly</MenuItem>
        </Select>
      </FormControl>
      
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        style={{ height: '400px' }}
        placeholder="Write your blog content..."
      />
      <div style={{margin:'50px 10px'}}>
      <Button variant="contained" onClick={handleGenerateClick}>
        Generate
      </Button>
      <Button variant="contained" style={{width:'250px', margin: '0 10px'}} endIcon={<KeyboardArrowRightIcon />} onClick={handleGenerateClickGPT}>
        Generate Using ChatGPT
      </Button>
      {alertOpen && <Alert severity="error">
        <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>}
      </div>
    </div>
  );
};

export default BlogEditor;
