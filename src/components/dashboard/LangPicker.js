import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {i18n} from '../../i18n'
import theme from '../../theme'


const LangPicker = (props) => {
  const { t, currentLanguage, drawerWidth } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang) => function () {
    i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <>
      <List>
        <ListItem onClick={handleClick}>
          <ListItemIcon><TranslateIcon style={{ color: theme.palette.primary.main }} /></ListItemIcon>
          <ListItemText>{(currentLanguage === 'en') ? t('English') : t('Spanish')}</ListItemText>
          <ListItemIcon style={{ display: 'contents' }}><ExpandMoreIcon /></ListItemIcon>
        </ListItem>
      </List>
      <Menu
        variant="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          style={{
            width: drawerWidth - 30,
            backgroundColor: (currentLanguage === 'en') ? theme.palette.secondary.main : null,
          }}
          onClick={changeLanguage('en')}
          selected={currentLanguage === 'en'}
        >
          {t('English')}
        </MenuItem>
        <MenuItem
          style={{ backgroundColor: (currentLanguage === 'es') ? theme.palette.secondary.main : null }}
          onClick={changeLanguage('es')}
          selected={currentLanguage === 'es'}
        >
          {t('Spanish')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default LangPicker;