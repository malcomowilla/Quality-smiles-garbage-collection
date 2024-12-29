import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import { useApplicationSettings } from './ApplicationSettings';
import { defaultThemeColors } from './ThemeConfig';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { ImSpinner9 } from "react-icons/im";
import toaster, { Toaster } from 'react-hot-toast';
import { BiHappy } from "react-icons/bi";
import { FaRegAngry } from "react-icons/fa";
import { useCallback, useEffect } from 'react';
import axios from 'axios';



const ColorPickerField = ({ label, color, onChange,  }) => {
 
  const [showPicker, setShowPicker] = useState(false);
  const safeColor = color || '#000000';


  return (
    <div className="relative">
      <TextField
        fullWidth
        label={label}
        value={safeColor}
        onClick={() => setShowPicker(true)}
        InputProps={{
          startAdornment: (
            <div
              className="w-8 h-8 mr-2 rounded border cursor-pointer"
              style={{ backgroundColor: color }}
            />
          ),
        }}
      />
      {showPicker && (
        <div className="absolute z-10 mt-2">
          <div className="fixed inset-0" onClick={() => setShowPicker(false)} />
          <HexColorPicker color={safeColor} onChange={onChange} />
        </div>
      )}
    </div>
  );
};  

const ThemeSettings = () => {
const { setMaterialuiTheme, materialuitheme,
  themeColors, setThemeColors
 } = useApplicationSettings();
 
 const [loading, setloading] = useState(false);

  const [isSaving, setIsSaving] = useState(false);








  

  const saveThemeSettings = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setloading(true)
    try {
      const response = await axios.post('/api/create_theme_settings', {
        theme_settings: themeColors
      });
      
      if (response.data.success) {
        setloading(false)
        toaster.success('Theme settings saved successfully!', {
          duration: 3000,
          icon: <BiHappy className='text-yellow-500 w-6 h-6'/>
        });
      } else {
        setloading(false)
        toaster.error(error.response?.data?.message ||
          'Failed to save theme settings',{
           icon: <FaRegAngry className='text-red-500'/>,
           duration: 4000
          });
      }
    } catch (error) {
      setloading(false)
      console.error('Error saving theme settings:', error);
      toaster.error(error.response?.data?.message ||
         'Failed to save theme settings',{
          icon: <FaRegAngry className='text-red-500'/>,
          duration: 4000
         });
    } finally {
      setloading(false)
      setIsSaving(false);
    }
  };



  const handleColorChange = (colorKey, value) => {
    setThemeColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  const resetColors = () => {
    setThemeColors(defaultThemeColors);
  };







  const loadThemeSettings = useCallback(async () => {
    try {
      const response = await fetch('/api/get_theme_settings');
      const data = await response.json();
      if (response.ok) {
        setThemeColors(prevColors => ({
          ...defaultThemeColors,
          ...data[0]
        })); 
      }else{
        setThemeColors(defaultThemeColors);
        toaster.error(error.response?.data?.message ||
          'Failed to load theme settings',{
           icon: <FaRegAngry className='text-red-500'/>,
           duration: 4000
          });
      }
    } catch (error) {
      toaster.error(error.response?.data?.message ||
        'Failed to load theme settings',{
         icon: <FaRegAngry className='text-red-500'/>,
         duration: 4000
        });
      console.error('Error loading theme settings:', error);
    }
  }, []);
  
  useEffect(() => {
    loadThemeSettings();
  }, [loadThemeSettings]);
  
  return (
    <>
    <Toaster  position='top-center'/>
    <Box className="p-6 bg-white rounded-lg shadow-sm">
      <form onSubmit={saveThemeSettings }>
      <div className="flex justify-between items-center mb-6">
        <p className='text-black p-3 font-light edu_ustralia_font text-lg tracking-widest'>
          Theme Customization
        </p>
        <button
          onClick={resetColors}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Reset to Default
        </button>
      </div>
      
      <Grid container spacing={4}>
        <Stack direction='column' className='myTextField' sx={{
          '& .MuiTextField-root': { 
            m: 1, 
            width: '90ch',  
            marginTop: '30px',  
            '& label.Mui-focused': {
              color: 'black',
              fontSize: '16px'
            },
            '& .MuiOutlinedInput-root': {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
                borderWidth: '3px'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              }
            } 
          },
        }} spacing={{xs: 1, sm: 2}}>
          <Grid item xs={12} md={6}>
            <ColorPickerField
              label="Primary Color"
              color={themeColors.primary_color}
              onChange={(color) => handleColorChange('primary_color', color)}
            />
            <ColorPickerField
              label="Secondary Color"
              color={themeColors.secondary_color}
              onChange={(color) => handleColorChange('secondary_color', color)}
            />
            <ColorPickerField
              label="Background Color"
              color={themeColors.background_color}
              onChange={(color) => handleColorChange('background_color', color)}
            />
            <ColorPickerField
              label="Text Color"
              color={themeColors.text_color}
              onChange={(color) => handleColorChange('text_color', color)}
            />
          </Grid>

          <Grid item xs={12} md={6}>

        <ColorPickerField
              label="Sidebar Menu Items Background Color Active"
              color={themeColors.sidebar_menu_items_background_color_active  || '#008000'}
              onChange={(color) => handleColorChange('sidebar_menu_items_background_color_active', color)}
            />

            <ColorPickerField
              label="Sidebar Color"
              color={themeColors.sidebar_color}
              onChange={(color) => handleColorChange('sidebar_color', color)}
            />
            <ColorPickerField
              label="Header Color"
              color={themeColors.header_color}
              onChange={(color) => handleColorChange('header_color', color)}
            />
            <ColorPickerField
              label="Accent Color"
              color={themeColors.accent_color}
              onChange={(color) => handleColorChange('accent_color', color)}
            />
          </Grid>

<button  type='submit' className="px-6 py-2 font-medium bg-black text-white w-fit transition-all
 shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px]
  hover:translate-y-[3px] rounded-md">
    {loading &&  <ImSpinner9 className={` ${loading && 'animate-spin'  }   `} /> } 
    {isSaving ? 'Saving...' : 'Save Changes'}
      </button>

        </Stack>
      </Grid>
      </form>
    </Box>
    </>
  );
};

export default ThemeSettings;


