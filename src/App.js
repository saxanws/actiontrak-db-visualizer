import logo from "./logo.svg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./App.css";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

// const theTables = [
// 	{
// 		title: "trak",
// 		headers: ["id", "acctId", "isActive", "containerId", "seq", "itemId"],
// 		values: [
// 			["1", "5", "Y", "467", "", "4947"],
// 			["2", "5", "Y", "468", "", "5168"],
// 			["3", "5", "Y", "468", "", "6029"],
// 			["4", "5", "Y", "468", "", "5410"],
// 			["5", "5", "Y", "469", "", "4617"],
// 			["1", "5", "Y", "467", "", "4947"],
// 			["2", "5", "Y", "468", "", "5168"],
// 			["3", "5", "Y", "468", "", "6029"],
// 			["4", "5", "Y", "468", "", "5410"],
// 			["5", "5", "Y", "469", "", "4617"],
// 		],
// 	},
// ];

function App() {
	const [theTables, setTheTable] = useState([]);

	const handleOnchange = (e) => {
		e.preventDefault();
		const title = e.target.files[0].name;
		var headers = [];
		var values = [];
		// var theFile = e[0];
		// console.log(e.target.files[0]);
		const reader = new FileReader();
		reader.onload = (e2) => {
			// console.log("hi");
			var text = e2.target.result.split(/\r?\n/);

			text.forEach((element, index) => {
				if (index !== 0) {
					var contents = element.split(",");
					// console.log(contents);
					if (index === 1) {
						headers = contents;
					} else {
						values.push(contents);
					}
					// console.log(contents);
				}
			});

			theTables.map((element, index) => {
				if (element.title === title) {
					console.log("yeahhhhhhhhhhhhhhhhhhhhhhhhh");
				}
			});

			setTheTable((state) => {
				// const list = state.map((item, i) => {
				//   if (item.title === title) {
				//     return [
				// 			{
				// 				title: title,
				// 				headers: headers,
				// 				values: values,
				// 			},
				// 		];
				//   }
				// })

				return [
					...theTables,
					{
						title: title,
						headers: headers,
						values: values,
					},
				];
			});

			e.target.value = null;

			// console.log(theTables);
		};

		reader.readAsText(e.target.files[0]);
	};

	const removeItem = (index) => {
		setTheTable(theTables.filter((_, i) => i !== index));
	};

	return (
		<div className='App'>
			<div className='input-add'>
				<form>
					<label>
						<input
							type='file'
							name='file'
							accept='.db'
							id='file'
							onChange={(e) => handleOnchange(e)}
            />
            <span>+</span>
          </label>
          <div>Click to add a db file</div>
				</form>
			</div>
			<Tabs>
				<TabList>
					{theTables.map((e, i) => {
						return (
							<Tab key={i}>
								<div className='theTab'>
									<span>{e.title}</span>
									<span className='theTabIcon' onClick={() => removeItem(i)}>
										<AiFillCloseCircle />
									</span>
								</div>
							</Tab>
						);
					})}
				</TabList>
				{theTables.map((e, i) => {
					return (
						<TabPanel style={{ height: "300px" }}>
							<table className='styled-table'>
								<thead>
									<tr>
										{theTables[i].headers.map((header, i2) => {
											return <th key={i2}>{header}</th>;
										})}
									</tr>
								</thead>
								<tbody>
									{theTables[i].values.map((therow) => {
										return (
											<tr>
												{therow.map((theCol, i3) => {
													return <td key={i3}>{theCol}</td>;
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default App;
