import React from "react";
import { Footer, NavBar } from "../components";

const Home = () => {
	const faqs = [
		{
			question: "How can strike help me?",
			answer: "Planning for your career is tough, and we understand that it feels overwhelming with all the requirements. Strike can give you a suggestion of the courses and the time to take them over the course of four years to achieve your academic goals. Strike will try to maximize the number of programs enrolled while minimizing the number of courses taken.",
		},
		{
			question: "Can School of Music's students use strike?",
			answer: "Unfortunately, with the limited development time, strike has yet been able to understand and process all the requirements from the SOM. If we receive good feedbacks from the School of Liberal Arts, we will work on the system for SOM.",
		},
	];

	const honors = [
		{
			href: "https://www.depauw.edu/academics/honors-fellows-programs/honor-scholar-program/",
			thumbnail:
				"https://u100s.s3.amazonaws.com/articles_images/e6/1457449915526/image.jpg",
			name: "Honor Scholar Program",
		},
		{
			href: "https://www.depauw.edu/academics/honors-fellows-programs/media-fellows/",
			thumbnail: "https://www.depauw.edu/files/pages/thumb_img_1110.jpg",
			name: "Management Fellow Program",
		},
		{
			href: "https://www.depauw.edu/academics/honors-fellows-programs/management-fellows/",
			thumbnail: "https://www.depauw.edu/files/pages/thumb_walters.jpg",
			name: "Media Fellow Program",
		},
		{
			href: "https://www.depauw.edu/academics/honors-fellows-programs/environmental-fellows-program/",
			thumbnail:
				"https://www.depauw.edu/files/pages/thumb_dsc_1784-1.jpg",
			name: "Environmental Fellow Program",
		},
		{
			href: "https://www.depauw.edu/academics/honors-fellows-programs/science-research-fellows/",
			thumbnail:
				"https://www.depauw.edu/files/pages/depauw-fall-2021-poster-session-2.jpg",
			name: "Science Research Fellow Program",
		},
	];

	const stats = [
		{
			name: "Majors/minors",
			num: "100+",
			des: "For the school of Liberal Arts",
		},
		{
			name: "Courses",
			num: "1200+",
			des: "Excluding the new School of Business opening 2023",
		},
		{
			name: "Specialized schools",
			num: "3",
			des: "School of Liberal Arts, School of Music, & School of Business",
		},
		{
			name: "Honor & Fellowships Programs",
			num: "5",
			des: "See details above.",
		},
	];

	return (
		<div>
			<NavBar />
			<section className="relative bg-[url(https://pbs.twimg.com/media/EHlEwqVX4AEf2MR.jpg)] bg-cover bg-center bg-no-repeat">
				<div className="absolute inset-0 bg-black/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-black/95 sm:to-black/25"></div>

				<div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
					<div className="max-w-xl text-center sm:text-left">
						<h1 className="text-3xl font-extrabold sm:text-5xl text-slate-100">
							Let us find your
							<strong className="block font-extrabold text-yellow-400">
								DePauw journey
							</strong>
						</h1>

						<p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed text-slate-100">
							Provide you with a completed 4-year course schedule based
							on you interests.
						</p>

						<div className="mt-8 flex flex-wrap gap-4 text-center">
							<a
								href="/combination"
								className="block w-full rounded bg-yellow-400 px-12 py-3 text-sm font-medium shadow hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring active:bg-white active:text-black sm:w-auto"
							>
								Get Started
							</a>

							<a
								href="#learn-more"
								className="block w-full rounded bg-slate-100 px-12 py-3 text-sm font-medium shadow hover:text-yellow-500 focus:outline-none focus:ring active:text-black active:bg-yellow-400 sm:w-auto"
							>
								Learn More
							</a>
						</div>
					</div>
				</div>
			</section>

			<section
				className="px-4 py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl"
				id="learn-more"
			>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 lg:items-center">
					<div className="max-w-lg mx-auto text-center lg:text-left lg:mx-0">
						<h2 className="text-5xl font-bold sm:text-6xl">
							Why Strike
						</h2>

						<p className="mt-4 text-gray-600">
							No, seriously, what is this website for?
						</p>
					</div>

					<div className="space-y-4">
						{faqs.map((item) => (
							<details className="group border-l-4 border-yellow-400 bg-gray-50 p-6">
								<summary className="flex cursor-pointer items-center justify-between">
									<h5 className="text-lg font-medium text-gray-900">
										{item.question}
									</h5>

									<span className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fill-rule="evenodd"
												d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
												clip-rule="evenodd"
											/>
										</svg>
									</span>
								</summary>

								<p className="mt-4 leading-relaxed text-gray-700">
									{item.answer}
								</p>
							</details>
						))}
					</div>
				</div>
			</section>

			<section>
				<div className="max-w-screen px-4 py-16 mx-auto sm:px-6 lg:px-8 bg-black/90">
					<div className="mx-auto">
						<div className="p-12 space-y-4 text-center">
							<h1 className="text-5xl sm:text-6xl text-yellow-400 font-bold pb-4">
								5 Honor Program & Fellowships
							</h1>
							<hr className="max-w-[100px] border-yellow-400 mx-auto pb-10 sm:pb-6" />

							<div className="px-4 mx-auto sm:px-6 lg:px-8">
								<div className="grid grid-cols-1 gap-8 lg:col-span-10 lg:grid-cols-5 lg:py-6">
									{honors.map((item, idx) => (
										<a
											href={item.href}
											target="_blank"
											rel="noreferrer"
											key={idx}
											className="block"
										>
											<div className="">
												<img
													loading="lazy"
													alt={item.name}
													className="aspect-square object-cover bg-gray-800"
													src={item.thumbnail}
												/>
											</div>

											<div className="mt-2 text-left">
												<h5 className="font-medium text-white mb-2">
													{item.name}
												</h5>

												<button className="flex text-yellow-400">
													<span className="underline ">
														Learn more
													</span>
													<svg
														className="w-5 h-5 ml-1 mt-1"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M17 8l4 4m0 0l-4 4m4-4H3"
														/>
													</svg>
												</button>
											</div>
										</a>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 lg:items-center">
						<div className="max-w-lg mx-auto text-center lg:text-left lg:mx-0 px-20">
							<p className="mt-4 text-gray-600 text-xl sm:text-2xl">
								Statistics by
							</p>
							<h2 className=" text-6xl font-bold sm:text-8xl">
								2022
							</h2>
						</div>

						<div className="grid grid-cols-2 gap-4">
							{stats.map((item) => (
								<button className="block text-left p-4 border border-gray-100 shadow-sm focus:outline-none focus:ring hover:shadow-md hover:shadow-yellow-300">
									<span className="inline-block p-3 rounded-lg text-yellow-400">
										<svg
											className="w-8 h-8"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M12 14l9-5-9-5-9 5 9 5z"></path>
											<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
											></path>
										</svg>
									</span>

									<h6 className="mt-2 text-xl font-bold">
										{item.num + " " + item.name}
									</h6>

									<p className="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
										{item.des}
									</p>
								</button>
							))}
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Home;
