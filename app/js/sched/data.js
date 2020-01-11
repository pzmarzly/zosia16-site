
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
		lectures: [],
		startTime: new Date(Date.now())
	},
	"fri": {
		id: "fri",
		title: "Friday",
		lectures: [],
		startTime: new Date(Date.now())
	},
	"sat" : {
		id: "sat",
		title: "Saturday",
		lectures: [],
		startTime: new Date(Date.now())
	},
	"lec" : {
		id: "lec",
		title: "Lectures",
		lectures: ["1"],
		startTime: new Date(Date.now())
	}
}

export {
	initial_lectures,
	initial_columns
};

