
const initial_lectures =
{
	"3" : {
		type: "lecture",
		id: "3",
		title: "Lorem",
		name: "Dolor",
		duration: 30,
	},
	"2" : {
		type: "lecture",
		id: "2",
		title: "React dla początkujących",
		name: "Xd Xdd",
		duration: 15,
	},
	"1" : {
		type: "lecture",
		id: "1",
		title: "Epaper hacking",
		name: "Jakub Szczerbinski",
		duration: 20,
	}
}

const initial_columns = {
	"thu": {
		id: "thu",
		title: "Thursday",
		lectureIds: [],
		startTime: Date.now()
	},
	"fri": {
		id: "fri",
		title: "Friday",
		lectureIds: [],
		startTime: Date.now()
	},
	"sat" : {
		id: "sat",
		title: "Saturday",
		lectureIds: [],
		startTime: Date.now()
	},
	"lec" : {
		id: "lec",
		title: "Lectures",
		lectureIds: ["1", "2", "3"],
		startTime: Date.now()
	}
}

export { 
	initial_lectures,
	initial_columns
};

