import "./App.css";
import {Avatar, Badge, Box, Button, ChakraProvider, Container, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import React from "react";
import {FaArrowRightArrowLeft, FaCircleInfo, FaClockRotateLeft, FaGaugeHigh, FaGear} from "react-icons/fa6";
import {IconType} from "react-icons";
import {Outlet} from "react-router-dom";

interface MenuItemProps {
    label: string;
    selected?: boolean;
    icon?: React.ReactElement<IconType>;
}

function MenuItem(props: MenuItemProps) {
    let {label, selected, icon} = props;
    let iconColor = selected ? "white" : "#9BA0A2";
    let compClass = selected ? "Sidebar-MenuItem-selected" : "Sidebar-MenuItem";

    return (
        <Container borderRadius={15} className={compClass}>
            <HStack spacing="16px">
                {/* @ts-ignore */}
                {icon && React.cloneElement(icon, {color: iconColor})}
                <Text fontSize="sm" fontWeight={700}>{label}</Text>
            </HStack>
        </Container>
    );
}

function App() {
    return (
        <ChakraProvider>
            <Flex className="Window">
                <Box w='270px' className="Sidebar">
                    <VStack spacing="48px">
                        <Container className="Appinfo">
                            <HStack spacing="16px">
                                <Avatar name="Pylon" color="#F8F8F8" backgroundColor="navy"/>
                                <VStack spacing="2px">
                                    <Text style={{width: "100%"}} fontSize="sm" fontWeight={700}>Pylon Desktop</Text>
                                    <Text style={{width: "100%"}} fontSize="xs">v0.0.0-alpha</Text>
                                </VStack>

                                <Badge colorScheme="red">DEV</Badge>
                            </HStack>
                        </Container>

                        <Container className="Menulist">
                            <MenuItem label="Dashboard" icon={<Icon as={FaGaugeHigh}/>} selected/>
                            <MenuItem label="Active Transfers" icon={<Icon as={FaArrowRightArrowLeft}/>}/>
                            <MenuItem label="History" icon={<Icon as={FaClockRotateLeft}/>}/>
                            <MenuItem label="About" icon={<Icon as={FaCircleInfo}/>}/>
                        </Container>

                        <Button borderRadius={15}
                                style={{position: "fixed", bottom: 0, left: 0, margin: "1em", fontSize: "1.3em"}}>
                            <Icon as={FaGear} color="#595759"/>
                        </Button>
                    </VStack>
                </Box>

                <Box flex={1} className="Viewport">
                    {/* Our views will be rendered here */}
                    <Outlet/>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default App;
