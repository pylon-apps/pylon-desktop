import {Center, Divider, Flex, HStack, Spacer, Text} from "@chakra-ui/react";
import "./index.css";

function Dashboard() {
    return (
        <Flex className="Dashboard" height="100%">
            <Flex direction="column" gap="1em" width="60%">
                <HStack>
                    <Text fontSize="sm" fontWeight={700}>Transfer</Text>
                    <Divider/>
                </HStack>
                <Center className="Dashboard-box">
                    <Text fontSize="xl">PLACEHOLDER</Text>
                </Center>

                <HStack>
                    <Text fontSize="sm" fontWeight={700}>Active</Text>
                    <Divider/>
                </HStack>
                <Center className="Dashboard-box">
                    <Text fontSize="xl">PLACEHOLDER</Text>
                </Center>

                <HStack>
                    <Text fontSize="sm" fontWeight={700}>History</Text>
                    <Divider/>
                </HStack>
                <Center flex={1} className="Dashboard-box">
                    <Text fontSize="xl">PLACEHOLDER</Text>
                </Center>
            </Flex>

            <Spacer/>
            <Divider orientation="vertical"/>
            <Spacer/>

            <Flex direction="column" gap="1em" width="30%">
                <HStack>
                    <Text fontSize="sm" fontWeight={700}>Stats</Text>
                    <Divider/>
                </HStack>
                <Center>
                    <Text fontSize="xl">PLACEHOLDER</Text>
                </Center>

                <HStack>
                    <Text fontSize="sm" fontWeight={700}>Info</Text>
                    <Divider/>
                </HStack>
                <Center flex={1}>
                    <Text fontSize="xl">PLACEHOLDER</Text>
                </Center>
            </Flex>
        </Flex>
    );
}

export default Dashboard;
