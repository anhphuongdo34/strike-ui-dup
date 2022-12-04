import React, { useState, useEffect, Fragment } from "react";
import { NavBar, Dropdown, Results, Footer } from "../components";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { db, endPoint } from "../api/config"
import axios from "axios";
import { collection, getDocs, doc, getDoc, get, getDocFromCache, getDocsFromCache } from "firebase/firestore";
import { useCallback } from "react";

const Combination = (props) => {
	const [majors, setMajors] = useState([]);
	const [minors, setMinors] = useState([]);
	const [honors, setHonors] = useState([]);

	const [majorIds, setMajorIds] = useState({});
	const [minorIds, setMinorIds] = useState({});
	const [honorList, setHonorList] = useState({});
	const [courses, setCourses] = useState({});

	const [waivedCourses, setWaivedCourses] = useState([]);
	const [completedCourses, setCompletedCourses] = useState([]);
	const [international, setInternational] = useState(false);
	const [semSelected, setSemSelected] = useState("");	// in the backend, the first sem is 1, 0 means not enrolled yet
	const [resultReady, setResultReady] = useState(false);
	const [schedule, setSchedule] = useState({});

	const semesters = {
		"Freshman - Fall": 1,
		"Freshman - Spring": 2,
		"Sophomore - Fall": 3,
		"Sophomore - Spring": 4,
		"Junior - Fall": 5,
		"Junior - Spring": 6,
		"Senior - Fall": 7,
		"Senior - Spring": 8,
	}

	useEffect(() => {
		if (majors.length > 2) {
			setMajors(majors.slice(0, 2));
			alert("You can have maximum 2 majors");
		}
		if (minors.length > 3) {
			setMinors(minors.slice(0, 3));
			alert("You can have maximum 3 minors");
		}
		if (honors.length > 2) {
			setHonors(honors.slice(0, 2));
			alert("You can have maximum 2 honors");
		}
	}, [majors, minors, honors]);

	const clearChoices = () => {
		setMajors([]);
		setMinors([]);
		setHonors([]);
		setCompletedCourses([]);
		setWaivedCourses([]);
		setInternational(false);
		setSemSelected("");
	};

	const fetchDocFromCollection = async (db, colName, docName, setStateFunc) => {
		const docSnap = await getDoc(doc(db, colName, docName))
		if (docSnap.exists()) {
			setStateFunc(docSnap.data())
		}
		else console.log(`Document ${docName} does not exist in collection ${colName}`)
	}

	const fetchAllDocsFromCollection = async (db, colName, setStateFunc) => {
		const querySnapShot = await getDocs(collection(db, colName))
		const tempObj = {}
		querySnapShot.forEach((doc) => {
			tempObj[doc.id] = doc.data()
		})
		setStateFunc(tempObj)
	}
	
	// Retrieve data as fields of the dropdowns from Firestore
	useEffect(() => {
		// fetchDocFromCollection(db, "degreeIds", "Majors", setMajorIds);
		setMajorIds({
			"Biochemistry": 15141,
			"Physics": 45223,
			"Art History": 22503,
			"Studio Art": 78695,
			"Hispanic Studies": 22756,
			"Italian Cultural Studies": 20916,
			"Computer Science": 35855,
			"Peace and Conflict Studies": 66981,
			"Economics": 58349,
			"Classical Civilization": 73305,
			"Greek": 36282,
			"Latin": 35785,
			"Chinese Studies": 48202,
			"Asian Studies": 19531,
			"Global Health": 12541,
			"Kinesiology": 86063,
			"Earth Science": 27230,
			"Environmental Geoscience": 57035,
			"Geology": 50590,
			"Philosophy": 86958,
			"German": 26395,
			"German Studies": 47335,
			"Political Science": 25307,
			"Religious Studies": 71550,
			"Neuroscience": 75924,
			"Psychology": 95248,
			"Biology": 50492,
			"Cellular and Molecular Biology": 27056,
			"Literature": 33729,
			"Writing": 52763,
			"Communication": 55333,
			"Theatre": 36566,
			"Japanese Studies": 48157,
			"Women's, Gender, and Sexuality Studies": 93049,
			"Global French Studies": 86020,
			"Actuarial Science": 70669,
			"Mathematics": 80562
		})
		// fetchDocFromCollection(db, "degreeIds", "Minors", setMinorIds);
		setMinorIds({
			"Biochemistry": 12386,
			"Chemistry": 14151,
			"Astronomy": 13261,
			"Physics": 85941,
			"Art History": 47962,
			"Museum Studies": 56133,
			"Studio Art": 92607,
			"Hispanic Studies": 85195,
			"Italian Cultural Studies": 64387,
			"Computer Science": 38765,
			"Data Science": 88125,
			"Peace and Conflict Studies": 79215,
			"Accounting and Finance for Decision Making": 31053,
			"Business Administration": 34851,
			"Economics": 67464,
			"Greek": 75615,
			"Latin": 53458,
			"Chinese Studies": 46150,
			"Chinese": 10244,
			"Japanese": 28657,
			"Kinesiology": 84372,
			"Earth Science": 19775,
			"Environmental Geoscience": 71013,
			"Geography": 25799,
			"Geology": 24265,
			"Philosophy": 72222,
			"German": 26290,
			"German Studies": 21293,
			"Political Science": 64606,
			"Religious Studies": 81851,
			"Psychology": 66941,
			"Biology": 97746,
			"English Writing": 26283,
			"Literature": 32536,
			"Media Studies": 17350,
			"Rhetoric and Interpersonal Communication": 79534,
			"Theatre": 49448,
			"Japanese Studies": 44398,
			"Women's, Gender, and Sexuality Studies": 13794,
			"Global French Studies": 52010,
			"Applied Statistics": 28256,
			"Mathematics": 47620
		})
		// fetchAllDocsFromCollection(db, "honors", setHonorList);
		setHonorList({"Environmental Fellows":1, "Honor Scholars":2, "Management Fellows":3, "Media Fellows":4, "Science Research Fellows":5})
		fetchAllDocsFromCollection(db, "courses", setCourses);
	}, [])
	

	const submit = useCallback(() => {
		const data = {
			user_info: {
				majors: majors.map((major) => majorIds[major]),
				minors: minors.map((minor) => minorIds[minor]),
				honors: honors,
				waivedCourses: waivedCourses,
				completedCourses: completedCourses,
				international: international,
				semesterCnt: semesters[semSelected]
			}
		};

		axios.post(endPoint + "/data", data).then((response) => {
			console.log(response);

			axios.get(endPoint + "/get_schedule").then((response) => {
				console.log(response);
				setSchedule(response.data.schedule);
				setResultReady(true);
			}).catch(e => {
				console.log(`Receive error while retrieving schedule result: ${e}`);
			})
		}).catch(e => {
			console.log(`Receive error sending user_info data: ${e}`)
		})

	}, [completedCourses, honors, waivedCourses, majors, minors, international, semSelected])


	return (
		<div className="h-screen">
			<NavBar />
			{!resultReady ? (
				<div className="mx-auto mt-10 sm:mt-20 max-w-screen">
					<div className="p-8 sm:p-12 mx-8 sm:mx-40 my-8 sm:my-16 space-y-4 text-center shadow-lg">
						<h1 className="text-3xl sm:text-4xl font-bold">
							Choose your academic combination
						</h1>
						<hr className="max-w-[100px] border-yellow-400 mx-auto pb-4 sm:pb-6" />
						<p className="text-center">
							You can choose up to 2 majors, 3 minors, and 2 honor
							programs.
						</p>
					</div>
					<div className="mt-10">

						<div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 mt-5">
							<h4 className="text-right font-medium  pt-1">
								Majors
							</h4>
							<Dropdown
								selected={majors}
								setSelected={setMajors}
								items={majorIds}
							/>
						</div>
						<div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 mt-5">
							<h4 className="text-right font-medium pt-1">
								Minors
							</h4>
							<Dropdown
								selected={minors}
								setSelected={setMinors}
								items={minorIds}
							/>
						</div>
						<div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 mt-5">
							<h4 className="text-right font-medium pt-1">
								Honor Programs
							</h4>
							<Dropdown
								selected={honors}
								setSelected={setHonors}
								items={honorList}
							/>
						</div>
						<div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 mt-5">
							<h4 className="text-right font-medium pt-1">
								Waived Courses
							</h4>
							<Dropdown
								selected={waivedCourses}
								setSelected={setWaivedCourses}
								items={courses}
							/>
						</div>
						<div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 mt-5">
							<h4 className="text-right font-medium pt-1">
								Completed Courses
							</h4>
							<Dropdown
								selected={completedCourses}
								setSelected={setCompletedCourses}
								items={courses}
							/>
						</div>
						<div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 mt-5">
							<h4 className="text-right font-medium pt-1">
								International Student
							</h4>
							<div>
								<label for="international" class="flex gap-4">
									<input
										type="checkbox"
										id="international"
										name="marketing_accept"
										className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
										value="international"
										checked={international}
										onChange={() => setInternational(!international)}
									/>

									<span className="text-sm text-gray-700">
										I am an international student
									</span>
								</label>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 mt-5">
							<h4 className="text-right font-medium pt-1">
								Upcoming Semester
							</h4>
							<div>
								<Listbox value={semSelected} onChange={setSemSelected}>
									<div className="relative w-72 mt-1">
										<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
											<span className="block truncate">{semSelected}</span>
											<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
												<ChevronUpDownIcon
													className="h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
											</span>
										</Listbox.Button>
										<Transition
											as={Fragment}
											leave="transition ease-in duration-100"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
										>
											<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
												{Object.keys(semesters).map((sem, idx) => (
													<Listbox.Option
														key={idx}
														className={({ active }) =>
															`relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
															}`
														}
														value={sem}
													>
														{({ selected }) => (
															<>
																<span
																	className={`block truncate ${selected ? 'font-medium' : 'font-normal'
																		}`}
																>
																	{sem}
																</span>
																{selected ? (
																	<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																		<CheckIcon className="h-5 w-5" aria-hidden="true" />
																	</span>
																) : null}
															</>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</Listbox>
							</div>
						</div>
						<div className="mt-8 flex flex-wrap justify-center mb-10 gap-4 text-center">
							<button
								onClick={(event) => {
									event.preventDefault();
									submit();
								}}
								disabled={!!(!majors || !semSelected)}
								className="block w-full rounded bg-yellow-400 px-12 py-3 text-sm font-medium shadow hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring active:bg-white active:text-black sm:w-auto disabled:bg-gray-400 disabled:hover:text-black"
							>
								Submit
							</button>

							<button
								onClick={clearChoices}
								className="block w-full rounded bg-slate-100 px-12 py-3 text-sm font-medium shadow hover:text-yellow-500 focus:outline-none focus:ring active:text-black active:bg-yellow-400 sm:w-auto"
							>
								Clear choices
							</button>
						</div>
					</div>
				</div>
			) : (
				<div>
					<Results comb={{ majors, minors, honors }} data={schedule} courses={courses}/>
					
				</div>
			)}
			<Footer />
		</div>
	);
};

export default Combination;
