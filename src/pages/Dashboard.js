
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Container, Box, Typography, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Tab, Tabs } from '@mui/material';
// import { Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material';
// import axios from 'axios';
// import Blogs from './BlogsPage';
// import { toast, Toaster } from 'react-hot-toast';
// import FAQs from './FaqPage';

// const Dashboard = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'blogs');
//   const [blogs, setBlogs] = useState([]);
//   const [faqs, setFaqs] = useState([]);
//   const isMobile = useMediaQuery('(max-width:600px)');
//   const navigate = useNavigate();

//   const base_URL = 'https://site-scout-backend.vercel.app';

//   // Fetch data based on the active tab
//   const fetchData = async () => {
//     try {
//       if (activeTab === 'blogs') {
//         const response = await axios.get(`${base_URL}/api/blogs`);
//         setBlogs(response.data);
//       } else if (activeTab === 'faqs') {
//         const response = await axios.get(`${base_URL}/api/faqs`);
//         setFaqs(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       toast.error('Failed to fetch data. Please try again later.');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     localStorage.setItem('activeTab', activeTab);
//   }, [activeTab]);

//   const handleNavClick = (tab) => {
//     setActiveTab(tab);
//     setDrawerOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');  // Clear token
//     navigate('/login');  // Redirect to login page
//     toast.success('Logged out successfully!');
//   };

//   const renderTabContent = () => {
//     if (activeTab === 'blogs') {
//       return <div style={{margin:'4vh'}}><Blogs blogs={blogs} /></div>;
//     } else if (activeTab === 'faqs') {
//       return <FAQs faqs={faqs} />;
//     }
//   };

//   return (
//     <Container maxWidth="lg">
//       {/* AppBar/Navbar */}
//       <AppBar position="sticky" sx={{ backgroundColor: '#C7D3D4FF' }}>
//         <Toolbar>
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={() => setDrawerOpen(true)}
//             sx={{ display: isMobile ? 'block' : 'none' }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" sx={{ flexGrow: 1, color: '#603F83FF' }}>
//             Dashboard
//           </Typography>

//           {/* Logout Button */}
//           <Button
//             variant="outlined"
//             color="inherit"
//             onClick={handleLogout}
//             sx={{
//               marginLeft: 2,
//               color: '#603F83FF',
//               borderColor: '#603F83FF',
//             }}
//             startIcon={<LogoutIcon />}
//           >
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Drawer for Mobile */}
//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: 250,
//             backgroundColor: '#f4f4f4',
//           },
//         }}
//       >
//         <List>
//           <ListItem button onClick={() => handleNavClick('blogs')}>
//             <ListItemText primary="Manage Blogs" />
//           </ListItem>
//           <ListItem button onClick={() => handleNavClick('faqs')}>
//             <ListItemText primary="Manage FAQs" />
//           </ListItem>
//           <ListItem button onClick={handleLogout}>
//             <ListItemText primary="Logout" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Tab Navigation */}
//       <Box sx={{ padding: 3 }}>
//         <Tabs value={activeTab} onChange={(e, newTab) => setActiveTab(newTab)} variant="scrollable" scrollButtons="auto">
//           <Tab label="Blogs" value="blogs" />
//           <Tab label="FAQs" value="faqs" />
//         </Tabs>

//         {/* Tab Content */}
//         {renderTabContent()}
//       </Box>

//       {/* Toast Notifications */}
//       <Toaster />
//     </Container>
//   );
// };

// export default Dashboard;







import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Tab, Tabs } from '@mui/material';
import { Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material';
import axios from 'axios';
import Blogs from './BlogsPage';
import { toast, Toaster } from 'react-hot-toast';
import FAQs from './FaqPage';

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Check if there is a stored tab in localStorage, if not default to 'blogs'
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'blogs');
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  const base_URL = 'https://site-scout-backend.vercel.app';

  // Fetch data based on the active tab
  const fetchData = async () => {
    try {
      if (activeTab === 'blogs') {
        const response = await axios.get(`${base_URL}/api/blogs`);
        setBlogs(response.data);
      } else if (activeTab === 'faqs') {
        const response = await axios.get(`${base_URL}/api/faqs`);
        setFaqs(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
    // Store the active tab in localStorage when the activeTab changes
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token
    localStorage.removeItem('activeTab'); // Clear activeTab from localStorage on logout
    navigate('/login');  // Redirect to login page
    toast.success('Logged out successfully!');
  };

  const renderTabContent = () => {
    if (activeTab === 'blogs') {
      return <div style={{ margin: '4vh' }}><Blogs blogs={blogs} /></div>;
    } else if (activeTab === 'faqs') {
      return <FAQs faqs={faqs} />;
    }
  };

  return (
    <Container maxWidth="lg">
      {/* AppBar/Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: '#C7D3D4FF' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: isMobile ? 'block' : 'none' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#603F83FF' }}>
            Dashboard
          </Typography>

          {/* Logout Button */}
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
            sx={{
              marginLeft: 2,
              color: '#603F83FF',
              borderColor: '#603F83FF',
            }}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            backgroundColor: '#f4f4f4',
          },
        }}
      >
        <List>
          <ListItem button onClick={() => handleNavClick('blogs')}>
            <ListItemText primary="Manage Blogs" />
          </ListItem>
          <ListItem button onClick={() => handleNavClick('faqs')}>
            <ListItemText primary="Manage FAQs" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Tab Navigation */}
      <Box sx={{ padding: 3 }}>
        <Tabs value={activeTab} onChange={(e, newTab) => setActiveTab(newTab)} variant="scrollable" scrollButtons="auto">
          <Tab label="Blogs" value="blogs" />
          <Tab label="FAQs" value="faqs" />
        </Tabs>

        {/* Tab Content */}
        {renderTabContent()}
      </Box>

      {/* Toast Notifications */}
      <Toaster />
    </Container>
  );
};

export default Dashboard;
