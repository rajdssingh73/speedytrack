import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import BlogEditor from './BlogEditor';
const Topics = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [topicName, setTopicName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);  
  const [errorMessage, setErrorMessage] = useState('');

  const [topicsData,setTopicsData] = useState([
    {
      category: 'All',
    },
    {
      category: 'Custom',
      topics: [
        { name: '10 Ways to Boost Your Sales Online', keywords: ['SEO', 'Search Engine Optimization', 'Google Ranking','Website Ranking'] },
        { name: 'Best Digital Marketing Practices of 2023', keywords: ['Social Media Marketing', 'Influencers Marketing', 'Facebook/Instagram utilization'] },
      ],
    },
    {
      category: 'ICP',
      topics: [
        { name: 'Reduce Your Customer Cost of Aquisitions by 30%', keywords: ['Reduce CAC', 'ChatGPT utilization'] },
      ],
    },
    {
      category: 'Mission',
      topics: [
        { name: 'Move Faster than Ever with Age of AI', keywords: ['AI Utilization', 'New Age Tech', ' grow fast'] },
        { name: 'Improve Employee Productivity by 50% using AI', keywords: ['prpductivity'] },
      ],
    },
    {
      category: 'Product',
      topics: [
        { name: 'Top 10 Must-Have Gadgets for Tech Enthusiasts in 2023', keywords: ['tech gadgets', 'gadgets of 2023', 'trending gadgets'] },
        { name: 'The Latest Innovations in Product Design and Technology', keywords: ['Technology', 'Product Design', 'Innovation'] },
        { name: 'The Future of E-commerce: Emerging Trends and Innovative Products', keywords: ['Emerging Trends', 'Ecommerce', 'Innovation'] },
      ],
    },
  ]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddTopicClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setTopicName('');
    setKeywords('');
  };
  const handleMainDialogClose =()=>{
    setOpenNew(false);
  }

  const handleAddTopic = () => {
    if(selectedCategory ==='All'){
        setErrorMessage('Error: All Categories Selected, Select Any One Category to Add!');
        setAlertOpen(true);
        setTimeout(() => {
          setAlertOpen(false);
        }, 6000);
        return;
    }else if(topicName.trim()==''||keywords.trim()==''){
        setErrorMessage('Error: Topic Name or Keywords Missing!');
        setAlertOpen(true);
        setTimeout(() => {
          setAlertOpen(false);
        }, 3000);
        return;
    }else{
    const newTopic = { name: topicName, keywords: keywords.split(',') };
    const updatedTopicsData = topicsData.map((category) => {
      if (category.category === selectedCategory) {
        return {
          ...category,
          topics: [...category.topics, newTopic],
        };
      }
      return category;
    });
    setTopicsData(updatedTopicsData);
    }
    handleDialogClose();
  };

  const [openNew, setOpenNew] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState({});
  const handleWriteButton = (topic)=>{
    console.log('topicName', topic)
    setOpenNew(true);
    setSelectedTopic(topic);
  }

  return (
    <div className="TopicsContainer">
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <div className="categoryTop">
        <div className="categoryList">
          {topicsData?.map((category, index) => (
            <div key={index}>
              <Typography
                variant="h6"
                className={`category-title ${selectedCategory === category.category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.category)}
              >
                {category.category}
              </Typography>
            </div>
          ))}
        </div>
        <Button variant="contained" style={{ backgroundColor: 'rgb(230, 34, 77)' }} endIcon={<KeyboardArrowRightIcon />} onClick={handleAddTopicClick}>
          Add Topic
        </Button>
      </div>
      <Typography variant="h6" gutterBottom>
        Recommended Topics
      </Typography>
      <div className="topicsList">
        {topicsData.map((category, index) => (
          <div key={index} className={`category-topics ${selectedCategory === category.category || selectedCategory === 'All' ? 'show' : 'hide'}`}>
            {category.topics &&
              category.topics.map((topic, i) => (
                <div key={i} className='topicIndividual'>
                    <div>
                  <Typography variant="h6">{topic.name}</Typography>
                  {/* <Typography variant="subtitle1" color="textSecondary">
                    Keywords: {topic.keywords.join(', ')}
                  </Typography> */}
                  <div className='keywordParent'>
                  {topic.keywords.map((keyword, i)=>(
                    <div className="default-btn" key={i}>
                    <span className="keyword-txt">{keyword}</span>
                  </div>
                  ))}
                  </div>
                  </div>
                  <Button variant="contained" style={{ backgroundColor: 'rgb(230, 34, 77)' }} endIcon={<KeyboardArrowRightIcon />} onClick={() => handleWriteButton(topic)}>
                    Write  
                  </Button>
                </div>
              ))}
          </div>
        ))}
      </div>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Topic</DialogTitle>
        <DialogContent>
          <TextField label="Topic Name" value={topicName} onChange={(e) => setTopicName(e.target.value)} fullWidth margin="normal" />
          <TextField label="Keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} fullWidth margin="normal" />
        </DialogContent>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
          <Button variant="contained" color='error' onClick={handleDialogClose} style={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleAddTopic}>
            Add
          </Button>
        </div>
        {alertOpen && <Alert severity="error">
        <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>}
      </Dialog>
      <Dialog  open={openNew} onClose={handleMainDialogClose}>
        <BlogEditor selectedTopic = {selectedTopic}/>
      </Dialog>
      
    </div>
  );
};

export default Topics;