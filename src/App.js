import React, { useState, useEffect, memo } from 'react';
import { 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Grid, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Box, 
  Card, 
  CardContent 
} from '@mui/material';

const SkillItem = memo(({ skill, onDelete }) => (
  <li style={{ listStyleType: 'none', marginBottom: '10px' }}>
    <Typography variant="body1" component="span">
      {skill}
    </Typography>
    <Button
      style={{ marginLeft: '10px' }}
      variant="outlined"
      color="secondary"
      onClick={() => onDelete(skill)}
    >
      Delete
    </Button>
  </li>
));

function App() {
  
  const [newSkill, setNewSkill] = useState('');
  const [category, setCategory] = useState('Frontend');  
  const [skills, setSkills] = useState({
    Frontend: [],
    Backend: [],
    Other: []
  });
  const [error, setError] = useState('');
  const [counter, setCounter] = useState(0);  

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve({
            Frontend: ['JavaScript', 'React'],
            Backend: ['Node.js', 'Express'],
            Other: ['Git', 'Docker']
          }), 1000)
        );
        setSkills(response);  
      } catch (error) {
        setError('Failed to fetch skills');
      }
    };

    fetchSkills();
  }, []);

  const addSkill = () => {
    if (newSkill.trim() === '') {
      setError('Skill cannot be empty');
    } else {
      setSkills({
        ...skills,
        [category]: [...skills[category], newSkill]  
      });
      setNewSkill('');
      setError('');
    }
  };

  const deleteSkill = (skillToDelete, skillCategory) => {
    if (window.confirm(`Are you sure you want to delete ${skillToDelete}?`)) {
      const updatedSkills = skills[skillCategory].filter(skill => skill !== skillToDelete);
      setSkills({
        ...skills,
        [skillCategory]: updatedSkills
      });
    }
  };

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    setCounter(counter > 0 ? counter - 1 : 0); 
  };

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Skill Tracker
        </Typography>
      </Box>

      <Card elevation={3} style={{ padding: '20px', marginBottom: '30px' }}>
        <Grid container spacing={2} alignItems="center">
          {}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Add a new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              error={Boolean(error)}
              helperText={error ? 'Skill cannot be empty' : ''}
            />
          </Grid>

          {}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="Backend">Backend</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {}
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={addSkill}
              sx={{ height: '100%' }}
            >
              Add Skill
            </Button>
          </Grid>
        </Grid>
      </Card>

      {}
      <Card elevation={3} style={{ padding: '20px', marginBottom: '30px' }}>
        <Typography variant="h6" align="center">Counter: {counter}</Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={incrementCounter}
            sx={{ marginRight: '10px' }}
          >
            Increment
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={decrementCounter}
          >
            Decrement
          </Button>
        </Box>
      </Card>

      {}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Frontend Skills
              </Typography>
              <ul style={{ padding: 0 }}>
                {skills.Frontend.map((skill, index) => (
                  <SkillItem key={index} skill={skill} onDelete={() => deleteSkill(skill, 'Frontend')} />
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Backend Skills
              </Typography>
              <ul style={{ padding: 0 }}>
                {skills.Backend.map((skill, index) => (
                  <SkillItem key={index} skill={skill} onDelete={() => deleteSkill(skill, 'Backend')} />
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Other Skills
              </Typography>
              <ul style={{ padding: 0 }}>
                {skills.Other.map((skill, index) => (
                  <SkillItem key={index} skill={skill} onDelete={() => deleteSkill(skill, 'Other')} />
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;