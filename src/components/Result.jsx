import React from "react";



const Result = (props) => {
	const tableHeaders = ["Course Name", "Credit", "Area Fulfill"];

	const objTCsvStr = (obj) => {
		const arr = [["Year", "Fall", "Spring"]]

		console.log(obj)
		Object.entries(obj).forEach((year, semesters) => {
			arr.push([year[0], year[1]["Fall"].join('-'), year[1]["Spring"].join('-')])
		})

		console.log(arr)

		let finalStr = ""
		arr.forEach((row) => {
			finalStr += row.toString() + '\r\n';
		})

		return finalStr
	}

	const exportCSV = () => {
		const csv = objTCsvStr(props.data)

		const exportedFileName = "schedule.csv";
		const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
		window.open(encodedUri);
	}

	const getTable = (semesterData) => (
		<div className="overflow-x-auto max-w-5xl px-20">
			<table className="min-w-full divide-y divide-gray-200 text-sm">
				<thead className="bg-gray-100">
					<tr>
						{tableHeaders.map((header) => (
							<th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
								{header}
							</th>
						))}
					</tr>
				</thead>

				<tbody className="divide-y divide-gray-200">
					{semesterData.map(
						(courseId) => (
							<tr>
								<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
									{courseId}
								</td>
								<td className="whitespace-nowrap px-4 py-2 text-gray-700">
									{props.courses[courseId] ? props.courses[courseId]["credit"] : 1}
								</td>
								<td className="whitespace-nowrap px-4 py-2 text-gray-700">
									{props.courses[courseId] ? ((props.courses[courseId]["competency"] ? props.courses[courseId]["competency"] + "," : "") + props.courses[courseId]["distribution"].toString()) : ""}
								</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	);

	return (
		<div>
			<div className="p-8 sm:p-12 mx-8 sm:mx-40 my-8 sm:my-16 space-y-4 text-center shadow-lg">
				<h1 className="text-3xl sm:text-4xl font-bold sm:pb-4">
					Our suggestion to achieve your academic goal
				</h1>
				<hr className="max-w-[100px] border-yellow-400 mx-auto pb-4 sm:pb-6" />
				<span className="flex justify-center text-center">
					<h4 className='pr-3 font-medium'>Program selected:</h4>
					{props.comb.majors.map((major) => (
						<p className="pr-1">{major.toUpperCase() + " Major |"}</p>
					))}
					{props.comb.minors.map((minor) => (
						<p className="pr-1">{minor.toUpperCase() + " Minor |"}</p>
					))}
					{props.comb.honors.map((honor) => (
						<p className="pr-1">{honor.toUpperCase() + " Program"}</p>
					))}
				</span>
				<button onClick={exportCSV}>Download file</button>
			</div>
			<div>
				<h2 className="text-center uppercase font-bold text-3xl py-3 mb-3 bg-yellow-400">Freshman</h2>
				<section>
					<div className="px-4 py-2 mx-auto sm:px-6 lg:px-8 max-w-screen">
						<div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 lg:py-5">
							{getTable(props.data["Freshman"]["Fall"])}
							{getTable(props.data["Freshman"]["Spring"])}
						</div>
					</div>
				</section>
			</div>
			<div>
				<h2 className="text-center uppercase font-bold text-3xl py-3 mb-3 bg-yellow-400">Sophomore</h2>
				<section>
					<div className="px-4 py-2 mx-auto sm:px-6 lg:px-8 max-w-screen">
						<div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 lg:py-5">
							{getTable(props.data["Sophomore"]["Fall"])}
							{getTable(props.data["Sophomore"]["Spring"])}
						</div>
					</div>
				</section>
			</div>
			<div>
				<h2 className="text-center uppercase font-bold text-3xl py-3 mb-3 bg-yellow-400">Junior</h2>
				<section>
					<div className="px-4 py-2 mx-auto sm:px-6 lg:px-8 max-w-screen">
						<div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 lg:py-5">
							{getTable(props.data["Junior"]["Fall"])}
							{getTable(props.data["Junior"]["Spring"])}
						</div>
					</div>
				</section>
			</div>
			<div>
				<h2 className="text-center uppercase font-bold text-3xl py-3 mb-3 bg-yellow-400">Senior</h2>
				<section>
					<div className="px-4 py-2 mx-auto sm:px-6 lg:px-8 max-w-screen">
						<div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 lg:py-5">
							{getTable(props.data["Senior"]["Fall"])}
							{getTable(props.data["Senior"]["Spring"])}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Result;
