

const testing = function() {

    const countDownDate = new Date("Sep 5, 2022 15:37:25").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    console.log(days, hours, minutes, seconds);



    return {
        days,
        hours,
        minutes,
        seconds
    }
}

const {days, hours, minutes, seconds} = testing()
console.log(days, hours, minutes, seconds);










import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { useApplicationSettings } from '../settings/ApplicationSettings';
import { Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import TourIcon from '@mui/icons-material/Tour';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const TourGuide = () => {
  const [tour, setTour] = useState(null);
  const location = useLocation();
  const { companySettings, setcompanySettings } = useApplicationSettings();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleGetCompanySettings = useCallback(
    async () => {
      try {
        const response = await fetch('/api/get_company_settings', {
          signal: abortController.signal // Add the abort signal to the fetch
        })
        const newData = await response.json()
        if (response.ok) {
          // setcompanySettings(newData)
          const { contact_info, company_name, email_info, logo_url } = newData
          setcompanySettings((prevData) => ({ ...prevData, contact_info, company_name, email_info, logo_preview: logo_url }))
          console.log('company settings fetched', newData)
        } else {
          console.log('failed to fetch company settings')
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          console.log("error fetching company settings", error)
        }
      }
    },
    [],
  )

  useEffect(() => {
    handleGetCompanySettings()
    return () => {
      // This cleanup function runs when component unmounts
    }
  }, [handleGetCompanySettings])

  const { company_name } = companySettings
  useEffect(() => {
    const newTour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shadow-md bg-purple-dark',
        scrollTo: true,
        cancelIcon: {
          enabled: true
        }
      }
    });

    if (location.pathname.includes('/dashboard')) {
      newTour.addSteps([
        {
          id: 'welcome',
          text: `Welcome to ${company_name} Let\'s take a quick tour of your dashboard.`,
          buttons: [
            {
              text: 'Skip',
              classes: 'custom-skip-button',
              action: function () {
                return this.complete();
              }
            },
            {
              text: 'Next',
              classes: 'custom-next-button',

              action: function () {
                return this.next();
              }
            }
          ]
        },

        {
          id: 'sidebar',
          title: 'Sidebar',
          attachTo: {
            element: '#sidebar-multi-level-sidebar',
            on: 'right'
          },
          text: 'This is your navigation menu. You can access all main features from here.',
          buttons: [
            { classes: 'custom-skip-button', text: 'Back', action: function () { return this.back(); } },
            {
              text: 'Next',

              classes: 'custom-next-button',
              action: function () {
                return this.next();
              }
            }
          ]
        },

        {
          id: 'profile',
          title: 'Profile',
          attachTo: {
            element: '.profile',
            on: 'right'
          },
          text: 'View and edit your profile information here.',
          buttons: [
            {
              classes: 'custom-skip-button',
              text: 'Back',
              action: function () {
                return this.back();
              },

            },
            {
              classes: 'custom-skip-button',
              text: 'Next',
              action: function () {
                return this.next();
              }

            }
          ]
        },


        {
          id: 'notifications',
          scrollTo: true,
          attachTo: {
            element: '.notifications-bell',
            on: 'right'
          },
          text: 'Notifications will appear here if you have any new message or upcoming updates',

          buttons: [
            {
              text: 'Back',
              classes: 'custom-skip-button',
              action: function () {
                return this.back();
              }
            },
            {
              text: 'Next',
              action: function () {
                return this.next();
              }
            }
          ]
        },

        {
          id: "dark light mode",
          attachTo: {
            element: '.dark-light',
            on: 'left'
          },
          text: [
            "change the background color of the current page to dark or light mode",
          ],
          scrollTo: false,
          arrow: true,

          buttons: [
            {
              text: 'Back',
              classes: 'custom-skip-button',
              action: function () {
                return this.back();
              }
            },
            {
              text: 'Next',
              action: function () {
                return this.next();
              }
            }
          ]
        },




        {
          id: "sidebar-toggle",
          attachTo: {
            element: '.sidebar-toggle',
            on: 'bottom'
          },
          text: [
            "use this to reveal or hide the sidebar on the current page to the left",
          ],
          scrollTo: false,
          arrow: true,

          buttons: [
            {
              text: 'Back',
              classes: 'custom-skip-button',
              action: function () {
                return this.back();
              }
            },
            {
              text: 'Next',
              action: function () {
                return this.next();
              }
            }
          ]
        },




        {
          id: "user-invite-card",
          attachTo: {
            element: '.user-invite-card',
            on: 'bottom'
          },
          text: [
            "shortcut to invite a new user account to your company",
          ],
          scrollTo: false,
          arrow: true,

          buttons: [
            {
              text: 'Back',
              classes: 'custom-skip-button',
              action: function () {
                return this.back();
              }
            },
            {
              text: 'Next',
              action: function () {
                return this.next();
              }
            }
          ]
        },


        {
          id: "manage-payment-card",
          attachTo: {
            element: '.manage-payment-card',
            on: 'bottom'
          },
          text: [
            "shortcut to invite to view and manage customer transactions",
          ],
          scrollTo: false,
          arrow: true,

          buttons: [
            {
              text: 'Back',
              classes: 'custom-skip-button',
              action: function () {
                return this.back();
              }
            },
            {
              text: 'Next',
              action: function () {
                return this.next();
              }
            }
          ]
        },



        {
          id: "timer",
          attachTo: {
            element: '.timer',
            on: 'bottom'
          },
          text: [
            "shows the current time",
          ],
          scrollTo: false,
          arrow: true,

          buttons: [
            {
              text: 'Back',
              classes: 'custom-skip-button',
              action: function () {
                return this.back();
              }
            },
            {
              text: 'Next',
              action: function () {
                return this.next();
              }
            }
          ]
        },




        {
          id: "welcome-message",
          attachTo: {
            element: '.welcome-message',
            on: 'bottom'
          },
          text: [
            "Greetings to you, this is your welcome message",
          ],
          scrollTo: false,
          arrow: true,

          buttons: [
            {
              text: 'Back',
              classes: 'custom-skip-button',
              action: function () {
                return this.back();
              }
            },
            {
              text: 'Next',
              action: function () {
                return this.next();
              }
            }
          ]
        },






        {
          id: 'finish',
          text: `That\'s it! You\'re ready to start using
           ${company_name}. You can restart this tour 
           anytime from the help menu.`,
          buttons: [
            { classes: 'custom-skip-button', text: 'Finish', action: function () { return this.complete(); } }
          ]
        }
      ]);
    }
    setTour(newTour);

    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour && location.pathname.includes('/dashboard')) {
      newTour.start();
      localStorage.setItem('hasSeenTour', 'true');
    }

    return () => {
      if (newTour) {
        newTour.complete();
      }
    };
  }, [location]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStartTour = () => {
    handleClose();
    if (tour) {
      tour.start();
    }
  };

  const handleContactSupport = () => {
    handleClose();
    window.location.href = 'mailto:support@qualitysmiles.com';
  };

  const handleViewDocs = () => {
    handleClose();
    window.open('/docs', '_blank');
  };

  return (
    <>
      <Tooltip title="Help & Resources">
        <IconButton
          onClick={handleClick}
          className="help-button"
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'green',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkgreen',
            },
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1000
          }}
        >
          <HelpIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleStartTour}>
          <TourIcon sx={{ mr: 1 }} />
          Start Interactive Tour
        </MenuItem>
        <MenuItem onClick={handleViewDocs}>
          <LiveHelpIcon sx={{ mr: 1 }} />
          View Documentation
        </MenuItem>
        <MenuItem onClick={handleContactSupport}>
          <ContactSupportIcon sx={{ mr: 1 }} />
          Contact Support
        </MenuItem>
      </Menu>
    </>
  );
};

export default TourGuide;

