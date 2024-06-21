import { useNavigate } from 'react-router-dom';
import globe from  '../../assets/Globe.jpg';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    div,
  } from "@material-tailwind/react";
import { Globe } from '../Icons';
  

const LanguageMenu = () => {
  const navigate=useNavigate();
    return (
        <Menu>
          <MenuHandler>
            <img
              // variant="circular"
              // alt="tania andrew"
              className="cursor-pointer w-7 h-7 rounded-full ml-4 "
              src={globe}
            />
            {/* <Globe/> */}
          </MenuHandler>
          <MenuList>
            <MenuItem className="flex items-center gap-2">
              <div variant="small" className="font-medium" onClick={()=>navigate('/ComingSoon')}>
                Languages
              </div>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <div variant="small" className="font-medium" onClick={()=>navigate('/ComingSoon')}>
                Add Language
              </div>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <div variant="small" className="font-medium" onClick={()=>navigate('/ComingSoon')}>
                See all languages
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
      );
}

export default LanguageMenu