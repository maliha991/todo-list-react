import React from "react";
import { Box, VStack, HStack, Button } from "@chakra-ui/react";

const Filter = ({ status, setStatus }) => {
	const inactive = {
		"background-color": "rgba(65, 60, 171, 0.3)",
	};
	const active = {
		color: "white",
		"background-image": "linear-gradient(to left, #7928CA, #FF0080)",
	};

	return (
		<HStack
			pos="absolute"
			top={{ base: "30%" }}
			left={{ base: "23%", md: "10%", xl: "23%" }}
		>
			<VStack spacing="1.5rem" mr={5}>
				<Button
					style={status === "all" ? active : inactive}
					w="7rem"
					_hover={{
						bgGradient: "linear(to-l, #7928CA, #FF0080)",
						color: "white",
					}}
					_focus={{ border: "none" }}
					onClick={() => setStatus("all")}
				>
					All
				</Button>

				<Button
					w="7rem"
					style={status === "complete" ? active : inactive}
					_hover={{
						bgGradient: "linear(to-l, #7928CA, #FF0080)",
						color: "white",
					}}
					_focus={{ border: "none" }}
					onClick={() => setStatus("complete")}
				>
					Completed
				</Button>

				<Button
					w="7rem"
					style={status === "incomplete" ? active : inactive}
					_hover={{
						bgGradient: "linear(to-l, #7928CA, #FF0080)",
						color: "white",
					}}
					_focus={{ border: "none" }}
					onClick={() => setStatus("incomplete")}
				>
					Incomplete
				</Button>
			</VStack>

			<Box ml={5} h="20rem" w="2px" bgColor="gray.300" />
		</HStack>
	);
};

export default Filter;
