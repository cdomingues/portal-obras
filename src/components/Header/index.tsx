import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  InputGroup,
  Input,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorMode,
} from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";
import navItems, { NavItem } from "./navItems";


export default function Header() {
  const [search, setSearch] = useState("");
  const [searchs, setSearchs] = useState<Array<any>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box width="100%">
      
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
         position="relative"
        //borderStyle={"solid"}
       // borderColor={useColorModeValue("gray.200", "gray.900")}
       zIndex="10" 
        
      >
       <DesktopNav
              onOpen={onOpen}
              search={search}
              setSearch={setSearch}
              setSearchs={setSearchs}
              searchs={searchs}
            />
      </Flex>
    </Box>
  );
}

const DesktopNav = ({
 
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearchs: React.Dispatch<React.SetStateAction<Array<any>>>;
  searchs: Array<any>;
  onOpen: any;
}) => {
 // const { colorMode, toggleColorMode } = useColorMode();

  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  //const router = useRouter();
  //const accessibility = useFontSizeAccessibilityContext();
  return (
    <Stack
    
      top="0"
      width={"100%"} // Ocupa toda a largura da tela
      maxWidth={"100%"} // Largura máxima de 1280 pixels
      height={"10vh"} // Ocupa toda a altura da tela
      alignItems="center" // Centraliza os filhos verticalmente
      justifyContent="revert-layer" // Centraliza os filhos horizontalmente
      margin="0 auto" // Centraliza a Stack horizontalmente na tela
      display="flex"
       direction="row"
       pl="20px"
       
      
    >
     {navItems.map((navItem) => {
              const href = navItem.href;
              const hasHref = navItem.href ? { href } : {};
              return (
                <Box key={navItem.label}>
                  <Popover trigger={"hover"} placement={"bottom-start"}>
                    <PopoverTrigger>
                      <Link
                        {...hasHref}
                        target={href ? "_blank" : undefined}
                        p={2}
                       // fontSize={fonts.small}
                        fontWeight={500}
                        color={"grey"}
                        textAlign="center"
                        _hover={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        
                      >
                        {navItem.label}
                      </Link>
                    </PopoverTrigger>

                    {navItem.children && (
                      <PopoverContent
                        border={0}
                        boxShadow={"xl"}
                        bg="white"
                        p={4}
                        rounded={"xl"}
                        minW={"sm"}
                      >
                        <Stack>
                          {navItem.children.map((child, index) => {
                            return (
                              <Accordion
                                defaultIndex={[1]}
                                allowMultiple
                                key={child.label}
                              >
                                <AccordionItem borderWidth={0}>
                                  <AccordionButton padding={0}>
                                    <Box width="100%" border="0">
                                      <DesktopSubNav
                                        key={child.label}
                                        {...child}
                                      />
                                    </Box>
                                  </AccordionButton>

                                  <AccordionPanel pb={4}>
                                    {child.children?.map((item) => (
                                      <Box
                                        key={item.label}
                                        _hover={{
                                          bg: "lightgrey",
                                          cursor: "pointer",
                                          border: 0,
                                          
                                        }}
                                        padding="1.5"
                                        borderRadius="5"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                        mb={1}
                                        ml="3"
                                        onClick={() => window.open(item.href)}
                                      >
                                        <Text
                                          color="black"
                                          fontWeight="500"
                                        >
                                          {item.label}
                                        </Text>
                                      </Box>
                                    ))}
                                  </AccordionPanel>
                                </AccordionItem>
                              </Accordion>
                            );
                          })}
                        </Stack>
                      </PopoverContent>
                    )}
                  </Popover>
                </Box>
              );
            })}
    </Stack>
  );
};


  

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  const hasHref = href ? { href } : {};
  //const accessibility = useFontSizeAccessibilityContext();
  return (
    <Link
      {...hasHref}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      target={href ? "_blank" : undefined}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
      
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
          color="grey"
            transition={"all .3s ease"}
            _groupHover={{ color: "black" }}
            fontWeight={500}
            //fontSize={accessibility?.fonts?.small}
          >
            {label}
          </Text>
          <Text >{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          
        </Flex>
      </Stack>
    </Link>
  );
};
