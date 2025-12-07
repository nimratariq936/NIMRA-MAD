// frontend/components/Icon.js
import React from 'react';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { colors } from '../styles/GlobalStyles';

// Main Icon component
const Icon = ({
  name,
  size = 24,
  color = colors.black,
  type = 'ionicons',
  style
}) => {
  const iconProps = {
    name: name,
    size: size,
    color: color,
    style: style,
  };

  switch (type) {
    case 'ionicons':
      return <Ionicons {...iconProps} />;
    case 'material':
      return <MaterialIcons {...iconProps} />;
    case 'fontawesome':
      return <FontAwesome {...iconProps} />;
    default:
      return <Ionicons {...iconProps} />;
  }
};

// Individual icon exports
export const HomeIcon = (props) => <Icon name="home" type="ionicons" {...props} />;
export const MenuIcon = (props) => <Icon name="menu" type="ionicons" {...props} />;
export const UserIcon = (props) => <Icon name="person" type="ionicons" {...props} />;
export const BookIcon = (props) => <Icon name="book" type="ionicons" {...props} />;
export const CalendarIcon = (props) => <Icon name="calendar" type="ionicons" {...props} />;
export const StarIcon = (props) => <Icon name="star" type="ionicons" {...props} />;
export const SettingsIcon = (props) => <Icon name="settings" type="ionicons" {...props} />;
export const HelpIcon = (props) => <Icon name="help-circle" type="ionicons" {...props} />;
export const LogoutIcon = (props) => <Icon name="log-out" type="ionicons" {...props} />;
export const ArrowBackIcon = (props) => <Icon name="arrow-back" type="ionicons" {...props} />;
export const ChevronRightIcon = (props) => <Icon name="chevron-forward" type="ionicons" {...props} />;
export const CloseIcon = (props) => <Icon name="close" type="ionicons" {...props} />;
export const NotificationsIcon = (props) => <Icon name="notifications" type="ionicons" {...props} />;
export const EmailIcon = (props) => <Icon name="mail" type="ionicons" {...props} />;
export const PhoneIcon = (props) => <Icon name="call" type="ionicons" {...props} />;
export const LocationIcon = (props) => <Icon name="location" type="ionicons" {...props} />;

// Make sure to export default too
export default Icon;