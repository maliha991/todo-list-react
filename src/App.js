import React, { useState, useRef } from "react";
import {
	Box,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	Center,
} from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import { ImCross } from "react-icons/im";

import Item from "./component/Item";

function App() {
	const [inputItem, setInputItem] = useState("");
	const [todo, setTodo] = useState([]);
	const [editingIndex, setEditingIndex] = useState(null);

	const inputItemRef = useRef();

	const cancelEditingHandler = () => {
		setInputItem("");
		setEditingIndex(null);
	};

	const addItemHandler = () => {
		if (editingIndex !== null) {
			const tempTodo = todo.reduce((result, item, index) => {
				if (index === editingIndex) item.item = inputItem;
				return [...result, item];
			}, []);
			setTodo(tempTodo);
			setEditingIndex(null);
		} else {
			setTodo((prevState) => [...prevState, { item: inputItem, done: false }]);
		}
		setInputItem("");
	};

	const changeStatusHandler = (targetIndex) => {
		const tempTodo = todo.reduce((result, item, index) => {
			if (index === targetIndex) item.done = !item.done;
			return [...result, item];
		}, []);
		setTodo(tempTodo);
	};

	const editItemHandler = (item, index) => {
		setInputItem(item);
		inputItemRef.current.focus();
		setEditingIndex(index);
	};

	const deleteItemHandler = (item) => {
		const tempTodo = todo.filter((currentItem) => currentItem.item !== item);
		setTodo(tempTodo);
	};

	return (
		<Flex minH="100vh" direction="column" alignItems="center">
			<Text
				m={20}
				fontSize="5xl"
				bgGradient="linear(to-l, #7928CA, #FF0080)"
				bgClip="text"
				fontWeight="bold"
			>
				To-do List
			</Text>

			<InputGroup w="20%" size="lg" mb={10}>
				<Input
					borderColor="#918EDC"
					pr="4.5rem"
					value={inputItem}
					type="text"
					placeholder="Track your todos"
					onChange={(e) => setInputItem(e.target.value)}
					ref={inputItemRef}
					_focus={{ border: "2px solid #918EDC" }}
				/>

				<InputRightElement width={inputItem ? "5rem" : "3.5rem"}>
					{inputItem && (
						<Box
							as="button"
							bgGradient="linear(to-l, #7928CA, #FF0080)"
							color="white"
							w="1.5rem"
							h="1.5rem"
							borderRadius="20%"
							cursor="pointer"
							onClick={cancelEditingHandler}
							mr={2}
						>
							<Center>
								<ImCross fontSize="0.9rem" />
							</Center>
						</Box>
					)}
					<Box
						as="button"
						w="1.5rem"
						borderRadius="20%"
						bgGradient="linear(to-l, #7928CA, #FF0080)"
						h="1.5rem"
						onClick={addItemHandler}
						color="white"
						disabled={!inputItem}
					>
						<Center>
							<GoPlus fontSize="1.2rem" />
						</Center>
					</Box>
				</InputRightElement>
			</InputGroup>

			{todo.length > 0 &&
				todo.map(({ item, done }, index) => (
					<Item
						item={item}
						index={index}
						done={done}
						changeStatusHandler={changeStatusHandler}
						editItemHandler={editItemHandler}
						deleteItemHandler={deleteItemHandler}
						key={++index}
					/>
				))}
		</Flex>
	);
}

export default App;
