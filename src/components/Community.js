import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Avatar,
  Rating,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  IconButton,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Forum as ForumIcon,
  Star as StarIcon,
  Article as ArticleIcon,
  QuestionAnswer as QAIcon,
  RateReview as ReviewIcon,
  ThumbUp as ThumbUpIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';

// Mock data for demonstration
const mockDoctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', rating: 4.8, reviews: 124, image: '/static/images/avatar/1.jpg' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', rating: 4.9, reviews: 98, image: '/static/images/avatar/2.jpg' },
  { id: 3, name: 'Dr. Emily Brown', specialty: 'Pediatrics', rating: 4.7, reviews: 156, image: '/static/images/avatar/3.jpg' },
];

const mockHealthTips = [
  { id: 1, title: '10 Tips for Better Sleep', author: 'Dr. Sarah Johnson', date: '2024-03-15', likes: 234, category: 'Wellness' },
  { id: 2, title: 'Healthy Eating Habits', author: 'Dr. Michael Chen', date: '2024-03-14', likes: 189, category: 'Nutrition' },
  { id: 3, title: 'Exercise for Heart Health', author: 'Dr. Emily Brown', date: '2024-03-13', likes: 156, category: 'Fitness' },
];

const mockQuestions = [
  { id: 1, question: 'What are the early signs of diabetes?', author: 'John D.', date: '2024-03-15', answers: 5, category: 'General Health' },
  { id: 2, question: 'How to manage stress effectively?', author: 'Mary S.', date: '2024-03-14', answers: 8, category: 'Mental Health' },
  { id: 3, question: 'Best exercises for back pain?', author: 'Robert K.', date: '2024-03-13', answers: 12, category: 'Physical Health' },
];

const mockTestimonials = [
  { id: 1, name: 'Alice M.', text: 'The online consultation was incredibly helpful. Dr. Johnson was thorough and professional.', rating: 5, date: '2024-03-15' },
  { id: 2, name: 'David R.', text: 'Great experience with the health monitoring feature. It helped me track my progress effectively.', rating: 5, date: '2024-03-14' },
  { id: 3, name: 'Sarah L.', text: 'The medication reminder system is a lifesaver. Never missed a dose since using it.', rating: 4, date: '2024-03-13' },
];

const mockForumPosts = [
  { id: 1, title: 'Living with Diabetes - Support Group', author: 'Diabetes Support', members: 1234, lastActive: '2 hours ago' },
  { id: 2, title: 'Mental Health Support Network', author: 'Mental Health Community', members: 856, lastActive: '5 hours ago' },
  { id: 3, title: 'Heart Health Discussion', author: 'Cardiac Care', members: 567, lastActive: '1 day ago' },
];

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`community-tabpanel-${index}`}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Community = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Community
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Connect with others, share experiences, and get support from our healthcare community.
      </Typography>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<ForumIcon />} label="Support Groups" />
          <Tab icon={<StarIcon />} label="Doctor Ratings" />
          <Tab icon={<ArticleIcon />} label="Health Tips" />
          <Tab icon={<QAIcon />} label="Q&A" />
          <Tab icon={<ReviewIcon />} label="Testimonials" />
        </Tabs>

        {/* Support Groups Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {mockForumPosts.map((post) => (
              <Grid item xs={12} md={6} lg={4} key={post.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Created by {post.author}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip label={`${post.members} members`} size="small" />
                      <Typography variant="caption" color="text.secondary">
                        Last active: {post.lastActive}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<ForumIcon />}>Join Group</Button>
                    <Button size="small" startIcon={<ShareIcon />}>Share</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Doctor Ratings Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {mockDoctors.map((doctor) => (
              <Grid item xs={12} md={6} lg={4} key={doctor.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar src={doctor.image} sx={{ width: 64, height: 64, mr: 2 }} />
                      <Box>
                        <Typography variant="h6">{doctor.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {doctor.specialty}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={doctor.rating} precision={0.1} readOnly />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({doctor.rating})
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {doctor.reviews} reviews
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<StarIcon />}>Rate Doctor</Button>
                    <Button size="small" startIcon={<ReviewIcon />}>Write Review</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Health Tips Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {mockHealthTips.map((tip) => (
              <Grid item xs={12} md={6} lg={4} key={tip.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {tip.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      By {tip.author} • {tip.date}
                    </Typography>
                    <Chip label={tip.category} size="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {tip.likes} likes
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<ThumbUpIcon />}>Like</Button>
                    <Button size="small" startIcon={<BookmarkIcon />}>Save</Button>
                    <Button size="small" startIcon={<ShareIcon />}>Share</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Q&A Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            {mockQuestions.map((question) => (
              <Grid item xs={12} key={question.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {question.question}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                        Asked by {question.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {question.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip label={question.category} size="small" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {question.answers} answers
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<QAIcon />}>Answer</Button>
                    <Button size="small" startIcon={<ShareIcon />}>Share</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Testimonials Tab */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            {mockTestimonials.map((testimonial) => (
              <Grid item xs={12} md={6} lg={4} key={testimonial.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        {testimonial.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">{testimonial.name}</Typography>
                        <Rating value={testimonial.rating} readOnly size="small" />
                      </Box>
                    </Box>
                    <Typography variant="body1" paragraph>
                      {testimonial.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {testimonial.date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<ThumbUpIcon />}>Helpful</Button>
                    <Button size="small" startIcon={<ShareIcon />}>Share</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Community; 