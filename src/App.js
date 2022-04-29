import React, { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
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
import Filter from "./component/Filter.jsx";

function App() {
	const [inputItem, setInputItem] = useState("");
	const [todo, setTodo] = useState([]);
	const [editingIndex, setEditingIndex] = useState(null);
	const [status, setStatus] = useState("all");
	const [filteredTodo, setFilteredTodo] = useState(todo);

	const inputItemRef = useRef();

	useEffect(() => {
		if (status === "all") setFilteredTodo(todo);
		else {
			const tempTodo = todo.filter(
				({ done }) =>
					(status === "complete" && done) || (status === "incomplete" && !done)
			);
			setFilteredTodo(tempTodo);
		}
	}, [status, todo]);

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

	const changeStatusHandler = (targetItem) => {
		const tempTodo = todo.reduce((result, item) => {
			if (item.item === targetItem) item.done = !item.done;
			return [...result, item];
		}, []);
		setTodo(tempTodo);
	};

	const editItemHandler = (item) => {
		setInputItem(item);
		inputItemRef.current.focus();
		setEditingIndex(todo.findIndex((currentItem) => currentItem.item === item));
	};

	const deleteItemHandler = (item) => {
		const tempTodo = todo.filter((currentItem) => currentItem.item !== item);
		setTodo(tempTodo);
	};

	return (
		<Flex pos="relative" minH="100vh" direction="column" alignItems="center">
			<Filter status={status} setStatus={setStatus} />
			<Text
				m={20}
				fontSize="5xl"
				bgGradient="linear(to-l, #7928CA, #FF0080)"
				bgClip="text"
				fontWeight="bold"
			>
				To-do List
			</Text>

			<InputGroup w="25%" size="lg" mb={10}>
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

			{filteredTodo.length > 0 &&
				filteredTodo.map(({ item, done }) => (
					<Item
						item={item}
						done={done}
						changeStatusHandler={changeStatusHandler}
						editItemHandler={editItemHandler}
						deleteItemHandler={deleteItemHandler}
						key={uuid()}
					/>
				))}
		</Flex>
	);
}

export default App;
