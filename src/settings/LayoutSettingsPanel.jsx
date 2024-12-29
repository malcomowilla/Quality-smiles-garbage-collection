import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLayoutSettings } from './LayoutSettings';
import { IoMdSettings } from 'react-icons/io';
import { Switch } from '@headlessui/react';
import { useApplicationSettings } from './ApplicationSettings';
import LayoutSettingsPanelBottom from './LayoutSettingsPanelBottom'
import { useLocation } from 'react-router-dom';

const LayoutSettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useLayoutSettings();
  const { currentUser, updateSettingsWarn } = useApplicationSettings();
  const [isOpenBottom, setIsOpenBottom] = useState(false);
const location = useLocation();

  const colorSchemes = [
    { name: 'green', color: '#10B981' },
    { name: 'blue', color: '#3B82F6' },
    { name: 'purple', color: '#8B5CF6' },
    { name: 'red', color: '#EF4444' },
  ];

  
  const colorSchemesWarn = [
    { name: 'light_red', color: '#ffb3b3' },  // Change this from green to light red
    // { name: 'blue', color: '#3B82F6' },
    // { name: 'purple', color: '#8B5CF6' },
    { name: 'warn_red', color: '#FF0000' },
    { name: 'warn_yellow', color: '#FBBF24' },  // Add yellow color
  ];

  const fontSizes = [
    { name: 'small', label: 'Small' },
    { name: 'medium', label: 'Medium' },
    { name: 'large', label: 'Large' },

  ];

  const borderRadii = [
    { name: 'small', label: 'Small' },
    { name: 'extra_large', label: 'Extra Large' },
    { name: 'two_extra_large', label: '2x Extra Large' },
    { name: 'three_extra_large', label: '3x Extra Large' },
    { name: 'large', label: 'Large' },
    { name: 'full', label: 'Full' },
    { name: 'medium', label: 'Medium' },

  ];

  return (
    <>

    <LayoutSettingsPanelBottom  
    isOpenBottom={isOpenBottom} setIsOpenBottom={setIsOpenBottom}
    />
      {location.pathname.includes('/admin') ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-20 p-4 bg-primary
           text-white rounded-full shadow-lg z-[9999] hover:bg-hover
            transition-colors"
          style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
        >
          <IoMdSettings className="w-7 h-7 animate-spin-slow" />
        </motion.button>
      ) : (
        null
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999]"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30 }}
              className="absolute right-0 top-0 h-full w-80 bg-gray-800
               dark:bg-white shadow-xl p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white dark:text-black">
                  Layout Settings
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Theme Toggle */}
              {/* <div className="mb-6">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white dark:text-black">
                    Dark Mode
                  </span>
                  
                  <Switch
                    checked={settings.theme === 'dark'}
                    onChange={(checked) =>
                      updateSettings({ theme: checked ? 'dark' : 'light' })
                    }
                    className={`${
                      settings.theme === 'dark' ? 'bg-primary' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        settings.theme === 'dark'
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </label>
              </div> */}




<div class="text-center" onClick={() => {
  setIsOpen(false)
  setIsOpenBottom(true)
}}>
   <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-bottom-example" data-drawer-show="drawer-bottom-example" data-drawer-placement="bottom" aria-controls="drawer-bottom-example">
    bordercolor
   </button>
</div>





              {/* Sidebar Position */}
              <div className="mb-6">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white dark:text-black">
                    Sidebar Position
                  </span>
                  <select
                    value={settings.sidebarPosition}
                    onChange={(e) =>
                      updateSettings({ sidebarPosition: e.target.value })
                    }
                    className="rounded-lg border-gray-200 text-sm focus:border-primary focus:ring-primary text-black dark:text-black"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </label>
              </div>

              {/* Color Scheme */}
              <div className="mb-6">
                <span className="text-sm font-medium block mb-2 text-white dark:text-black">
                  Color Scheme
                </span>
                <div className="flex gap-3">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.name}
                      onClick={() => updateSettings({ colorScheme: scheme.name })}
                      className={`w-10 h-10 rounded-full transition-all ${
                        settings.colorScheme === scheme.name
                          ? 'ring-2 ring-offset-2 ring-primary scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: scheme.color }}
                    />
                  ))}
                </div>
              </div>






              <div className="mb-6">
                <span className="text-sm font-medium block mb-2 text-white dark:text-black">
                  Color Scheme Warn
                </span>
                <div className="flex gap-3">
                  {colorSchemesWarn.map((scheme) => (
                    <button
                      key={scheme.name}
                      onClick={() => updateSettings({ colorSchemeWarn: scheme.name })}
                      className={`w-10 h-10 rounded-full transition-all ${
                        settings.colorSchemeWarn === scheme.name
                          ? 'ring-2 ring-offset-2 ring-primary scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: scheme.color }}
                    />
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="mb-6">
                <span className="text-sm font-medium block mb-2 text-white dark:text-black">
                  Font Size
                </span>
                <div className="flex gap-2">
                  {fontSizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => updateSettings({ fontSize: size.name })}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        settings.fontSize === size.name
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 hover:bg-primary'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Border Radius */}
              <div className="mb-6">
                <span className="text-sm font-medium block mb-2
                text-white dark:text-black">Border Radius</span>
                <div className="flex gap-2 flex-col">
                  {borderRadii.map((radius) => (
                    <button
                      key={radius.name}
                      onClick={() => updateSettings({ borderRadius: radius.name })}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        settings.borderRadius === radius.name
                          ? 'bg-primary text-white dark:text-black'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {radius.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact Mode */}
              <div className="mb-6">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium">Compact Mode</span>
                  <Switch
                    checked={settings.compactMode}
                    onChange={(checked) => updateSettings({ compactMode: checked })}
                    className={`${
                      settings.compactMode ? 'bg-primary' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        settings.compactMode ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </label>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  updateSettings(defaultSettings);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg border border-red-600 hover:bg-red-50 transition-colors"
              >
                Reset to Defaults
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LayoutSettingsPanel;
