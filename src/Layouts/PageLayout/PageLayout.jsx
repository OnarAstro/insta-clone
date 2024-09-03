import { Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";


// instead of adding the Sidebar component to every page, we can add it only once to the PageLayout component
//  and wrap the children it. This way, we can have a sidebar on every page except the AuthPage.


const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  
  const [user, loading] = useAuthState(auth);

  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";


  const checkingUserIsAuth = !user && loading

  if(checkingUserIsAuth) return <PageLayoutSpinner />

  return (
    <Flex flexDirection={canRenderNavbar ? "column" : "row"}>
      {/* sidebar on the left */}

      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}

      {/* Navbar on the top */}

      {canRenderNavbar ? <Navbar /> : null}

      {/* main content on the right */}

      <Box
        flex={1}
        w={{ base: "calck(100% - 70px)", md: "calc(100% - 240px)" }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;


const PageLayoutSpinner = () => {
  return (
    <Flex flexDir={"column"} h={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Spinner size={"xl"} />
    </Flex>
  )
}