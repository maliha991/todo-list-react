import React from "react";
import { Box, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import { ImCross, ImCheckmark, ImClipboard } from "react-icons/im";
import { AiOutlineFileExclamation, AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";

const Item = ({
	item,
	done,
	changeStatusHandler,
	editItemHandler,
	deleteItemHandler,
}) => {
	return (
		<Box
			borderRadius="500px"
			w="30%"
			m={2}
			py={3}
			px={5}
			bgColor={done ? "rgba(121, 40, 202, 0.25)" : "rgba(255, 0, 128, 0.25)"}
		>
			<HStack>
				<Icon
					as={done ? ImClipboard : AiOutlineFileExclamation}
					color={done ? "#7928CA" : "#FF0080"}
					fontSize="xl"
				/>
				<Text textDecoration={done && "line-through"}>{item}</Text>
				<Spacer />

				<Box
					as={!done ? ImCheckmark : ImCross}
					color={!done ? "#7928CA" : "#FF0080"}
					cursor="pointer"
					onClick={() => changeStatusHandler(item)}
				/>

				<Box
					as={RiEdit2Fill}
					color="#413CAB"
					cursor="pointer"
					onClick={() => editItemHandler(item)}
					fontSize="xl"
				/>

				<Box
					as={AiFillDelete}
					color="#FF2C2C"
					cursor="pointer"
					onClick={() => deleteItemHandler(item)}
					fontSize="xl"
				/>
			</HStack>
		</Box>
	);
};

export default Item;
