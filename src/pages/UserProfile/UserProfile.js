import "./UserProfile.scss";

import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

// components
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import Loading from "../../components/Loading/Loading";
import SideMenu from "../../components/SideMenu/SideMenu";
import CurrentUser from "../../components/UserProfileComponents/CurrentUser/CurrentUser";
import UserPrivacy from "../../components/UserProfileComponents/UserPrivacy/UserPrivacy";
import Footer from "../../components/Footer/Footer";

//icons - images
export default function UserProfile({
  token,
  setRerenderFlag,
  rerenderFlag,
  handleLogout,
  userInfo,
  userBooks,
  onlineFriends
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  // for mobile hamburger menu}
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <AnimatePresence>
      {!userBooks || !userInfo ? (
        <Loading key="loading" />
      ) : (
        <>
          <MobileMenu
            key="mobileMenu"
            Toggle={handleLogoClick}
            isMenuOpen={isMenuOpen}
            userInfo={userInfo}
            handleLogout={handleLogout}
          />
          <Header
            userAvatar={userInfo.avatar_image}
            username={`${userInfo.first_name} ${userInfo.last_name}`}
            menuToggle={handleLogoClick}
            userBooks={userBooks}
          />
          <main className="user-profile">
            {/* side menu */}
            <SideMenu friends={userInfo.friends} handleLogout={handleLogout} onlineFriends={onlineFriends}/>

            {location.pathname === "/user/profile" && (
              <CurrentUser userInfo={userInfo} token={token}  triggerRerender={() => setRerenderFlag(!rerenderFlag)}/>
            )}
            {location.pathname === "/user/privacy" && (
              <UserPrivacy userInfo={userInfo} token={token} handleLogout={handleLogout}/>
            )}
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
